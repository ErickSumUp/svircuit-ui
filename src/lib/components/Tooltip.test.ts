import { fireEvent, render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { beforeAll, describe, expect, test } from 'vitest';

import Tooltip from './Tooltip.svelte';

beforeAll(() => {
  HTMLElement.prototype.showPopover ??= function (this: HTMLElement) {
    this.dataset.open = '';
  };
  HTMLElement.prototype.hidePopover ??= function (this: HTMLElement) {
    delete this.dataset.open;
  };
});

const trigger = (label = 'Upload') =>
  createRawSnippet((attributes: () => Record<string, string>) => ({
    render: () => `<button type="button">${label}</button>`,
    setup: (button) => {
      for (const [name, value] of Object.entries(attributes())) button.setAttribute(name, value);
    }
  }));

const baseProps = {
  label: 'This may take a few minutes',
  type: 'description' as const,
  trigger: trigger()
};

const isOpen = () => screen.getByRole('tooltip', { hidden: true }).hasAttribute('data-open');

test('should match story case', async () => {
  const { container } = render(Tooltip, baseProps);

  expect(container).toMatchSnapshot();
});

test('should describe the trigger', async () => {
  render(Tooltip, baseProps);

  expect(screen.getByRole('button', { name: 'Upload' })).toHaveAccessibleDescription(
    'This may take a few minutes'
  );
});

test('should label the trigger', async () => {
  render(Tooltip, { label: 'Transfer out', type: 'label', trigger: trigger('') });

  expect(screen.getByRole('button', { name: 'Transfer out' })).toBeInTheDocument();
});

describe('showing and hiding', () => {
  test('should show on hover and hide when the pointer leaves', async () => {
    render(Tooltip, baseProps);
    const button = screen.getByRole('button');

    await userEvent.hover(button);
    expect(isOpen()).toBe(true);

    await userEvent.unhover(button);
    expect(isOpen()).toBe(false);
  });

  test('should stay open while the pointer moves onto the tooltip', async () => {
    render(Tooltip, baseProps);
    const wrapper = screen.getByRole('button').parentElement!;
    const tooltip = screen.getByRole('tooltip', { hidden: true });

    await fireEvent.mouseEnter(wrapper);
    await fireEvent.mouseLeave(wrapper, { relatedTarget: tooltip });

    expect(isOpen()).toBe(true);
  });

  test('should hide on Escape', async () => {
    render(Tooltip, baseProps);

    await userEvent.hover(screen.getByRole('button'));
    await userEvent.keyboard('{Escape}');

    expect(isOpen()).toBe(false);
  });

  test('should hide on blur', async () => {
    render(Tooltip, baseProps);
    const button = screen.getByRole('button');

    await userEvent.hover(button);
    await fireEvent.focusOut(button);

    expect(isOpen()).toBe(false);
  });

  test('should only show one tooltip at a time', async () => {
    render(Tooltip, { ...baseProps, trigger: trigger('First') });
    render(Tooltip, { ...baseProps, trigger: trigger('Second') });
    const [first, second] = screen.getAllByRole('tooltip', { hidden: true });

    await fireEvent.mouseEnter(screen.getByText('First').parentElement!);
    await fireEvent.mouseEnter(screen.getByText('Second').parentElement!);

    expect(first).not.toHaveAttribute('data-open');
    expect(second).toHaveAttribute('data-open');
  });
});

test.each(['top', 'bottom-start', 'right-end'] as const)(
  'should apply the %s placement',
  async (placement) => {
    render(Tooltip, { ...baseProps, placement });

    expect(screen.getByRole('tooltip', { hidden: true })).toHaveAttribute(
      'data-placement',
      placement
    );
  }
);
