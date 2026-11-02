import { fireEvent, render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';

import NotificationModal from './NotificationModal.svelte';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

const baseProps = {
  open: true,
  headline: "It's time to update your browser",
  body: "You'll soon need a more up-to-date browser to continue using SumUp.",
  actions: { primary: { label: 'Update now' }, secondary: { label: 'Not now' } }
};

test('should match story case', async () => {
  const { container } = render(NotificationModal, baseProps);

  expect(container).toMatchSnapshot();
});

test('should open as a modal labelled by its headline', async () => {
  render(NotificationModal, baseProps);

  const dialog = screen.getByRole('dialog', { name: baseProps.headline });
  expect(dialog).toHaveAttribute('open');
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(baseProps.headline);
  expect(screen.getByText(baseProps.body)).toBeInTheDocument();
});

test('should stay closed until open is set', async () => {
  const { rerender } = render(NotificationModal, { ...baseProps, open: false });
  const dialog = document.querySelector('dialog');
  expect(dialog).not.toHaveAttribute('open');

  await rerender({ ...baseProps, open: true });

  expect(dialog).toHaveAttribute('open');
});

test('should render an image', async () => {
  render(NotificationModal, { ...baseProps, image: { src: '/update.svg', alt: 'Browser update' } });

  expect(screen.getByRole('img', { name: 'Browser update' })).toHaveAttribute('src', '/update.svg');
});

test('should autofocus the secondary action', async () => {
  render(NotificationModal, baseProps);

  expect(screen.getByRole('button', { name: 'Not now' })).toHaveAttribute('autofocus');
  expect(screen.getByRole('button', { name: 'Update now' })).not.toHaveAttribute('autofocus');
});

describe('closing', () => {
  test('should close and call onClose from the close button', async () => {
    const onClose = vi.fn();
    render(NotificationModal, { ...baseProps, onClose });

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(document.querySelector('dialog')).not.toHaveAttribute('open');
    expect(onClose).toHaveBeenCalledOnce();
  });

  test.each(['primary', 'secondary'] as const)(
    'should close and call the %s action',
    async (key) => {
      const onClose = vi.fn();
      const onclick = vi.fn();
      const actions = { ...baseProps.actions, [key]: { label: 'Act', onclick } };
      render(NotificationModal, { ...baseProps, actions, onClose });

      await userEvent.click(screen.getByRole('button', { name: 'Act' }));

      expect(onclick).toHaveBeenCalledOnce();
      expect(onClose).toHaveBeenCalledOnce();
    }
  );

  test('should close on a backdrop click', async () => {
    render(NotificationModal, baseProps);
    const dialog = document.querySelector('dialog')!;

    await fireEvent.click(dialog);

    expect(dialog).not.toHaveAttribute('open');
  });

  test('should not close when clicking inside the content', async () => {
    render(NotificationModal, baseProps);

    await fireEvent.click(screen.getByText(baseProps.body));

    expect(document.querySelector('dialog')).toHaveAttribute('open');
  });

  test('should use a custom close button label', async () => {
    render(NotificationModal, { ...baseProps, closeButtonLabel: 'Dismiss' });

    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });
});

describe('preventClose', () => {
  test('should hide the close button', async () => {
    render(NotificationModal, { ...baseProps, preventClose: true });

    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
  });

  test('should ignore backdrop clicks and cancel Escape', async () => {
    render(NotificationModal, { ...baseProps, preventClose: true });
    const dialog = document.querySelector('dialog')!;

    await fireEvent.click(dialog);
    const cancel = new Event('cancel', { cancelable: true });
    dialog.dispatchEvent(cancel);

    expect(dialog).toHaveAttribute('open');
    expect(cancel.defaultPrevented).toBe(true);
  });
});

test('should pass attributes to the dialog', async () => {
  render(NotificationModal, { ...baseProps, id: 'update' });

  expect(document.querySelector('dialog')).toHaveAttribute('id', 'update');
});
