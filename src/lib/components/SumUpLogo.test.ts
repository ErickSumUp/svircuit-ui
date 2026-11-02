import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import SumUpLogo from './SumUpLogo.svelte';

test('should match story case', async () => {
  const { container } = render(SumUpLogo);

  expect(container).toMatchSnapshot();
});

test('should be an image named SumUp by default', async () => {
  render(SumUpLogo);

  expect(screen.getByRole('img', { name: 'SumUp' })).toHaveAttribute('viewBox', '0 0 190 48');
});

test('should render only the logomark for the short variant', async () => {
  render(SumUpLogo, { variant: 'short' });

  expect(screen.getByRole('img')).toHaveAttribute('viewBox', '0 0 48 48');
  expect(screen.getByRole('img')).toHaveClass('short');
});

test('should use a custom label', async () => {
  render(SumUpLogo, { label: 'Go to the dashboard' });

  expect(screen.getByRole('img', { name: 'Go to the dashboard' })).toBeInTheDocument();
});

test.each(['s', 'm', 'l'] as const)('should apply the %s size', async (size) => {
  render(SumUpLogo, { size });

  expect(screen.getByRole('img')).toHaveClass('full', size);
});

test('should merge a custom class name and pass attributes', async () => {
  render(SumUpLogo, { class: 'foo', id: 'bar' });

  expect(screen.getByRole('img')).toHaveClass('foo');
  expect(screen.getByRole('img')).toHaveAttribute('id', 'bar');
});
