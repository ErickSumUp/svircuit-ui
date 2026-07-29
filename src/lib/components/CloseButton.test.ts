import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import CloseButton from './CloseButton.svelte';

test('should match story case', async () => {
  const { container } = render(CloseButton, {});

  expect(container).toMatchSnapshot();
});

test('should label the button', async () => {
  const { getByRole } = render(CloseButton, { label: 'Close dialog' });

  expect(getByRole('button', { name: 'Close dialog' })).toHaveAttribute('title', 'Close dialog');
});
