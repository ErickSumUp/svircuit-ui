import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import ButtonGroup from './ButtonGroup.svelte';
import { exampleSnippet } from '../components/TestText.svelte';

test('should center medium buttons by default', async () => {
  const { container } = render(ButtonGroup, { children: exampleSnippet });

  expect(container.querySelector('.base')).toHaveClass('center', 'm');
});

test.each([
  ['left', 's'],
  ['right', 'm']
] as const)('should apply the %s alignment and the %s size', async (align, size) => {
  const { container } = render(ButtonGroup, { children: exampleSnippet, align, size });

  expect(container.querySelector('.base')).toHaveClass(align, size);
});

test('should merge a custom class name and pass attributes', async () => {
  const { container } = render(ButtonGroup, { children: exampleSnippet, class: 'foo', id: 'bar' });

  expect(container.firstElementChild).toHaveClass('container', 'foo');
  expect(container.firstElementChild).toHaveAttribute('id', 'bar');
});
