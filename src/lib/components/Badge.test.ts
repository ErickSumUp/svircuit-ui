import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Badge from '$lib/components/Badge.svelte';
import { test, expect } from 'vitest';

test('should match story case variants', async () => {
  const { container } = render(Badge, {
    props: { variant: 'neutral' }
  });
  expect(container).toMatchSnapshot();
});

test('should match story case circular', async () => {
  const { container } = render(Badge, {
    props: { circle: true, variant: 'neutral' }
  });
  expect(container).toMatchSnapshot();
});
