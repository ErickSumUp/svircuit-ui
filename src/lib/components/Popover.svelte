<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The state of the popover. Bindable, but the browser owns the source of
     * truth: it is also updated when the user dismisses the popover by
     * clicking outside of it or pressing escape.
     */
    open?: boolean;
    /**
     * Where to place the popover relative to its trigger. If there is not
     * enough room, the browser flips it to the opposite side.
     * Default: 'bottom'.
     */
    placement?:
      'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right';
    /**
     * The distance in pixels between the popover and its trigger.
     * Default: 8.
     */
    offset?: number;
    /**
     * Render the popover as a sheet anchored to the bottom of the viewport on
     * narrow screens. Default: true.
     */
    sheetOnMobile?: boolean;
    /**
     * The element that toggles the popover, also known as the reference
     * element. Spread the provided attributes onto a `button`.
     */
    trigger: Snippet<[{ popovertarget: string; 'aria-expanded': boolean }]>;
    /**
     * The content of the popover. Receives a `close` function to dismiss the
     * popover from the inside, for example from a confirmation button.
     */
    children: Snippet<[{ close: () => void }]>;
    [key: string]: unknown;
  }

  let {
    open = $bindable(false),
    placement = 'bottom',
    offset = 8,
    sheetOnMobile = true,
    trigger,
    children,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const contentId = `popover-${uid}`;
  const anchorName = `--popover-anchor-${uid}`;

  let popover: HTMLDivElement;

  /**
   * The browser toggles the popover natively, including light dismiss and the
   * escape key. We only mirror the resulting state back into `open`.
   */
  function handleToggle(event: ToggleEvent) {
    open = event.newState === 'open';
  }

  function close() {
    popover.hidePopover();
  }

  /**
   * Lets a consumer open and close the popover by setting `open` themselves.
   * Toggling to the state the popover is already in does nothing, so this
   * never fights the browser. The optional call keeps the component working
   * where the Popover API is unavailable, in which case the content is always
   * visible.
   */
  $effect(() => {
    popover.togglePopover?.(open);
  });
</script>

<div class="trigger" style="anchor-name: {anchorName};">
  {@render trigger({ popovertarget: contentId, 'aria-expanded': open })}
</div>

<div
  bind:this={popover}
  id={contentId}
  popover="auto"
  ontoggle={handleToggle}
  class="base"
  class:top={placement === 'top'}
  class:top-start={placement === 'top-start'}
  class:top-end={placement === 'top-end'}
  class:bottom={placement === 'bottom'}
  class:bottom-start={placement === 'bottom-start'}
  class:bottom-end={placement === 'bottom-end'}
  class:left={placement === 'left'}
  class:right={placement === 'right'}
  class:sheet={sheetOnMobile}
  style="position-anchor: {anchorName}; --popover-offset: {offset}px;"
  {...rest}
>
  <div class="content">
    {@render children({ close })}
  </div>
</div>

<style>
  .trigger {
    display: inline-block;

    /* A flex or grid parent blockifies the wrapper, which would stretch the
       anchor beyond the trigger and misalign the popover. */
    width: fit-content;
    height: fit-content;
  }

  .base {
    position: fixed;

    /* The user agent stylesheet sets `inset: 0` on popovers, which would win
       over the insets that `position-area` resolves to and leave the popover
       stuck in the corner of the viewport. */
    inset: auto;
    width: max-content;
    max-width: calc(100vw - 2 * var(--cui-spacings-byte));

    /* With `position-area` the popover is laid out inside a single tile of the
       implicit grid around the trigger, so a full-height limit resolves to the
       space that is actually available on that side. Leaving it at exactly
       100% is deliberate: together with the offset below, tall content still
       overflows its tile, which is what asks the browser for a fallback
       placement instead of quietly squeezing the popover into a sliver. */
    max-height: 100%;
    padding: 0;

    /* The offset is applied per placement below, on the single side that faces
       the trigger, so that an edge-aligned popover stays flush with it. */
    margin: 0;

    /* Content taller than the space beside the trigger scrolls within the
       popover rather than overflowing past the edge of the screen. */
    overflow: hidden auto;
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-elevated);
    border: none;
    border-radius: var(--cui-border-radius-byte);
    box-shadow: 0 3px 8px 0 rgb(0 0 0 / 20%);

    /* The native equivalent of a "flip" strategy: when the preferred side
       doesn't fit, the browser retries on the opposite one. */
    position-try-fallbacks:
      flip-block,
      flip-inline,
      flip-block flip-inline;
  }

  /* Placements — the trigger is the center tile of an implicit 3x3 grid, and
     the `span-*` values align the popover with one of the trigger's edges.
     When a fallback flips the popover, the browser flips these margins with
     it, so the gap always sits between the popover and its trigger. */
  .top,
  .top-start,
  .top-end {
    margin-bottom: var(--popover-offset);
  }

  .bottom,
  .bottom-start,
  .bottom-end {
    margin-top: var(--popover-offset);
  }

  .left {
    margin-right: var(--popover-offset);
  }

  .right {
    margin-left: var(--popover-offset);
  }

  /* A symmetrical margin on the cross axis leaves a centred popover centred,
     but keeps it off the edge of the screen when it is too wide to fit beside
     its trigger. The edge-aligned placements are left flush on purpose. */
  .top,
  .bottom {
    margin-inline: var(--cui-spacings-byte);
  }

  .left,
  .right {
    margin-block: var(--cui-spacings-byte);
  }

  .top {
    position-area: block-start;
  }

  .top-start {
    position-area: block-start span-inline-end;
  }

  .top-end {
    position-area: block-start span-inline-start;
  }

  .bottom {
    position-area: block-end;
  }

  .bottom-start {
    position-area: block-end span-inline-end;
  }

  .bottom-end {
    position-area: block-end span-inline-start;
  }

  .left {
    position-area: inline-start;
  }

  .right {
    position-area: inline-end;
  }

  .content {
    padding: var(--cui-spacings-mega);
  }

  /* Animations, driven entirely by the popover's own open state */
  .base {
    opacity: 0;
    transition:
      opacity var(--cui-transitions-default),
      transform var(--cui-transitions-default),
      overlay var(--cui-transitions-default) allow-discrete,
      display var(--cui-transitions-default) allow-discrete;
    transform: scale(0.95);
  }

  .base:popover-open {
    opacity: 1;
    transform: scale(1);
  }

  @starting-style {
    .base:popover-open {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  /* On narrow screens the popover covers the full width at the bottom of the
     viewport instead of hugging its trigger. */
  @media (max-width: 479px) {
    .sheet {
      position-area: none;
      inset: auto 0 0;
      width: auto;
      max-width: 100%;
      max-height: 90dvh;
      margin: 0;
      border-radius: var(--cui-border-radius-byte) var(--cui-border-radius-byte) 0 0;
      transform: translateY(100%);
    }

    .sheet:popover-open {
      transform: translateY(0);
    }

    @starting-style {
      .sheet:popover-open {
        transform: translateY(100%);
      }
    }

    .sheet::backdrop {
      background-color: var(--cui-bg-overlay);
    }

    .sheet .content {
      padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-mega));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition-duration: 0s;
      transform: none;
    }
  }
</style>
