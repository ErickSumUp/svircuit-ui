import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { describe, expect, test, vi } from 'vitest';

import Tabs from './Tabs.svelte';

const panel = (text: string) => createRawSnippet(() => ({ render: () => `<p>${text}</p>` }));

const items = [
  { id: 'one', tab: 'Tab 1', panel: panel('Content 1') },
  { id: 'two', tab: 'Tab 2', panel: panel('Content 2') },
  { id: 'three', tab: 'Tab 3', panel: panel('Content 3') }
];

describe('tablist', () => {
  test('should match story case', async () => {
    const { container } = render(Tabs, { items });

    expect(container).toMatchSnapshot();
  });

  test('should select the first tab by default', async () => {
    render(Tabs, { items });

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).not.toHaveAttribute('tabindex');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
  });

  test('should select the tab given by `selectedId`', async () => {
    render(Tabs, { items, selectedId: 'two' });

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Tab 2');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
  });

  test('should only show the selected panel, labelled by its tab', async () => {
    render(Tabs, { items });

    const panel = screen.getByRole('tabpanel');
    const tab = screen.getByRole('tab', { selected: true });
    expect(panel).toHaveTextContent('Content 1');
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(3);
  });

  test('should select a tab on click', async () => {
    const onTabChange = vi.fn();
    render(Tabs, { items, onTabChange });

    await userEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));

    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 3');
    expect(onTabChange).toHaveBeenCalledExactlyOnceWith('three');
  });

  test('should move the selection and focus with the arrow keys', async () => {
    const onTabChange = vi.fn();
    render(Tabs, { items, onTabChange });

    await userEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));
    await userEvent.keyboard('{ArrowRight}');

    const second = screen.getByRole('tab', { name: 'Tab 2' });
    expect(second).toHaveAttribute('aria-selected', 'true');
    expect(second).toHaveFocus();
    expect(onTabChange).toHaveBeenLastCalledWith('two');

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });

  test('should not wrap around at the ends', async () => {
    render(Tabs, { items });

    await userEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));
    await userEvent.keyboard('{ArrowLeft}');

    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
  });

  test('should jump to the first and last tab with Home and End', async () => {
    render(Tabs, { items });

    await userEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));
    await userEvent.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });

  test('should move focus into the panel with ArrowDown', async () => {
    render(Tabs, { items });

    await userEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));
    await userEvent.keyboard('{ArrowDown}');

    expect(screen.getByRole('tabpanel')).toHaveFocus();
  });

  test('should pass attributes to the tab list and merge a class name on the wrapper', async () => {
    const { container } = render(Tabs, { items, 'aria-label': 'Orders', class: 'foo' });

    expect(screen.getByRole('tablist', { name: 'Orders' })).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass('wrapper', 'foo');
  });
});

describe('navigation', () => {
  const links = [
    { id: 'home', tab: 'Home', href: '/home' },
    { id: 'about', tab: 'About', href: '/about' }
  ];

  test('should render a list of links inside a nav', async () => {
    render(Tabs, { items: links, as: 'navigation', selectedId: 'about' });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  test('should not render tab semantics or panels', async () => {
    render(Tabs, { items: links, as: 'navigation' });

    expect(screen.queryByRole('tablist')).toBeNull();
    expect(screen.queryByRole('tab')).toBeNull();
    expect(screen.queryByRole('tabpanel', { hidden: true })).toBeNull();
  });
});
