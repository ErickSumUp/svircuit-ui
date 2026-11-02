import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import TierIndicator from './TierIndicator.svelte';

test('should match story case', async () => {
  const { container } = render(TierIndicator, { variant: 'plus' });

  expect(container).toMatchSnapshot();
});

test('should announce the tier name and hide the badge', async () => {
  const { container } = render(TierIndicator, { variant: 'plus' });

  expect(screen.getByText('plus')).toHaveClass('hide-visually');
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
});

test.each([
  ['s', '32', '16'],
  ['m', '48', '24'],
  ['l', '64', '32']
] as const)('should render the %s size at %sx%s', async (size, width, height) => {
  const { container } = render(TierIndicator, { variant: 'plus', size });

  const svg = container.querySelector('svg');
  expect(svg).toHaveAttribute('width', width);
  expect(svg).toHaveAttribute('height', height);
  expect(svg).toHaveAttribute('viewBox', `0 0 ${width} ${height}`);
});

test('should merge a custom class name and pass attributes', async () => {
  const { container } = render(TierIndicator, { variant: 'plus', class: 'foo', id: 'bar' });

  expect(container.firstElementChild).toHaveClass('base', 'foo');
  expect(container.firstElementChild).toHaveAttribute('id', 'bar');
});
