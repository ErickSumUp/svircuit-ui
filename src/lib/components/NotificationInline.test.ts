import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import NotificationInline from './NotificationInline.svelte';

const baseProps = { body: 'This is an inline message' };

test('should match story case', async () => {
  const { container } = render(NotificationInline, baseProps);

  expect(container).toMatchSnapshot();
});

test('should render the body copy', async () => {
  render(NotificationInline, baseProps);

  expect(screen.getByText('This is an inline message')).toBeInTheDocument();
});

test('should render a headline as an h3 by default', async () => {
  render(NotificationInline, { ...baseProps, headline: 'Information' });

  const heading = screen.getByRole('heading', { name: 'Information' });
  expect(heading.tagName).toBe('H3');
});

test.each(['h2', 'h3', 'h4', 'h5', 'h6'] as const)(
  'should render the headline as an %s',
  async (level) => {
    render(NotificationInline, { ...baseProps, headline: 'Information', headlineAs: level });

    expect(screen.getByRole('heading').tagName).toBe(level.toUpperCase());
  }
);

describe('action', () => {
  test('should render a button and call its handler', async () => {
    const onclick = vi.fn();
    render(NotificationInline, { ...baseProps, action: { label: 'Click here', onclick } });

    await userEvent.click(screen.getByRole('button', { name: 'Click here' }));

    expect(onclick).toHaveBeenCalledOnce();
  });

  test('should render a link with an href', async () => {
    render(NotificationInline, { ...baseProps, action: { label: 'Learn more', href: '/help' } });

    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', '/help');
  });
});

describe('close button', () => {
  test('should call onClose when clicked', async () => {
    const onClose = vi.fn();
    render(NotificationInline, { ...baseProps, onClose, closeButtonLabel: 'Close notification' });

    await userEvent.click(screen.getByRole('button', { name: 'Close notification' }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  test('should not render without a label', async () => {
    render(NotificationInline, { ...baseProps, onClose: vi.fn() });

    expect(screen.queryByRole('button')).toBeNull();
  });
});

test('should describe the icon with iconLabel', async () => {
  render(NotificationInline, { ...baseProps, variant: 'danger', iconLabel: 'Error' });

  expect(screen.getByText('Error')).toHaveClass('hide-visually');
});

test('should be hidden when not visible', async () => {
  const { container, rerender } = render(NotificationInline, baseProps);
  const notification = container.firstElementChild;
  expect(notification).not.toHaveClass('hidden');

  await rerender({ ...baseProps, isVisible: false });

  expect(notification).toHaveClass('hidden');
});

test('should merge a custom class name and pass attributes', async () => {
  const { container } = render(NotificationInline, { ...baseProps, class: 'foo', id: 'bar' });

  expect(container.firstElementChild).toHaveClass('base', 'foo');
  expect(container.firstElementChild).toHaveAttribute('id', 'bar');
});
