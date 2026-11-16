import { render, screen, waitFor } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { beforeAll, beforeEach, describe, test, expect, vi } from 'vitest';

import SidePanelExample from './SidePanelExample.test.svelte';

function mockViewport(isMobile: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: isMobile,
    addEventListener: () => {},
    removeEventListener: () => {}
  });
}

const showModal = vi.fn(function (this: HTMLDialogElement) {
  this.setAttribute('open', '');
});
const show = vi.fn(function (this: HTMLDialogElement) {
  this.setAttribute('open', '');
});

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = showModal;
  HTMLDialogElement.prototype.show = show;
  // Browsers fire `close` in a later task.
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    setTimeout(() => this.dispatchEvent(new Event('close')));
  };
});

beforeEach(() => {
  showModal.mockClear();
  show.mockClear();
  mockViewport(false);
});

// Testing Library can't compute the names of closed dialogs, so find them by their headline.
function panel(name: string) {
  const headline = screen.getByRole('heading', { level: 2, name, hidden: true });
  const dialog = headline.closest('dialog');
  if (dialog?.getAttribute('aria-labelledby') !== headline.id) throw new Error(`No panel ${name}`);
  return dialog;
}

describe('SidePanel', () => {
  test('should be closed by default', () => {
    render(SidePanelExample);
    expect(panel('Item details')).not.toHaveAttribute('open');
  });

  test('should open as a non-modal panel labelled by its headline on larger viewports', async () => {
    render(SidePanelExample);
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(panel('Item details')).toHaveAttribute('open');
    expect(show).toHaveBeenCalledOnce();
    expect(showModal).not.toHaveBeenCalled();
    expect(screen.getByRole('heading', { level: 2, name: 'Item details' })).toBeInTheDocument();
  });

  test('should open as a modal on small viewports', async () => {
    mockViewport(true);
    render(SidePanelExample, { open: true });
    expect(showModal).toHaveBeenCalledOnce();
    expect(show).not.toHaveBeenCalled();
  });

  test('should close with the close button and call onclose', async () => {
    const onclose = vi.fn();
    render(SidePanelExample, { open: true, onclose });
    await userEvent.click(screen.getAllByRole('button', { name: 'Close', hidden: true })[0]);
    expect(onclose).toHaveBeenCalledOnce();
    await waitFor(() => expect(panel('Item details')).not.toHaveAttribute('open'));
    expect(screen.getByTestId('state')).toHaveTextContent('closed');
  });

  test('should stay open when onclose rejects', async () => {
    const onclose = vi.fn().mockRejectedValue(new Error('Unsaved changes'));
    render(SidePanelExample, { open: true, onclose });
    await userEvent.click(screen.getAllByRole('button', { name: 'Close', hidden: true })[0]);
    expect(onclose).toHaveBeenCalledOnce();
    expect(panel('Item details')).toHaveAttribute('open');
    expect(screen.getByTestId('state')).toHaveTextContent('open');
  });

  test('should close with the Escape key', async () => {
    render(SidePanelExample, { open: true });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(panel('Item details')).not.toHaveAttribute('open'));
  });

  test('should not close with the Escape key when preventEscapeKeyClose is set', async () => {
    render(SidePanelExample, { open: true, preventEscapeKeyClose: true });
    await userEvent.keyboard('{Escape}');
    expect(panel('Item details')).toHaveAttribute('open');
  });

  test('should only show the back and close buttons when they are labelled', async () => {
    render(SidePanelExample, { open: true });
    const headerButtons = (name: string) =>
      [...panel(name).querySelectorAll(':scope > div > header button')].map((button) =>
        button.getAttribute('aria-label')
      );
    expect(headerButtons('Item details')).toEqual(['Close']);
    expect(headerButtons('More information')).toEqual(['Back']);
  });

  describe('stacked panels', () => {
    test('should go back from the top panel with its back button', async () => {
      render(SidePanelExample, { open: true });
      await userEvent.click(screen.getByRole('button', { name: 'Show more' }));
      expect(panel('More information')).toHaveAttribute('open');

      await userEvent.click(screen.getByRole('button', { name: 'Back' }));
      expect(panel('More information')).not.toHaveAttribute('open');
      expect(panel('Item details')).toHaveAttribute('open');
    });

    test('should only close the top panel with the Escape key', async () => {
      render(SidePanelExample, { open: true });
      await userEvent.click(screen.getByRole('button', { name: 'Show more' }));

      await userEvent.keyboard('{Escape}');
      expect(panel('More information')).not.toHaveAttribute('open');
      expect(panel('Item details')).toHaveAttribute('open');

      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(panel('Item details')).not.toHaveAttribute('open'));
    });
  });

  test('should reopen as a modal when the viewport shrinks', async () => {
    const listeners: ((event: Event) => void)[] = [];
    let matches = false;
    window.matchMedia = vi.fn().mockImplementation(() => ({
      get matches() {
        return matches;
      },
      addEventListener: (_: string, listener: (event: Event) => void) => listeners.push(listener),
      removeEventListener: () => {}
    }));
    render(SidePanelExample, { open: true });
    expect(show).toHaveBeenCalledOnce();

    matches = true;
    listeners.forEach((listener) => listener(new Event('change')));
    await waitFor(() => expect(showModal).toHaveBeenCalledOnce());
    expect(panel('Item details')).toHaveAttribute('open');
  });
});
