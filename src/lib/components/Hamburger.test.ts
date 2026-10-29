import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';

import Hamburger from './Hamburger.svelte';

const baseProps = { activeLabel: 'Close menu', inactiveLabel: 'Open menu' };

test('should match story case', () => {
  const { container } = render(Hamburger, baseProps);

  expect(container).toMatchSnapshot();
});

test('should merge a custom class name with the default ones', () => {
  render(Hamburger, { ...baseProps, class: 'foo' });

  expect(screen.getByRole('button')).toHaveClass('base', 'm', 'foo');
});

test('should use the inactive label by default', () => {
  render(Hamburger, baseProps);

  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('title', 'Open menu');
});

test('should use the active label and morph when active', () => {
  render(Hamburger, { ...baseProps, isActive: true });

  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveClass('active');
});

test('should call onclick when clicked', async () => {
  const onclick = vi.fn();
  render(Hamburger, { ...baseProps, onclick });

  await userEvent.click(screen.getByRole('button'));

  expect(onclick).toHaveBeenCalledOnce();
});

test('should pass through ARIA attributes', () => {
  render(Hamburger, { ...baseProps, 'aria-expanded': true, 'aria-controls': 'menu' });

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-expanded', 'true');
  expect(button).toHaveAttribute('aria-controls', 'menu');
});
