import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Compact from './Compact.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(Compact, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should render as any element', async () => {
  const { container } = render(Compact, { as: 'span', children: exampleSnippet });

  expect(container.querySelector('span')).toHaveClass('base');
});
