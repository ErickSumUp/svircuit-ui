import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import NotificationBanner from './NotificationBanner.svelte';

const baseProps = {
  headline: 'Software update',
  body: 'There is updated firmware available for your card reader.',
  action: { label: 'Update' }
};

test('should match story case', async () => {
  const { container } = render(NotificationBanner, baseProps);

  expect(container).toMatchSnapshot();
});

test('should render the headline as an h2 and the body copy', async () => {
  render(NotificationBanner, baseProps);

  expect(screen.getByRole('heading', { level: 2, name: 'Software update' })).toBeInTheDocument();
  expect(screen.getByText(baseProps.body)).toBeInTheDocument();
});

test.each(['system', 'promotional'] as const)('should render the %s variant', async (variant) => {
  const { container } = render(NotificationBanner, { ...baseProps, variant });

  expect(container.querySelector('.banner')).toHaveClass(variant);
});

describe('action', () => {
  test('should render a primary button and call its handler', async () => {
    const onclick = vi.fn();
    render(NotificationBanner, { ...baseProps, action: { label: 'Update', onclick } });

    const button = screen.getByRole('button', { name: 'Update' });
    await userEvent.click(button);

    expect(button).toHaveClass('primary');
    expect(onclick).toHaveBeenCalledOnce();
  });

  test('should render the secondary variant', async () => {
    render(NotificationBanner, { ...baseProps, action: { label: 'Update', variant: 'secondary' } });

    expect(screen.getByRole('button', { name: 'Update' })).toHaveClass('secondary');
  });

  test('should render a link with an href', async () => {
    render(NotificationBanner, { ...baseProps, action: { label: 'Learn more', href: '/help' } });

    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', '/help');
  });
});

describe('image', () => {
  test('should render an image with a default width', async () => {
    render(NotificationBanner, { ...baseProps, image: { src: '/update.svg', alt: 'Card reader' } });

    const image = screen.getByRole('img', { name: 'Card reader' });
    expect(image).toHaveAttribute('src', '/update.svg');
    expect(image).toHaveStyle({ width: '200px', objectPosition: 'center' });
  });

  test('should apply a custom width and alignment', async () => {
    render(NotificationBanner, {
      ...baseProps,
      image: { src: '/update.svg', alt: '', width: 120, align: 'left' }
    });

    expect(document.querySelector('img')).toHaveStyle({ width: '120px', objectPosition: 'left' });
  });
});

describe('close button', () => {
  test('should call onClose when clicked', async () => {
    const onClose = vi.fn();
    render(NotificationBanner, { ...baseProps, onClose, closeButtonLabel: 'Close notification' });

    await userEvent.click(screen.getByRole('button', { name: 'Close notification' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  test('should not render without a label', async () => {
    render(NotificationBanner, { ...baseProps, onClose: vi.fn() });

    expect(screen.queryByRole('button', { name: /close/i })).toBeNull();
  });
});

test('should be hidden when not visible', async () => {
  const { container, rerender } = render(NotificationBanner, baseProps);
  const banner = container.firstElementChild;
  expect(banner).not.toHaveClass('hidden');

  await rerender({ ...baseProps, isVisible: false });

  expect(banner).toHaveClass('hidden');
});

test('should merge a custom class name and pass attributes', async () => {
  const { container } = render(NotificationBanner, { ...baseProps, class: 'foo', id: 'bar' });

  expect(container.firstElementChild).toHaveClass('base', 'foo');
  expect(container.firstElementChild).toHaveAttribute('id', 'bar');
});
