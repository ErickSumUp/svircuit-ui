import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

import Avatar from './Avatar.svelte';

test('should match story case', async () => {
  const { container } = render(Avatar, { src: '/coffee.jpg', alt: 'A cup of coffee' });

  expect(container).toMatchSnapshot();
});

describe('with an image', () => {
  test('should render an img with the alt text', async () => {
    render(Avatar, { src: '/coffee.jpg', alt: 'A cup of coffee' });

    expect(screen.getByRole('img', { name: 'A cup of coffee' })).toHaveAttribute(
      'src',
      '/coffee.jpg'
    );
  });

  test('should be round for the person variant', async () => {
    render(Avatar, { src: '/jane.jpg', alt: 'Jane', variant: 'person' });

    expect(screen.getByRole('img')).toHaveClass('person', 'm');
  });
});

describe('placeholder', () => {
  test('should label the placeholder with the alt text', async () => {
    render(Avatar, { alt: 'Product' });

    const placeholder = screen.getByRole('img', { name: 'Product' });
    expect(placeholder.tagName).toBe('DIV');
    expect(placeholder.querySelector('svg')).not.toBeNull();
  });

  test('should hide a decorative placeholder', async () => {
    const { container } = render(Avatar, { alt: '' });

    expect(screen.queryByRole('img')).toBeNull();
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  test('should render a different icon for each variant', async () => {
    const icons = (['object', 'business', 'person'] as const).map((variant) => {
      const { container } = render(Avatar, { alt: '', variant });
      return container.querySelector('path')?.getAttribute('d');
    });

    expect(new Set(icons).size).toBe(3);
  });

  test('should show up to two uppercase initials for the person variant', async () => {
    const { container } = render(Avatar, { alt: 'Jane Doe', variant: 'person', initials: 'jdx' });

    expect(container.firstElementChild).toHaveTextContent(/^JD$/);
    expect(container.querySelector('svg')).toBeNull();
  });

  test('should ignore initials for other variants', async () => {
    const { container } = render(Avatar, { alt: '', variant: 'business', initials: 'SU' });

    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.firstElementChild).not.toHaveTextContent('SU');
  });
});

test.each(['s', 'm'] as const)('should apply the %s size', async (size) => {
  const { container } = render(Avatar, { alt: '', size });

  expect(container.firstElementChild).toHaveClass(size);
});

test('should merge a custom class name and pass attributes', async () => {
  render(Avatar, { src: '/coffee.jpg', alt: 'Coffee', class: 'foo', loading: 'lazy' });

  expect(screen.getByRole('img')).toHaveClass('base', 'foo');
  expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
});
