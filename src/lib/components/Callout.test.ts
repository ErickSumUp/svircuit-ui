import { render, screen } from '@testing-library/svelte';
import { createRawSnippet } from 'svelte';
import { expect, test } from 'vitest';

import Callout from './Callout.svelte';

const baseProps = { body: 'This is a callout' };

test('should match story case', async () => {
  const { container } = render(Callout, baseProps);

  expect(container).toMatchSnapshot();
});

test('should render the body copy', async () => {
  render(Callout, baseProps);

  expect(screen.getByText('This is a callout')).toBeInTheDocument();
});

test('should render a body snippet', async () => {
  const body = createRawSnippet(() => ({
    render: () => '<span>Read the <a href="/docs">docs</a></span>'
  }));
  render(Callout, { body });

  expect(screen.getByRole('link', { name: 'docs' })).toHaveAttribute('href', '/docs');
});

test('should render the info icon by default', async () => {
  const { container } = render(Callout, baseProps);

  expect(container.querySelector('.icon svg')).toHaveAttribute('aria-hidden', 'true');
});

test('should render a custom icon', async () => {
  const icon = createRawSnippet(() => ({
    render: () => '<svg data-testid="custom-icon" aria-hidden="true"></svg>'
  }));
  const { container } = render(Callout, { ...baseProps, icon });

  expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  expect(container.querySelectorAll('.icon svg')).toHaveLength(1);
});

test('should render the icon label visually hidden', async () => {
  render(Callout, { ...baseProps, iconLabel: 'Information' });

  expect(screen.getByText('Information')).toHaveClass('hide-visually');
});

test.each(['confirm', 'neutral', 'notify', 'alert', 'promo'] as const)(
  'should apply the %s color',
  async (color) => {
    const { container } = render(Callout, { ...baseProps, color });

    expect(container.firstElementChild).toHaveClass(color);
  }
);

test('should merge a custom class name and pass attributes', async () => {
  const { container } = render(Callout, { ...baseProps, class: 'foo', id: 'bar' });

  expect(container.firstElementChild).toHaveClass('base', 'neutral', 'foo');
  expect(container.firstElementChild).toHaveAttribute('id', 'bar');
});
