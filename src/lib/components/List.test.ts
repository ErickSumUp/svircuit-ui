import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import List from './List.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(List, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should render an ordered list', async () => {
  const { container } = render(List, { variant: 'ordered', children: exampleSnippet });

  expect(container.querySelector('ol')).toBeInTheDocument();
});

test('should map the deprecated sizes onto the new scale', async () => {
  const { container } = render(List, { size: 'two', children: exampleSnippet });

  expect(container.querySelector('ul')).toHaveClass('s');
});
