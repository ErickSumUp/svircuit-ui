import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Badge from './Badge.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case variants', async () => {
  const { container } = render(Badge, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});
