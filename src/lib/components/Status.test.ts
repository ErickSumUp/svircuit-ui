import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Status from './Status.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case variants', async () => {
  const { container } = render(Status, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});
