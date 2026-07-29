<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Action {
    /**
     * The label of the action. Use one strong, clear imperative verb and
     * follow with a one-word object if needed to clarify.
     */
    label: string;
    /**
     * Renders the action as a link to this URL.
     */
    href?: string;
    /**
     * Where to open the link, such as `_blank`.
     */
    target?: string;
    /**
     * Called when the action is pressed. The toggletip closes afterwards
     * either way.
     */
    onclick?: (event: MouseEvent) => void;
    /**
     * An optional trailing icon, such as an arrow for a link.
     */
    icon?: Snippet;
  }

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The state of the toggletip. Bindable, but the browser owns the source of
     * truth: it is also updated when the user dismisses the toggletip by
     * clicking outside of it or pressing escape. Default: false.
     */
    open?: boolean;
    /**
     * The optional headline acts as the toggletip's accessible name.
     * Keep it short and under 120 characters.
     */
    headline?: string;
    /**
     * Use the body text to provide additional help or to define a term. It acts
     * as the toggletip's accessible description, or as its accessible name when
     * no headline is present.
     */
    body: string;
    /**
     * Use the optional action to point the user to additional information or to
     * enable a contextual action.
     */
    action?: Action;
    /**
     * Where to display the toggletip relative to its trigger. If there is not
     * enough room, the browser flips it to the opposite side.
     * Default: 'top'.
     */
    placement?:
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
    /**
     * The distance in pixels between the toggletip and its trigger.
     * Default: 12.
     */
    offset?: number;
    /**
     * Text label for the close button for screen readers.
     * Important for accessibility. Default: 'Close'.
     */
    closeButtonLabel?: string;
    /**
     * The element that toggles the toggletip, also known as the reference
     * element. Spread the provided attributes onto a `button`.
     */
    trigger: Snippet<
      [{ popovertarget: string; 'aria-haspopup': 'dialog'; 'aria-expanded': boolean }]
    >;
    [key: string]: unknown;
  }

  let {
    open = $bindable(false),
    headline,
    body,
    action,
    placement = 'top',
    offset = 12,
    closeButtonLabel = 'Close',
    trigger,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const contentId = `toggletip-${uid}`;
  const headlineId = `toggletip-headline-${uid}`;
  const bodyId = `toggletip-body-${uid}`;
  const anchorName = `--toggletip-anchor-${uid}`;

  let popover: HTMLDivElement;
  let anchor: HTMLDivElement;

  /* Which side of the trigger the toggletip ended up on, which is what the
     arrow points from. It starts out as the requested placement and is
     remeasured once the browser has positioned the toggletip, since a fallback
     placement may have moved it to the opposite side. */
  let measuredSide: string | null = $state(null);

  const alignment = $derived(placement.split('-')[1] ?? 'center');
  const side = $derived(measuredSide ?? placement.split('-')[0]);

  function measureSide() {
    const triggerRect = anchor.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();

    if (popoverRect.bottom <= triggerRect.top + 1) {
      measuredSide = 'top';
    } else if (popoverRect.top >= triggerRect.bottom - 1) {
      measuredSide = 'bottom';
    } else if (popoverRect.right <= triggerRect.left + 1) {
      measuredSide = 'left';
    } else {
      measuredSide = 'right';
    }
  }

  /**
   * The browser toggles the toggletip natively, including light dismiss and the
   * escape key. We only mirror the resulting state back into `open`.
   */
  function handleToggle(event: ToggleEvent) {
    open = event.newState === 'open';

    if (open) {
      // The toggletip is positioned on the frame after it is shown.
      requestAnimationFrame(measureSide);
    } else {
      measuredSide = null;
    }
  }

  function close() {
    popover.hidePopover();
  }

  function handleActionClick(event: MouseEvent) {
    action?.onclick?.(event);
    close();
  }

  /**
   * Lets a consumer open and close the toggletip by setting `open` themselves.
   * Toggling to the state the toggletip is already in does nothing, so this
   * never fights the browser. The optional call keeps the component working
   * where the Popover API is unavailable, in which case the content is always
   * visible.
   */
  $effect(() => {
    popover.togglePopover?.(open);
  });
</script>

<svelte:window onresize={() => open && measureSide()} />

<div bind:this={anchor} class="trigger" style="anchor-name: {anchorName};">
  {@render trigger({
    popovertarget: contentId,
    'aria-haspopup': 'dialog',
    'aria-expanded': open
  })}
</div>

<div
  bind:this={popover}
  id={contentId}
  popover="auto"
  ontoggle={handleToggle}
  role="dialog"
  aria-labelledby={headline ? headlineId : bodyId}
  aria-describedby={headline ? bodyId : undefined}
  class="base"
  class:top={placement === 'top'}
  class:top-start={placement === 'top-start'}
  class:top-end={placement === 'top-end'}
  class:bottom={placement === 'bottom'}
  class:bottom-start={placement === 'bottom-start'}
  class:bottom-end={placement === 'bottom-end'}
  class:left={placement === 'left'}
  class:left-start={placement === 'left-start'}
  class:left-end={placement === 'left-end'}
  class:right={placement === 'right'}
  class:right-start={placement === 'right-start'}
  class:right-end={placement === 'right-end'}
  data-side={side}
  data-alignment={alignment}
  style="position-anchor: {anchorName}; --toggletip-offset: {offset}px;"
  {...rest}
>
  <div class="content">
    {#if headline}
      <h2 id={headlineId} class="headline">{headline}</h2>
    {/if}
    <p id={bodyId} class="body">{body}</p>
    {#if action}
      <svelte:element
        this={action.href ? 'a' : 'button'}
        class="action"
        href={action.href}
        target={action.target}
        rel={action.target === '_blank' ? 'noreferrer noopener' : undefined}
        type={action.href ? undefined : 'button'}
        role={action.href ? undefined : 'button'}
        onclick={handleActionClick}
      >
        <span class="action-label">{action.label}</span>
        {#if action.icon}
          {@render action.icon()}
        {/if}
      </svelte:element>
    {/if}
    <button class="close" type="button" onclick={close}>
      {@render crossSVG()}
      <span class="hide-visually">{closeButtonLabel}</span>
    </button>
  </div>
  <div class="arrow"></div>
</div>

{#snippet crossSVG()}
  <svg
    class="close-icon"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20.71 19.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29L12 13.42l-7.29 7.29c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71L10.58 12 3.29 4.71A1.014 1.014 0 0 1 3 4a1 1 0 0 1 1-1c.266 0 .52.104.71.29L12 10.58l7.29-7.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L13.42 12l7.29 7.29z"
      fill="currentColor"
    />
  </svg>
{/snippet}

<style>
  .trigger {
    display: inline-block;

    /* A flex or grid parent blockifies the wrapper, which would stretch the
       anchor beyond the trigger and misalign the toggletip. */
    width: fit-content;
    height: fit-content;
  }

  .base {
    /* The arrow should be 8px tall. A square element is rotated to achieve a
       triangular shape. Using Pythagoras' theorem, we can calculate the ratio
       between the triangle height and the square sides:
       √(8^2 + 8^2) / 8 ≈ 1.414 */
    --toggletip-arrow-size: calc(var(--cui-spacings-byte) * 1.414);

    /* Keeps the arrow roughly opposite the trigger on edge-aligned placements,
       the way Floating UI's arrow padding does in circuit-ui. */
    --toggletip-arrow-inset: var(--cui-spacings-mega);

    position: fixed;
    z-index: var(--cui-z-index-tooltip);

    /* The user agent stylesheet sets `inset: 0` on popovers, which would win
       over the insets that `position-area` resolves to and leave the toggletip
       stuck in the corner of the viewport. */
    inset: auto;
    width: max-content;
    max-width: min(360px, 100vw);
    padding: 0;

    /* The offset is applied per placement below, on the single side that faces
       the trigger, so that an edge-aligned toggletip stays flush with it. */
    margin: 0;

    /* The arrow sticks out of the toggletip. */
    overflow: visible;
    background: none;
    border: none;

    /* The native equivalent of a "flip" strategy: when the preferred side
       doesn't fit, the browser retries on the opposite one. */
    position-try-fallbacks:
      flip-block,
      flip-inline,
      flip-block flip-inline;
  }

  /* Placements — the trigger is the center tile of an implicit 3x3 grid, and
     the `span-*` values align the toggletip with one of the trigger's edges.
     When a fallback flips the toggletip, the browser flips these margins with
     it, so the gap always sits between the toggletip and its trigger. */
  .top,
  .top-start,
  .top-end {
    margin-bottom: var(--toggletip-offset);
  }

  .bottom,
  .bottom-start,
  .bottom-end {
    margin-top: var(--toggletip-offset);
  }

  .left,
  .left-start,
  .left-end {
    margin-right: var(--toggletip-offset);
  }

  .right,
  .right-start,
  .right-end {
    margin-left: var(--toggletip-offset);
  }

  /* A symmetrical margin on the cross axis leaves a centred toggletip centred,
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

  .content {
    position: relative;
    padding: var(--cui-spacings-mega);
    color: var(--cui-fg-normal);
    outline: 0;
    background-color: var(--cui-bg-elevated);
    border: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-radius: var(--cui-border-radius-byte);
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 8%);
  }

  /* Headline — inlined from the Headline component, in its smallest size */
  .headline {
    padding-right: var(--cui-spacings-peta);
    margin: 0 0 var(--cui-spacings-bit);
    font-size: var(--cui-typography-headline-four-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-typography-headline-four-line-height);
    color: var(--cui-fg-normal);
    letter-spacing: -0.03em;
  }

  /* Body — inlined from the Body component, in the small size */
  .body {
    padding-right: var(--cui-spacings-peta);
    margin: 0;
    font-size: var(--cui-typography-body-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-typography-body-s-line-height);
    color: var(--cui-fg-normal);
  }

  /* Action — inlined from the Button component, a secondary button in the
     small size */
  .action {
    display: inline-flex;
    gap: var(--cui-spacings-bit);
    align-items: center;
    justify-content: center;
    width: auto;
    height: max-content;
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    margin-top: var(--cui-spacings-kilo);
    font-size: var(--cui-typography-body-s-font-size);
    font-weight: var(--cui-font-weight-semibold);
    line-height: var(--cui-typography-body-s-line-height);
    color: var(--cui-fg-normal);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: var(--cui-border-width-kilo) solid var(--cui-border-normal);
    border-radius: var(--cui-border-radius-byte);
    transition:
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);
  }

  .action:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-subtle-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  .action:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-subtle-pressed);
    border-color: var(--cui-border-normal-pressed);
  }

  .action :global(svg) {
    flex-shrink: 0;
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
  }

  /* Close button — inlined from the CloseButton component, a tertiary icon
     button */
  .close {
    position: absolute;
    top: var(--cui-spacings-byte);
    right: var(--cui-spacings-byte);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--cui-spacings-bit);
    margin: 0;
    color: var(--cui-fg-accent);
    cursor: pointer;
    background-color: transparent;
    border: var(--cui-border-width-kilo) solid transparent;
    border-radius: var(--cui-border-radius-byte);
    transition: color var(--cui-transitions-default);
  }

  .close:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .close:active {
    color: var(--cui-fg-accent-pressed);
  }

  .close:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-elevated),
      0 0 0 4px var(--cui-border-focus);
  }

  .close:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .close-icon {
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
  }

  .hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: rect(0 0 0 0);
  }

  /* Arrow — a square rotated into a triangle, with two of its borders showing
     to continue the border of the toggletip */
  .arrow {
    position: absolute;
    width: var(--toggletip-arrow-size);
    height: var(--toggletip-arrow-size);
    background-color: var(--cui-bg-elevated);
    border-right: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-bottom: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-bottom-right-radius: 2px;
  }

  .base[data-side='top'] .arrow {
    top: calc(100% - (var(--toggletip-arrow-size) / 2));
    left: calc(50% - (var(--toggletip-arrow-size) / 2));
    transform: rotate(45deg);
  }

  .base[data-side='right'] .arrow {
    right: calc(100% - (var(--toggletip-arrow-size) / 2));
    bottom: calc(50% - (var(--toggletip-arrow-size) / 2));
    transform: rotate(135deg);
  }

  .base[data-side='bottom'] .arrow {
    bottom: calc(100% - (var(--toggletip-arrow-size) / 2));
    left: calc(50% - (var(--toggletip-arrow-size) / 2));
    transform: rotate(225deg);
  }

  .base[data-side='left'] .arrow {
    bottom: calc(50% - (var(--toggletip-arrow-size) / 2));
    left: calc(100% - (var(--toggletip-arrow-size) / 2));
    transform: rotate(315deg);
  }

  /* On an edge-aligned placement the trigger sits near one end of the
     toggletip rather than in the middle, so the arrow follows it. */
  .base[data-side='top'][data-alignment='start'] .arrow,
  .base[data-side='bottom'][data-alignment='start'] .arrow {
    left: var(--toggletip-arrow-inset);
  }

  .base[data-side='top'][data-alignment='end'] .arrow,
  .base[data-side='bottom'][data-alignment='end'] .arrow {
    left: auto;
    right: var(--toggletip-arrow-inset);
  }

  .base[data-side='left'][data-alignment='start'] .arrow,
  .base[data-side='right'][data-alignment='start'] .arrow {
    top: var(--toggletip-arrow-inset);
    bottom: auto;
  }

  .base[data-side='left'][data-alignment='end'] .arrow,
  .base[data-side='right'][data-alignment='end'] .arrow {
    top: auto;
    bottom: var(--toggletip-arrow-inset);
  }

  /* Animations, driven entirely by the toggletip's own open state */
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

  /* On narrow screens the toggletip covers the full width at the bottom of the
     viewport instead of hugging its trigger. */
  @media (max-width: 479px) {
    .base {
      position-area: none;
      inset: auto 0 0;
      width: auto;
      max-width: 100%;
      margin: 0;
      transform: translateY(100%);
    }

    .base:popover-open {
      transform: translateY(0);
    }

    @starting-style {
      .base:popover-open {
        transform: translateY(100%);
      }
    }

    .base::backdrop {
      background-color: var(--cui-bg-overlay);
    }

    .content {
      padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-mega));
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    .arrow {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition-duration: 0s;
      transform: none;
    }
  }
</style>
