<script lang="ts" module>
  export type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /**
     * The state of the popover. Bindable, but the browser owns the source of
     * truth: it is also updated when the user dismisses the popover by
     * clicking outside of it or pressing escape.
     */
    open?: boolean;
    /**
     * Where to place the popover relative to its trigger. Default: 'bottom'.
     */
    placement?: Placement;
    /**
     * The placements to try, in order, when there is not enough room for the
     * popover. By default the browser flips it to the opposite side.
     */
    fallbackPlacements?: Placement[];
    /**
     * Moves the popover away from its trigger. A number is the distance in
     * pixels on the main axis, towards or away from the trigger. An object
     * also moves it along the trigger's edge, on the cross axis.
     * Default: 8.
     */
    offset?: number | { mainAxis?: number; crossAxis?: number };
    /**
     * Render the popover as a sheet anchored to the bottom of the viewport on
     * narrow screens. Default: true.
     */
    sheetOnMobile?: boolean;
    /**
     * Text label for the close button, for screen readers. Default: 'Close'.
     */
    closeButtonLabel?: string;
    /**
     * Hide the close button, for example when the content already has a way to
     * dismiss the popover. Default: false.
     */
    hideCloseButton?: boolean;
    /**
     * The element that toggles the popover, also known as the reference
     * element. Spread the provided attributes onto a `button`.
     */
    trigger: Snippet<
      [{ popovertarget: string; 'aria-controls': string; 'aria-expanded': boolean }]
    >;
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
    fallbackPlacements,
    offset = 8,
    sheetOnMobile = true,
    closeButtonLabel = 'Close',
    hideCloseButton = false,
    trigger,
    children,
    class: className,
    style,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const contentId = `popover-${uid}`;
  const anchorName = `--popover-anchor-${uid}`;

  let popover: HTMLDivElement;

  const mainAxis = $derived(typeof offset === 'number' ? offset : (offset.mainAxis ?? 0));
  const crossAxis = $derived(typeof offset === 'number' ? 0 : (offset.crossAxis ?? 0));

  /* Each placement has a matching `@position-try` rule below, named after it. */
  const tryFallbacks = $derived(
    fallbackPlacements?.map((fallback) => `--popover-${fallback}`).join(', ')
  );

  const popoverStyle = $derived(
    [
      `position-anchor: ${anchorName}`,
      `--popover-offset: ${mainAxis}px`,
      `--popover-cross-offset: ${crossAxis}px`,
      tryFallbacks && `--popover-try-fallbacks: ${tryFallbacks}`,
      style
    ]
      .filter(Boolean)
      .join('; ')
  );

  /**
   * The browser toggles the popover natively, including light dismiss and the
   * escape key. We only mirror the resulting state back into `open`.
   */
  function handleToggle(event: ToggleEvent) {
    open = event.newState === 'open';
  }

  function close() {
    popover.hidePopover?.();
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
  {@render trigger({ popovertarget: contentId, 'aria-controls': contentId, 'aria-expanded': open })}
</div>

<div
  bind:this={popover}
  id={contentId}
  popover="auto"
  role="dialog"
  ontoggle={handleToggle}
  {...rest}
  class={['base', placement, sheetOnMobile && 'sheet', className]}
  style={popoverStyle}
>
  <div class="content">
    {@render children({ close })}
  </div>

  {#if !hideCloseButton}
    <!-- Inlined from the CloseButton component, tertiary in size m. -->
    <button
      type="button"
      class="close focus-visible"
      title={closeButtonLabel}
      aria-label={closeButtonLabel}
      onclick={close}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.293 5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586z"
        />
      </svg>
    </button>
  {/if}
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
    overflow: hidden;
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-elevated);
    border: none;
    border-radius: var(--cui-border-radius-byte);
    box-shadow: 0 3px 8px 0 rgb(0 0 0 / 20%);

    /* The native equivalent of a "flip" strategy: when the preferred side
       doesn't fit, the browser retries on the opposite one. The
       `fallbackPlacements` prop replaces it through a custom property, so the
       sheet below can still turn fallbacks off. */
    position-try-fallbacks: var(
      --popover-try-fallbacks,
      flip-block,
      flip-inline,
      flip-block flip-inline
    );
  }

  /* A column layout lets the content scroll on its own, so that the close
     button stays in the corner. Only an open popover may set `display`, or it
     would override the user agent rule that hides a closed one. */
  .base:popover-open {
    display: flex;
    flex-direction: column;
  }

  /* Placements — the trigger is the center tile of an implicit 3x3 grid, and
     the `span-*` values align the popover with one of the trigger's edges.
     When a fallback flips the popover, the browser flips these margins with
     it, so the gap always sits between the popover and its trigger. The cross
     offset is a `translate`, which leaves the animated `transform` alone. */
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

  .left,
  .left-start,
  .left-end {
    margin-right: var(--popover-offset);
  }

  .right,
  .right-start,
  .right-end {
    margin-left: var(--popover-offset);
  }

  .top,
  .top-start,
  .top-end,
  .bottom,
  .bottom-start,
  .bottom-end {
    translate: var(--popover-cross-offset) 0;
  }

  .left,
  .left-start,
  .left-end,
  .right,
  .right-start,
  .right-end {
    translate: 0 var(--popover-cross-offset);
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

  .left-start {
    position-area: inline-start span-block-end;
  }

  .left-end {
    position-area: inline-start span-block-start;
  }

  .right {
    position-area: inline-end;
  }

  .right-start {
    position-area: inline-end span-block-end;
  }

  .right-end {
    position-area: inline-end span-block-start;
  }

  /* Fallbacks — the same placements as named rules, for
     `position-try-fallbacks`. A fallback replaces every margin, so each one
     restates the offset and the edge margins of its placement. */
  @position-try --popover-top {
    position-area: block-start;
    margin: 0 var(--cui-spacings-byte) var(--popover-offset);
  }

  @position-try --popover-top-start {
    position-area: block-start span-inline-end;
    margin: 0 0 var(--popover-offset);
  }

  @position-try --popover-top-end {
    position-area: block-start span-inline-start;
    margin: 0 0 var(--popover-offset);
  }

  @position-try --popover-bottom {
    position-area: block-end;
    margin: var(--popover-offset) var(--cui-spacings-byte) 0;
  }

  @position-try --popover-bottom-start {
    position-area: block-end span-inline-end;
    margin: var(--popover-offset) 0 0;
  }

  @position-try --popover-bottom-end {
    position-area: block-end span-inline-start;
    margin: var(--popover-offset) 0 0;
  }

  @position-try --popover-left {
    position-area: inline-start;
    margin: var(--cui-spacings-byte) var(--popover-offset) var(--cui-spacings-byte) 0;
  }

  @position-try --popover-left-start {
    position-area: inline-start span-block-end;
    margin: 0 var(--popover-offset) 0 0;
  }

  @position-try --popover-left-end {
    position-area: inline-start span-block-start;
    margin: 0 var(--popover-offset) 0 0;
  }

  @position-try --popover-right {
    position-area: inline-end;
    margin: var(--cui-spacings-byte) 0 var(--cui-spacings-byte) var(--popover-offset);
  }

  @position-try --popover-right-start {
    position-area: inline-end span-block-end;
    margin: 0 0 0 var(--popover-offset);
  }

  @position-try --popover-right-end {
    position-area: inline-end span-block-start;
    margin: 0 0 0 var(--popover-offset);
  }

  .content {
    min-height: 0;
    padding: var(--cui-spacings-mega);
    overflow-y: auto;
  }

  /* Close button — inlined from the CloseButton component */
  .close {
    position: absolute;
    top: var(--cui-spacings-byte);
    right: var(--cui-spacings-byte);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    margin: 0;
    color: var(--cui-fg-accent);
    cursor: pointer;
    background-color: transparent;
    border: var(--cui-border-width-kilo) solid transparent;
    border-radius: var(--cui-border-radius-kilo);
    transition: color var(--cui-transitions-default);
  }

  .close:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .close:active {
    color: var(--cui-fg-accent-pressed);
    transform: translate(0, 1px);
  }

  .focus-visible:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .focus-visible:focus:not(:focus-visible) {
    box-shadow: none;
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

  @media (max-width: 479px) {
    .content {
      padding: var(--cui-spacings-kilo);
    }

    .close {
      top: var(--cui-spacings-bit);
      right: var(--cui-spacings-bit);
    }
  }

  /* On narrow screens the popover covers the full width at the bottom of the
     viewport instead of hugging its trigger. */
  @media (max-width: 479px) {
    .sheet {
      position-area: none;
      position-try-fallbacks: none;
      inset: auto 0 0;
      width: auto;
      max-width: 100%;
      max-height: 90dvh;
      margin: 0;
      border-radius: var(--cui-border-radius-byte) var(--cui-border-radius-byte) 0 0;
      transform: translateY(100%);
      translate: none;
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
      padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-kilo));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition-duration: 0s;
      transform: none;
    }
  }
</style>
