import { createRawSnippet } from 'svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';

import Dialog from './Dialog.svelte';

beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

const children = createRawSnippet(() => ({
  render: () => '<div><h2 id="title">Hello World!</h2><p>I am a Dialog.</p></div>'
}));

const baseProps = { 'aria-labelledby': 'title', children };

function renderOpen(props: Record<string, unknown> = {}) {
  const result = render(Dialog, { ...baseProps, ...props });
  const dialog = document.querySelector('dialog')!;
  dialog.showModal();
  return { ...result, dialog };
}

test('should match story case', async () => {
  const { container } = render(Dialog, baseProps);

  expect(container).toMatchSnapshot();
});

test('should open with the native API, labelled by its title', async () => {
  renderOpen();

  expect(screen.getByRole('dialog', { name: 'Hello World!' })).toHaveAttribute('open');
  expect(screen.getByText('I am a Dialog.')).toBeInTheDocument();
});

test.each(['contextual', 'immersive'] as const)('should apply the %s variant', async (variant) => {
  render(Dialog, { ...baseProps, variant });

  expect(document.querySelector('dialog')).toHaveClass('base', variant);
});

test('should pass attributes and classes to the dialog', async () => {
  render(Dialog, { ...baseProps, id: 'greeting', class: 'custom' });

  const dialog = document.querySelector('dialog');
  expect(dialog).toHaveAttribute('id', 'greeting');
  expect(dialog).toHaveClass('base', 'custom');
});

describe('closing', () => {
  test('should close from the close button and fire the native close event', async () => {
    const onclose = vi.fn();
    const { dialog } = renderOpen({ onclose });

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(dialog).not.toHaveAttribute('open');
    expect(onclose).toHaveBeenCalledOnce();
  });

  test('should allow light dismiss', async () => {
    const { dialog } = renderOpen();

    expect(dialog).toHaveAttribute('closedby', 'any');
  });

  test('should close on a backdrop click', async () => {
    const onclick = vi.fn();
    const { dialog } = renderOpen({ onclick });

    await fireEvent.click(dialog);

    expect(dialog).not.toHaveAttribute('open');
    expect(onclick).toHaveBeenCalledOnce();
  });

  test('should not close when clicking inside the content', async () => {
    const { dialog } = renderOpen();

    await fireEvent.click(screen.getByText('I am a Dialog.'));

    expect(dialog).toHaveAttribute('open');
  });

  test('should use a custom close button label', async () => {
    renderOpen({ closeButtonLabel: 'Close dialog' });

    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });
});

describe('preventClose', () => {
  test('should hide the close button and disable light dismiss', async () => {
    const { dialog } = renderOpen({ preventClose: true });

    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    expect(dialog).toHaveAttribute('closedby', 'none');
  });

  test('should ignore backdrop clicks and cancel Escape', async () => {
    const oncancel = vi.fn();
    const { dialog } = renderOpen({ preventClose: true, oncancel });

    await fireEvent.click(dialog);
    const cancel = new Event('cancel', { cancelable: true });
    dialog.dispatchEvent(cancel);

    expect(dialog).toHaveAttribute('open');
    expect(cancel.defaultPrevented).toBe(true);
    expect(oncancel).toHaveBeenCalledOnce();
  });
});
