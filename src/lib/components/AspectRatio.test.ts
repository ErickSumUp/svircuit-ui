import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import AspectRatio from './AspectRatio.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(AspectRatio, { aspectRatio: 1.5, children: exampleSnippet });

  expect(container).toMatchSnapshot();
});

test('should merge a custom class name with the default one', async () => {
  const { container } = render(AspectRatio, {
    aspectRatio: 1.5,
    class: 'foo',
    children: exampleSnippet
  });

  const wrapper = container.querySelector('div');
  expect(wrapper).toHaveClass('base');
  expect(wrapper).toHaveClass('foo');
});

test('should keep a custom style alongside the ratio', async () => {
  const { container } = render(AspectRatio, {
    aspectRatio: 1.5,
    style: 'max-width: 10rem',
    children: exampleSnippet
  });

  const wrapper = container.querySelector('div');
  expect(wrapper?.style.getPropertyValue('--aspect-ratio')).toBe('1.5');
  expect(wrapper?.style.maxWidth).toBe('10rem');
});

test('should not constrain the content without a ratio', async () => {
  const { container } = render(AspectRatio, { children: exampleSnippet });

  const wrapper = container.querySelector('div');
  expect(wrapper).not.toHaveClass('base');
  expect(wrapper?.style.getPropertyValue('--aspect-ratio')).toBe('');
});

test('should not render without children', async () => {
  const { container } = render(AspectRatio, { aspectRatio: 1.5 });

  expect(container.querySelector('div')).toBeNull();
});
