import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Headline from './Headline.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(Headline, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should map the deprecated sizes onto the new scale', async () => {
  const sizes = { one: 'l', two: 'm', three: 's', four: 's' } as const;

  Object.entries(sizes).forEach(([legacy, size]) => {
    const { container } = render(Headline, {
      size: legacy as keyof typeof sizes,
      children: exampleSnippet
    });

    expect(container.querySelector('h2')).toHaveClass(size);
  });
});
