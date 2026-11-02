<script lang="ts" module>
  /** Only one tooltip is open at a time, across all instances. */
  let hideActive: (() => void) | null = null;
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type Placement =
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

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The tooltip's text: one or two words for a `label`, a short sentence for
     * a `description`.
     */
    label: string;
    /**
     * `label` makes the tooltip the trigger's accessible name, `description`
     * its accessible description.
     */
    type: 'label' | 'description';
    /**
     * Where to display the tooltip relative to its trigger. If there is not
     * enough room, the browser flips it to the opposite side. Default: `top`.
     */
    placement?: Placement;
    /**
     * The focusable element the tooltip belongs to. Spread the provided
     * attribute onto it.
     */
    trigger: Snippet<[{ 'aria-labelledby'?: string; 'aria-describedby'?: string }]>;
  }

  let { label, type, placement = 'top', trigger, ...rest }: Props = $props();

  const uid = $props.id();
  const tooltipId = `tooltip-${uid}`;
  const anchorName = `--tooltip-anchor-${uid}`;

  let popover: HTMLDivElement;
  let anchor: HTMLSpanElement;
  let open = $state(false);

  /* Which side of the trigger the tooltip ended up on, since a fallback
     placement may have flipped it, and where along that side the arrow points
     at the trigger's centre. */
  let measuredSide: string | null = $state(null);
  let arrowOffset: number | null = $state(null);
  const side = $derived(measuredSide ?? placement.split('-')[0]);

  /** Keeps the arrow clear of the tooltip's rounded corners. */
  const ARROW_PADDING = 16;

  function measure() {
    if (!open || !anchor || !popover) return;
    const triggerRect = anchor.getBoundingClientRect();
    const tooltipRect = popover.getBoundingClientRect();

    if (tooltipRect.bottom <= triggerRect.top + 1) measuredSide = 'top';
    else if (tooltipRect.top >= triggerRect.bottom - 1) measuredSide = 'bottom';
    else if (tooltipRect.right <= triggerRect.left + 1) measuredSide = 'left';
    else measuredSide = 'right';

    const vertical = measuredSide === 'top' || measuredSide === 'bottom';
    const center = vertical
      ? triggerRect.left + triggerRect.width / 2 - tooltipRect.left
      : triggerRect.top + triggerRect.height / 2 - tooltipRect.top;
    const length = vertical ? tooltipRect.width : tooltipRect.height;
    arrowOffset = Math.min(Math.max(center, ARROW_PADDING), length - ARROW_PADDING);
  }

  function show() {
    if (open) return;
    hideActive?.();
    hideActive = hide;
    open = true;
    popover.showPopover?.();
    requestAnimationFrame(measure);
  }

  function hide() {
    if (!open) return;
    if (hideActive === hide) hideActive = null;
    open = false;
    measuredSide = null;
    arrowOffset = null;
    popover.hidePopover?.();
  }

  $effect(() => () => {
    if (hideActive === hide) hideActive = null;
  });

  function handleFocusIn(event: FocusEvent) {
    if ((event.target as Element).matches(':focus-visible')) show();
  }

  /** Moving the pointer between the trigger and the tooltip keeps it open. */
  function handleMouseLeave(event: MouseEvent) {
    const next = event.relatedTarget as Node | null;
    if (!anchor.contains(next) && !popover.contains(next)) hide();
  }
</script>

<svelte:document onkeydown={(event) => open && event.key === 'Escape' && hide()} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  bind:this={anchor}
  class="trigger"
  style="anchor-name: {anchorName};"
  onfocusin={handleFocusIn}
  onfocusout={hide}
  onmouseenter={show}
  onmouseleave={handleMouseLeave}
>
  {@render trigger(
    type === 'label' ? { 'aria-labelledby': tooltipId } : { 'aria-describedby': tooltipId }
  )}
</span>

<div
  {...rest}
  bind:this={popover}
  id={tooltipId}
  popover="manual"
  role="tooltip"
  class="base"
  data-placement={placement}
  data-side={side}
  style:position-anchor={anchorName}
  style:--tooltip-arrow-offset={arrowOffset === null ? undefined : `${arrowOffset}px`}
  onmouseenter={show}
  onmouseleave={handleMouseLeave}
>
  <div class="content">{label}</div>
  <div class="arrow"></div>
</div>

<style>
  .trigger {
    display: inline-block;

    /* A flex or grid parent blockifies the wrapper, which would stretch the
       anchor beyond the trigger and misalign the tooltip. */
    width: fit-content;
    height: fit-content;
  }

  .base {
    /* The arrow should be 8px tall. A square element is rotated to achieve a
       triangular shape: √(8^2 + 8^2) / 8 ≈ 1.414 */
    --tooltip-arrow-size: calc(var(--cui-spacings-byte) * 1.414);
    --tooltip-offset: var(--cui-spacings-kilo);

    position: fixed;
    z-index: var(--cui-z-index-tooltip);

    /* The user agent stylesheet sets `inset: 0` on popovers, which would win
       over the insets that `position-area` resolves to. */
    inset: auto;
    width: max-content;
    max-width: min(360px, calc(100vw - 8px));
    padding: 0;
    margin: 0;
    overflow: visible;
    pointer-events: none;
    background: none;
    border: none;
    opacity: 0;
    position-try-fallbacks:
      flip-block,
      flip-inline,
      flip-block flip-inline;
    transition:
      opacity var(--cui-transitions-default),
      overlay var(--cui-transitions-default) allow-discrete,
      display var(--cui-transitions-default) allow-discrete;
  }

  /* Appears after a second, so that passing the pointer over a trigger doesn't
     flash its tooltip; disappears at once. */
  .base:popover-open {
    pointer-events: auto;
    opacity: 1;
    transition-delay: 1s;
  }

  @starting-style {
    .base:popover-open {
      opacity: 0;
    }
  }

  /* Covers the gap to the trigger, so the pointer can move onto the tooltip
     without dismissing it. */
  .base::before {
    position: absolute;
    inset: calc(-1 * var(--tooltip-offset));
    content: '';
  }

  /* Placements — the trigger is the center tile of an implicit 3x3 grid. When a
     fallback flips the tooltip, the browser flips these margins with it. */
  [data-placement^='top'] {
    margin-bottom: var(--tooltip-offset);
  }

  [data-placement^='bottom'] {
    margin-top: var(--tooltip-offset);
  }

  [data-placement^='left'] {
    margin-right: var(--tooltip-offset);
  }

  [data-placement^='right'] {
    margin-left: var(--tooltip-offset);
  }

  /* Keeps a centred tooltip off the edge of the screen. */
  [data-placement='top'],
  [data-placement='bottom'] {
    margin-inline: 4px;
  }

  [data-placement='left'],
  [data-placement='right'] {
    margin-block: 4px;
  }

  [data-placement='top'] {
    position-area: block-start;
  }

  [data-placement='top-start'] {
    position-area: block-start span-inline-end;
  }

  [data-placement='top-end'] {
    position-area: block-start span-inline-start;
  }

  [data-placement='bottom'] {
    position-area: block-end;
  }

  [data-placement='bottom-start'] {
    position-area: block-end span-inline-end;
  }

  [data-placement='bottom-end'] {
    position-area: block-end span-inline-start;
  }

  [data-placement='left'] {
    position-area: inline-start;
  }

  [data-placement='left-start'] {
    position-area: inline-start span-block-end;
  }

  [data-placement='left-end'] {
    position-area: inline-start span-block-start;
  }

  [data-placement='right'] {
    position-area: inline-end;
  }

  [data-placement='right-start'] {
    position-area: inline-end span-block-end;
  }

  [data-placement='right-end'] {
    position-area: inline-end span-block-start;
  }

  .content {
    position: relative;
    padding: var(--cui-spacings-byte) var(--cui-spacings-kilo);
    font-size: var(--cui-body-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-elevated);
    border: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-radius: var(--cui-border-radius-byte);
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 8%);
  }

  /* Arrow — a square rotated into a triangle, with two of its borders showing
     to continue the border of the tooltip */
  .arrow {
    position: absolute;
    width: var(--tooltip-arrow-size);
    height: var(--tooltip-arrow-size);
    background-color: var(--cui-bg-elevated);
    border-right: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-bottom: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-bottom-right-radius: 2px;
  }

  [data-side='top'] .arrow {
    top: calc(100% - (var(--tooltip-arrow-size) / 2));
    left: calc(var(--tooltip-arrow-offset, 50%) - (var(--tooltip-arrow-size) / 2));
    transform: rotate(45deg);
  }

  [data-side='right'] .arrow {
    right: calc(100% - (var(--tooltip-arrow-size) / 2));
    top: calc(var(--tooltip-arrow-offset, 50%) - (var(--tooltip-arrow-size) / 2));
    transform: rotate(135deg);
  }

  [data-side='bottom'] .arrow {
    bottom: calc(100% - (var(--tooltip-arrow-size) / 2));
    left: calc(var(--tooltip-arrow-offset, 50%) - (var(--tooltip-arrow-size) / 2));
    transform: rotate(225deg);
  }

  [data-side='left'] .arrow {
    top: calc(var(--tooltip-arrow-offset, 50%) - (var(--tooltip-arrow-size) / 2));
    left: calc(100% - (var(--tooltip-arrow-size) / 2));
    transform: rotate(315deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition-duration: 0s;
    }
  }
</style>
