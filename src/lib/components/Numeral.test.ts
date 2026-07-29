import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Numeral from './Numeral.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(Numeral, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should apply the strikethrough decoration', async () => {
  const { container } = render(Numeral, {
    decoration: 'strikethrough',
    children: exampleSnippet
  });

  expect(container.querySelector('p')).toHaveClass('strikethrough');
});
