import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Display from './Display.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(Display, { children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should map the deprecated sizes onto the new scale', async () => {
  const sizes = { one: 'l', two: 'm', three: 'm', four: 's' } as const;

  Object.entries(sizes).forEach(([legacy, size]) => {
    const { container } = render(Display, {
      size: legacy as keyof typeof sizes,
      children: exampleSnippet
    });

    expect(container.querySelector('h2')).toHaveClass(size);
  });
});

test('should default to the display typeface at the largest size only', async () => {
  const { container: xl } = render(Display, { size: 'xl', children: exampleSnippet });
  const { container: l } = render(Display, { size: 'l', children: exampleSnippet });

  expect(xl.querySelector('h2')).toHaveClass('black');
  expect(l.querySelector('h2')).toHaveClass('bold');
});
