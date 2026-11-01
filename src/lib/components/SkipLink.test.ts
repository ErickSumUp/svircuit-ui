import { render, screen } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import SkipLink from './SkipLink.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(SkipLink, { href: '#main-content', children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should link to the main content', async () => {
  render(SkipLink, { href: '#main-content', children: exampleSnippet });

  expect(screen.getByRole('link')).toHaveAttribute('href', '#main-content');
});

test('should merge a custom class name with the default one', async () => {
  render(SkipLink, { href: '#main-content', class: 'foo', children: exampleSnippet });

  expect(screen.getByRole('link')).toHaveClass('base', 'foo');
});
