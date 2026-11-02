import { createRawSnippet } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import TopNavigation, { TOP_NAVIGATION_HEIGHT } from './TopNavigation.svelte';

const logo = createRawSnippet(() => ({ render: () => '<a href="/">SumUp</a>' }));
const icon = createRawSnippet(() => ({ render: () => '<svg data-testid="icon"></svg>' }));
const custom = createRawSnippet(() => ({ render: () => '<p>Test account</p>' }));

const links = [
  { key: 'custom', children: custom },
  { label: 'Settings', icon, href: '/settings' }
];

test('should match story case', async () => {
  const { container } = render(TopNavigation, {
    logo,
    links,
    skipNavigationHref: '#main',
    skipNavigationLabel: 'Skip navigation'
  });

  expect(container).toMatchSnapshot();
});

test('should render a banner with the logo', async () => {
  render(TopNavigation, { logo });

  expect(screen.getByRole('banner')).toContainElement(screen.getByRole('link', { name: 'SumUp' }));
});

test('should render utility links named by their tooltip', async () => {
  render(TopNavigation, { links });

  const link = screen.getByRole('link', { name: 'Settings' });
  expect(link).toHaveAttribute('href', '/settings');
  expect(screen.getByRole('tooltip', { hidden: true })).toHaveTextContent('Settings');
  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('should render custom items', async () => {
  render(TopNavigation, { links });

  expect(screen.getByText('Test account').closest('li')).toHaveClass('custom');
});

test('should render a utility link without href as a button', async () => {
  const onclick = vi.fn();
  render(TopNavigation, { links: [{ label: 'Notifications', icon, onclick }] });

  await userEvent.click(screen.getByRole('button', { name: 'Notifications' }));

  expect(onclick).toHaveBeenCalledOnce();
});

test('should mark the active link as the current page', async () => {
  render(TopNavigation, {
    links: [{ label: 'Settings', icon, href: '/settings', isActive: true }]
  });

  expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('aria-current', 'page');
});

test('should render the hamburger', async () => {
  const onclick = vi.fn();
  render(TopNavigation, {
    hamburger: { activeLabel: 'Close menu', inactiveLabel: 'Open menu', onclick }
  });

  await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

  expect(onclick).toHaveBeenCalledOnce();
});

test('should render a skip link only with both its href and label', async () => {
  const { rerender } = render(TopNavigation, { skipNavigationHref: '#main' });
  expect(screen.queryByRole('link')).toBeNull();

  await rerender({ skipNavigationHref: '#main', skipNavigationLabel: 'Skip navigation' });

  expect(screen.getByRole('link', { name: 'Skip navigation' })).toHaveAttribute('href', '#main');
});

test('should mark the links as loading', async () => {
  render(TopNavigation, { links, isLoading: true });

  expect(screen.getByRole('list').parentElement).toHaveAttribute('aria-busy', 'true');
});

test('should pass attributes to the header', async () => {
  render(TopNavigation, { logo, id: 'top', class: 'custom-class' });

  const header = screen.getByRole('banner');
  expect(header).toHaveAttribute('id', 'top');
  expect(header).toHaveClass('base', 'custom-class');
});

test('should export its height', () => {
  expect(TOP_NAVIGATION_HEIGHT).toBe('68px');
});
