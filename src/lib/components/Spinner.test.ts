import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Spinner from './Spinner.svelte';

test('should match story case', async () => {
  const { container } = render(Spinner, {});

  expect(container).toMatchSnapshot();
});

test('should map the deprecated sizes', async () => {
  const { container } = render(Spinner, { size: 'giga' });

  expect(container.querySelector('span')).toHaveClass('l');
});
