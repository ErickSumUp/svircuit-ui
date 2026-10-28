import { render, screen } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Image from './Image.svelte';

const baseProps = { src: '/example.jpg', alt: 'A card reader on a counter' };

test('should match story case', async () => {
  const { container } = render(Image, baseProps);

  expect(container).toMatchSnapshot();
});

test('should merge a custom class name with the default one', async () => {
  render(Image, { ...baseProps, class: 'foo' });

  const image = screen.getByRole('img', { name: baseProps.alt });
  expect(image).toHaveClass('base');
  expect(image).toHaveClass('foo');
});

test('should pass native attributes to the image', async () => {
  render(Image, { ...baseProps, loading: 'lazy', width: 800, height: 500 });

  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('loading', 'lazy');
  expect(image).toHaveAttribute('width', '800');
  expect(image).toHaveAttribute('height', '500');
});

test('should keep an empty alt for decorative images', async () => {
  const { container } = render(Image, { ...baseProps, alt: '' });

  expect(container.querySelector('img')).toHaveAttribute('alt', '');
  expect(screen.queryByRole('img')).toBeNull();
});
