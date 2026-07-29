import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Body from './Body.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(Body, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should map the deprecated sizes onto the new scale', async () => {
  const { container } = render(Body, { size: 'two', children: exampleSnippet });

  expect(container.querySelector('p')).toHaveClass('s');
});

test('should render the strong element in the semibold weight', async () => {
  const { container } = render(Body, { as: 'strong', children: exampleSnippet });

  expect(container.querySelector('strong')).toHaveClass('semibold');
});

test('should render the deprecated quote variant as a blockquote', async () => {
  const { container } = render(Body, { variant: 'quote', children: exampleSnippet });

  expect(container.querySelector('blockquote')).toBeInTheDocument();
});
