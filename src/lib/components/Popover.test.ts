import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { describe, test, expect, vi } from 'vitest';

import Popover from './Popover.svelte';
import { exampleSnippet } from './TestText.svelte';

type TriggerProps = { popovertarget: string; 'aria-controls': string; 'aria-expanded': boolean };

const trigger = createRawSnippet((props: () => TriggerProps) => ({
  render: () => {
    const { popovertarget, 'aria-controls': controls, 'aria-expanded': expanded } = props();
    return `<button type="button" popovertarget="${popovertarget}" aria-controls="${controls}" aria-expanded="${expanded}">Open</button>`;
  }
}));

const baseProps = { trigger, children: exampleSnippet };

function getPopover() {
  return screen.getByRole('dialog', { hidden: true });
}

test('should match story case variants', async () => {
  const { container } = render(Popover, baseProps);

  expect(container).toMatchSnapshot();
});

test('should merge a custom class name with the default ones', async () => {
  render(Popover, { ...baseProps, class: 'foo' });

  expect(getPopover()).toHaveClass('base', 'bottom', 'sheet', 'foo');
});

test('should wire the trigger to the popover', async () => {
  render(Popover, baseProps);

  const button = screen.getByRole('button', { name: 'Open' });
  const popover = getPopover();
  expect(button).toHaveAttribute('popovertarget', popover.id);
  expect(button).toHaveAttribute('aria-controls', popover.id);
  expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('should apply the placement', async () => {
  render(Popover, { ...baseProps, placement: 'left-start' });

  expect(getPopover()).toHaveClass('left-start');
});

describe('offset', () => {
  test('should move the popover on the main axis by a number', async () => {
    render(Popover, { ...baseProps, offset: 20 });

    const { style } = getPopover();
    expect(style.getPropertyValue('--popover-offset')).toBe('20px');
    expect(style.getPropertyValue('--popover-cross-offset')).toBe('0px');
  });

  test('should move the popover on both axes by an object', async () => {
    render(Popover, { ...baseProps, offset: { mainAxis: 12, crossAxis: -4 } });

    const { style } = getPopover();
    expect(style.getPropertyValue('--popover-offset')).toBe('12px');
    expect(style.getPropertyValue('--popover-cross-offset')).toBe('-4px');
  });
});

describe('fallback placements', () => {
  test('should flip to the opposite side by default', async () => {
    render(Popover, baseProps);

    expect(getPopover().style.getPropertyValue('--popover-try-fallbacks')).toBe('');
  });

  test('should try the given placements in order', async () => {
    render(Popover, { ...baseProps, fallbackPlacements: ['top', 'right-start'] });

    expect(getPopover().style.getPropertyValue('--popover-try-fallbacks')).toBe(
      '--popover-top, --popover-right-start'
    );
  });

  test('should keep a custom style', async () => {
    render(Popover, { ...baseProps, fallbackPlacements: ['top'], style: 'width: 20rem' });

    expect(getPopover().style.width).toBe('20rem');
  });
});

describe('close button', () => {
  test('should render a close button with a default label', async () => {
    render(Popover, baseProps);

    expect(screen.getByRole('button', { name: 'Close', hidden: true })).toBeInTheDocument();
  });

  test('should use a custom label', async () => {
    render(Popover, { ...baseProps, closeButtonLabel: 'Dismiss' });

    expect(screen.getByRole('button', { name: 'Dismiss', hidden: true })).toBeInTheDocument();
  });

  test('should be hidden when asked', async () => {
    render(Popover, { ...baseProps, hideCloseButton: true });

    expect(screen.queryByRole('button', { name: 'Close', hidden: true })).toBeNull();
  });

  test('should close the popover', async () => {
    render(Popover, baseProps);
    const popover = getPopover();
    popover.hidePopover = vi.fn();

    await userEvent.click(screen.getByRole('button', { name: 'Close', hidden: true }));

    expect(popover.hidePopover).toHaveBeenCalledTimes(1);
  });
});
