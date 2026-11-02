import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import NotificationFullscreen from './NotificationFullscreen.svelte';

const baseProps = {
  image: { src: '/update.svg', alt: '' },
  headline: "The browser you're using is no longer supported",
  body: 'You need a more up-to-date browser to continue using SumUp.'
};

test('should match story case', async () => {
  const { container } = render(NotificationFullscreen, {
    ...baseProps,
    actions: { primary: { label: 'Update now' } }
  });

  expect(container).toMatchSnapshot();
});

test('should render the image, headline and body', async () => {
  render(NotificationFullscreen, { ...baseProps, image: { src: '/update.svg', alt: 'Browser' } });

  expect(screen.getByRole('img', { name: 'Browser' })).toHaveAttribute('src', '/update.svg');
  expect(screen.getByRole('heading', { name: baseProps.headline }).tagName).toBe('H2');
  expect(screen.getByText(baseProps.body)).toBeInTheDocument();
});

test('should render the headline as an h1', async () => {
  render(NotificationFullscreen, { ...baseProps, headlineAs: 'h1' });

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(baseProps.headline);
});

test('should render without actions', async () => {
  render(NotificationFullscreen, baseProps);

  expect(screen.queryByRole('button')).toBeNull();
});

describe('actions', () => {
  test('should render primary and secondary buttons and call their handlers', async () => {
    const primary = vi.fn();
    const secondary = vi.fn();
    render(NotificationFullscreen, {
      ...baseProps,
      actions: {
        primary: { label: 'Update now', onclick: primary },
        secondary: { label: 'Not now', onclick: secondary }
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'Update now' }));
    await userEvent.click(screen.getByRole('button', { name: 'Not now' }));

    expect(primary).toHaveBeenCalledOnce();
    expect(secondary).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Update now' })).toHaveClass('primary');
    expect(screen.getByRole('button', { name: 'Not now' })).toHaveClass('secondary');
  });

  test('should render a link with an href', async () => {
    render(NotificationFullscreen, {
      ...baseProps,
      actions: { primary: { label: 'Go to dashboard', href: '/dashboard' } }
    });

    expect(screen.getByRole('link', { name: 'Go to dashboard' })).toHaveAttribute(
      'href',
      '/dashboard'
    );
  });

  test('should mark a destructive action', async () => {
    render(NotificationFullscreen, {
      ...baseProps,
      actions: { primary: { label: 'Delete', destructive: true } }
    });

    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('destructive');
  });
});

test('should merge a custom class name and pass attributes', async () => {
  const { container } = render(NotificationFullscreen, { ...baseProps, class: 'foo', id: 'bar' });

  expect(container.firstElementChild).toHaveClass('base', 'foo');
  expect(container.firstElementChild).toHaveAttribute('id', 'bar');
});
