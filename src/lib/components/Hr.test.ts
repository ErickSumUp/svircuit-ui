import { render, screen } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Hr from './Hr.svelte';

test('should match story case', async () => {
  const { container } = render(Hr, {});

  expect(container).toMatchSnapshot();
});

test('should merge a custom class name with the default one', async () => {
  render(Hr, { class: 'foo' });

  const hr = screen.getByRole('separator', { hidden: true });
  expect(hr).toHaveClass('base');
  expect(hr).toHaveClass('foo');
});

test('should render as any element', async () => {
  const { container } = render(Hr, { as: 'span' });

  expect(container.querySelector('span')).toHaveClass('base');
});

test('should be hidden from the accessibility tree by default', async () => {
  render(Hr, {});

  expect(screen.queryByRole('separator')).toBeNull();
  expect(screen.getByRole('separator', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
});

test('should be visible to the accessibility tree when asked', async () => {
  render(Hr, { 'aria-hidden': 'false' });

  expect(screen.getByRole('separator')).toHaveAttribute('aria-hidden', 'false');
});
