import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Popover from './Popover.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case variants', async () => {
  const { container } = render(Popover, {
    trigger: exampleSnippet,
    children: exampleSnippet
  });

  expect(container).toMatchSnapshot();
});
