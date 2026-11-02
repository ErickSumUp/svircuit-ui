import { createRawSnippet, flushSync, tick } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { beforeAll, expect, test, vi } from 'vitest';

import ActionMenu, { type ActionMenuAction, type ActionMenuDivider } from './ActionMenu.svelte';

beforeAll(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  });
  HTMLElement.prototype.togglePopover ??= function (this: HTMLElement, force?: boolean) {
    const isOpen = this.hasAttribute('data-open');
    const open = force ?? !isOpen;
    if (open === isOpen) return open;
    this.toggleAttribute('data-open', open);
    this.dispatchEvent(Object.assign(new Event('toggle'), { newState: open ? 'open' : 'closed' }));
    return open;
  };
  HTMLElement.prototype.hidePopover ??= function (this: HTMLElement) {
    this.togglePopover(false);
  };
});

type TriggerProps = Record<string, unknown> & { onkeydown: (event: KeyboardEvent) => void };

const trigger = createRawSnippet((props: () => TriggerProps) => ({
  render: () => `<button type="button" aria-controls="${props()['aria-controls']}">Open</button>`,
  setup: (button) => {
    button.addEventListener('keydown', (event) => props().onkeydown(event as KeyboardEvent));
  }
}));

const icon = createRawSnippet(() => ({ render: () => '<svg data-testid="icon"></svg>' }));

function getActions(): (ActionMenuAction | ActionMenuDivider)[] {
  return [
    { label: 'Add', icon, onclick: vi.fn() },
    { label: 'Edit', onclick: vi.fn() },
    { type: 'divider' },
    { label: 'Help', href: '/help' },
    { label: 'Archive', disabled: true },
    { label: 'Delete', destructive: true, onclick: vi.fn() }
  ];
}

function renderMenu(props: Record<string, unknown> = {}) {
  const actions = getActions();
  const result = render(ActionMenu, { trigger, actions, ...props });
  return { ...result, actions, popover: document.querySelector<HTMLElement>('[popover]')! };
}

test('should match story case', async () => {
  const { container } = renderMenu();

  expect(container).toMatchSnapshot();
});

test('should render buttons, links, a divider and icons', async () => {
  const { popover } = renderMenu();

  const buttons = popover.querySelectorAll('button.item');
  expect([...buttons].map((button) => button.textContent?.trim())).toEqual([
    'Add',
    'Edit',
    'Archive',
    'Delete'
  ]);
  expect(popover.querySelector('a.item')).toHaveAttribute('href', '/help');
  expect(popover.querySelector('hr')).toHaveAttribute('aria-hidden', 'true');
  expect(popover.querySelectorAll('[data-testid="icon"]')).toHaveLength(1);
});

test('should mark destructive and disabled actions', async () => {
  const { popover } = renderMenu();

  const [, , archive, remove] = popover.querySelectorAll('button.item');
  expect(archive).toBeDisabled();
  expect(remove).toHaveClass('destructive');
});

test('should call the action and close the menu on click', async () => {
  const { popover, actions } = renderMenu({ open: true });
  await tick();

  await userEvent.click(popover.querySelector('button.item')!);

  expect((actions[0] as ActionMenuAction).onclick).toHaveBeenCalledOnce();
  expect(popover).not.toHaveAttribute('data-open');
});

test('should open with the down arrow and focus the first action', async () => {
  const { popover } = renderMenu();

  screen.getByRole('button', { name: 'Open' }).focus();
  await userEvent.keyboard('{ArrowDown}');
  await tick();

  expect(popover).toHaveAttribute('data-open');
  expect(document.activeElement).toHaveTextContent('Add');
});

test('should open with the up arrow and focus the last action', async () => {
  renderMenu();

  screen.getByRole('button', { name: 'Open' }).focus();
  await userEvent.keyboard('{ArrowUp}');
  await tick();

  expect(document.activeElement).toHaveTextContent('Delete');
});

test('should move focus with the arrow keys, wrapping and skipping disabled actions', async () => {
  renderMenu({ open: true });
  await tick();
  flushSync();
  expect(document.activeElement).toHaveTextContent('Add');

  await userEvent.keyboard('{ArrowUp}');
  expect(document.activeElement).toHaveTextContent('Delete');

  await userEvent.keyboard('{ArrowUp}');
  expect(document.activeElement).toHaveTextContent('Help');

  await userEvent.keyboard('{ArrowDown}{ArrowDown}');
  expect(document.activeElement).toHaveTextContent('Add');
});

test('should hide the close button outside the mobile sheet', async () => {
  const { popover } = renderMenu();

  expect(popover.querySelector('.close')).toBeNull();
});

test('should not offset the menu by default', async () => {
  const { popover } = renderMenu();

  expect(popover.style.getPropertyValue('--popover-offset')).toBe('0px');
  expect(popover.style.getPropertyValue('--popover-padding-inline')).toBe('0');
  expect(popover.style.getPropertyValue('--popover-padding-block')).toBe('0');
});
