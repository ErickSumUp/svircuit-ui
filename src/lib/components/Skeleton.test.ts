import { render, screen } from '@testing-library/svelte';
import { describe, test, expect } from 'vitest';

import Skeleton from './Skeleton.svelte';
import SkeletonExample from './SkeletonExample.test.svelte';
import { exampleSnippet } from './TestText.svelte';

describe('SkeletonContainer', () => {
  test('should match story case', async () => {
    const { container } = render(SkeletonExample, { isLoading: true });

    expect(container).toMatchSnapshot();
  });

  test('should hide the content while loading', async () => {
    const { container } = render(SkeletonExample, { isLoading: true });

    const element = container.querySelector('div');
    expect(element).toHaveAttribute('aria-busy', 'true');
    expect(element).toHaveAttribute('inert');
  });

  test('should show the content when loaded', async () => {
    const { container } = render(SkeletonExample, { isLoading: false });

    const element = container.querySelector('div');
    expect(element).toHaveAttribute('aria-busy', 'false');
    expect(element).not.toHaveAttribute('inert');
  });
});

describe('Skeleton', () => {
  test('should be a placeholder while its container is loading', async () => {
    const { container } = render(SkeletonExample, { isLoading: true });

    expect(container.querySelector('span')).toHaveClass('base', 'placeholder');
  });

  test('should show its content once loaded', async () => {
    const { container, rerender } = render(SkeletonExample, { isLoading: true });
    await rerender({ isLoading: false });

    const element = container.querySelector('span');
    expect(element).toHaveClass('base');
    expect(element).not.toHaveClass('placeholder');
  });

  test('should be circular when asked', async () => {
    const { container } = render(SkeletonExample, { isLoading: true, circle: true });

    expect(container.querySelector('span')).toHaveClass('circle');
  });

  test('should not be a placeholder outside a container', async () => {
    render(Skeleton, { children: exampleSnippet, 'data-testid': 'skeleton' });

    expect(screen.getByTestId('skeleton')).not.toHaveClass('placeholder');
  });

  test('should render as any element and merge a custom class name', async () => {
    const { container } = render(Skeleton, { as: 'div', class: 'foo', children: exampleSnippet });

    expect(container.querySelector('div')).toHaveClass('base', 'foo');
  });
});
