import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import Stack from './Stack.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should apply the alignment and gap', async () => {
  const { container } = render(Stack, { children: exampleSnippet, align: 'end', gap: 'xl' });

  expect(container.firstElementChild).toHaveClass('base', 'end', 'xl');
});

test('should merge a custom class name and pass attributes', async () => {
  const { container } = render(Stack, {
    children: exampleSnippet,
    vertical: true,
    class: 'foo',
    id: 'bar',
    style: 'width: 100%'
  });

  expect(container.firstElementChild).toHaveClass('base', 'vertical', 'foo');
  expect(container.firstElementChild).toHaveAttribute('id', 'bar');
  expect(container.firstElementChild).toHaveAttribute('style', 'width: 100%;');
});
