<script lang="ts">
  /**
   * Choose from 3 style variants.
   * @type {('primary' | 'secondary' | 'tertiary')}
   */
  export let variant: 'primary' | 'secondary' | 'tertiary' = 'secondary';
  /**
   * Choose from 2 sizes.
   * @type {('s' | 'm')}
   */
  export let size: 's' | 'm' = 'm';
  /**
   * Change the color from accent to danger to signal to the user that the action
   * is irreversible or otherwise dangerous.
   * @type {boolean}
   */
  export let destructive: boolean = false;
  /**
   * Stretch the button across the full width of its parent.
   * @type {boolean}
   */
  export let stretch: boolean = false;
  /**
   * Visually and functionally disable the button.
   * @type {boolean}
   */
  export let disabled: boolean = false;
  /**
   * Visually disables the button and shows a loading spinner.
   * @type {boolean}
   */
  export let isLoading: boolean = false;
  /**
   * Visually hidden label to communicate the loading state to visually
   * impaired users.
   * @type {string}
   */
  export let loadingLabel: string = 'Loading';
  /**
   * Hide the label text.
   * @type {boolean}
   */
  export let hideLabel: boolean = false;
  /**
   * Reduce the padding and margin of the button.
   * @type {boolean}
   */
  export let compress: boolean = false;
</script>

<button
  class="base focus-visible"
  class:primary={variant === 'primary'}
  class:secondary={variant === 'secondary'}
  class:tertiary={variant === 'tertiary'}
  class:m={size === 'm'}
  class:s={size === 's'}
  class:hide-label-m={hideLabel && size === 'm'}
  class:hide-label-s={hideLabel && size === 's'}
  class:destructive
  class:stretch
  class:compress
  disabled={disabled || isLoading}
  aria-disabled={disabled}
  aria-busy={isLoading}
  aria-live={isLoading ? 'polite' : null}
  on:click
  {...$$restProps}
>
  {#if isLoading}
    <span class="loader" aria-hidden={!isLoading}>
      <span class="dot" />
      <span class="dot" />
      <span class="dot" />
      <span class="hide-visually">{loadingLabel}</span>
    </span>
  {/if}
  <span class="content">
    <slot name="leading-icon" class="leading-icon" />
    <span class="label" class:hide-label={hideLabel}>
      <slot />
    </span>
    <slot name="trailing-icon" class="trailing-icon" />
  </span>
</button>

<style>
  .base {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: max-content;
    margin: 0;
    font-size: var(--cui-typography-body-one-font-size);
    font-weight: var(--cui-font-weight-bold);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border-style: solid;
    border-width: var(--cui-border-width-kilo);
    transition:
      opacity var(--cui-transitions-default),
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);
  }

  .base[aria-busy='true'] {
    position: relative;
    overflow: hidden;
  }

  /* Loader */
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-auto-flow: column;
    gap: var(--loader-gap);
    place-content: center;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    transition:
      opacity var(--cui-transitions-default),
      visibility var(--cui-transitions-default);
  }

  /* The animation of the dots consists of five phases: an 80ms pause
		 and four 160ms transitions between each dot being highlighted */

  .dot {
    --loader-opacity: 0.25;

    display: block;
    width: var(--loader-diameter);
    height: var(--loader-diameter);
    background-color: var(--cui-fg-normal);
    border-radius: var(--cui-border-radius-circle);
    animation-duration: 720ms; /* 80ms + 4 * 160ms */
    animation-play-state: paused;
    animation-timing-function: cubic-bezier(0.75, 0, 1, 1);
    animation-iteration-count: infinite;
  }

  @keyframes pulse1 {
    0%,
    11%,
    55%,
    100% {
      opacity: var(--loader-opacity);
      transform: scale(100%);
    }

    33% {
      opacity: 1;
      transform: var(--loader-transform);
    }
  }

  .dot:nth-child(1) {
    animation-name: pulse1;
  }

  @keyframes pulse2 {
    0%,
    33%,
    77%,
    100% {
      opacity: var(--loader-opacity);
      transform: scale(100%);
    }

    55% {
      opacity: 1;
      transform: var(--loader-transform);
    }
  }

  .dot:nth-child(2) {
    animation-name: pulse2;
  }

  @keyframes pulse3 {
    0%,
    55%,
    100% {
      opacity: var(--loader-opacity);
      transform: scale(100%);
    }

    77% {
      opacity: 1;
      transform: var(--loader-transform);
    }
  }

  .dot:nth-child(3) {
    animation-name: pulse3;
  }

  .base[aria-busy='true'] .loader {
    visibility: inherit;
    opacity: 1;
  }

  .base[aria-busy='true'] .dot {
    animation-play-state: running;
  }

  /* Content */
  .content {
    display: flex;
    gap: var(--content-gap);
    place-content: center;
    align-items: center;
    min-width: 24px;
    min-height: 24px;
    opacity: 1;
    transition: opacity var(--cui-transitions-default);
  }

  .base:active .content {
    transform: translate(0, 1px);
  }

  .base[aria-busy='true'] .content {
    opacity: 0;
  }

  .label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .leading-icon {
    width: var(--leading-icon-size);
    height: var(--leading-icon-size);
  }

  .trailing-icon {
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
  }

  /* Sizes */
  .s {
    --content-gap: var(--cui-spacings-bit);
    --leading-icon-size: var(--cui-icon-sizes-kilo);
    --loader-diameter: 4px;
    --loader-gap: 3px;
    --loader-transform: scale(150%);

    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
    border-radius: 10px;

    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
  }

  .m {
    --content-gap: var(--cui-spacings-byte);
    --leading-icon-size: var(--cui-icon-sizes-mega);
    --loader-diameter: 6px;
    --loader-gap: 5px;
    --loader-transform: scale(133%);

    font-size: var(--cui-typography-body-one-font-size);
    line-height: var(--cui-typography-body-one-line-height);
    border-radius: var(--cui-border-radius-kilo);

    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-giga) - var(--cui-border-width-kilo));
  }

  /* Variants */
  .primary {
    color: var(--cui-fg-on-strong);
    background-color: var(--cui-bg-accent-strong);
    border-color: transparent;
  }

  .primary:hover {
    color: var(--cui-fg-on-strong-hovered);
    background-color: var(--cui-bg-accent-strong-hovered);
    border-color: transparent;
  }

  .primary:active {
    color: var(--cui-fg-on-strong-pressed);
    background-color: var(--cui-bg-accent-strong-pressed);
    border-color: transparent;
  }

  .primary.destructive {
    background-color: var(--cui-bg-danger-strong);
  }

  .primary.destructive:hover {
    background-color: var(--cui-bg-danger-strong-hovered);
  }

  .primary.destructive:active {
    background-color: var(--cui-bg-danger-strong-pressed);
  }

  .secondary {
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal);
  }

  .secondary:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  .secondary:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
    border-color: var(--cui-border-normal-pressed);
  }

  .secondary.destructive {
    color: var(--cui-fg-danger);
  }

  .secondary.destructive:hover {
    color: var(--cui-fg-danger-hovered);
    background-color: var(--cui-bg-danger-hovered);
    border-color: var(--cui-border-danger-hovered);
  }

  .secondary.destructive:active {
    color: var(--cui-fg-danger-pressed);
    background-color: var(--cui-bg-danger-pressed);
    border-color: var(--cui-border-danger-pressed);
  }

  .tertiary {
    color: var(--cui-fg-accent);
    background-color: transparent;
    border-color: transparent;
  }

  .tertiary:hover {
    color: var(--cui-fg-accent-hovered);
    background-color: var(--cui-bg-accent-hovered);
    border-color: transparent;
  }

  .tertiary:active {
    color: var(--cui-fg-accent-pressed);
    background-color: var(--cui-bg-accent-pressed);
    border-color: transparent;
  }

  .tertiary:focus-visible {
    background-color: var(--cui-bg-accent-hovered);
  }

  .tertiary.destructive {
    color: var(--cui-fg-danger);
  }

  .tertiary.destructive:hover {
    color: var(--cui-fg-danger-hovered);
    background-color: var(--cui-bg-danger-hovered);
  }

  .tertiary.destructive:active {
    color: var(--cui-fg-danger-pressed);
    background-color: var(--cui-bg-danger-pressed);
  }

  .tertiary.destructive:focus-visible {
    background-color: var(--cui-bg-danger-hovered);
  }

  .tertiary .label {
    position: relative;
  }

  .tertiary .label::after {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    content: '';
    border-top: var(--cui-border-width-kilo) dashed var(--cui-border-normal);
    opacity: 1;
    transition:
      transform var(--cui-transitions-default),
      opacity var(--cui-transitions-default);
  }

  .tertiary:focus-visible .label::after {
    opacity: 0;
    transform: translateY(2px);
  }

  .tertiary:hover .label::after,
  .tertiary:active .label::after,
  .tertiary[aria-busy='true'] .label::after,
  .tertiary:disabled .label::after,
  .tertiary[disabled] .label::after,
  .tertiary[aria-disabled='true'] .label::after {
    opacity: 0;
    transform: translateY(2px);
  }

  /* ButtonGroup */
  @container cui-button-group (width < 360px) {
    .base {
      width: 100%;
    }
  }

  @container cui-button-group (width > 370px) {
    /* Keep in sync with the .secondary class above */
    .tertiary {
      color: var(--cui-fg-normal);
      background-color: var(--cui-bg-normal);
      border-color: var(--cui-border-normal);
    }

    .tertiary:hover {
      color: var(--cui-fg-normal-hovered);
      background-color: var(--cui-bg-normal-hovered);
      border-color: var(--cui-border-normal-hovered);
    }

    .tertiary:active,
    .tertiary[aria-expanded='true'],
    .tertiary[aria-pressed='true'] {
      color: var(--cui-fg-normal-pressed);
      background-color: var(--cui-bg-normal-pressed);
      border-color: var(--cui-border-normal-pressed);
    }

    .tertiary.destructive {
      color: var(--cui-fg-danger);
    }

    .tertiary.destructive:hover {
      color: var(--cui-fg-danger-hovered);
      background-color: var(--cui-bg-danger-hovered);
      border-color: var(--cui-border-danger-hovered);
    }

    .tertiary.destructive:active,
    .tertiary.destructive[aria-expanded='true'],
    .tertiary.destructive[aria-pressed='true'] {
      color: var(--cui-fg-danger-pressed);
      background-color: var(--cui-bg-danger-pressed);
      border-color: var(--cui-border-danger-pressed);
    }

    .tertiary .label::after {
      display: none;
    }
  }

  /* Disabled */
  .base:disabled,
  .base[disabled],
  .base[aria-disabled='true'] {
    color: var(--cui-fg-normal-disabled);
    cursor: not-allowed;
    background-color: var(--cui-bg-highlight-disabled);
    border-color: transparent;
  }

  .base:disabled .content,
  .base[disabled] .content,
  .base[aria-disabled='true'] .content {
    transform: translate(0);
  }

  .stretch {
    width: 100%;
  }

  .focus-visible:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .focus-visible:focus::-moz-focus-inner {
    border: 0;
  }

  .focus-visible:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  .hide-label-s {
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
  }

  .hide-label-m {
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
  }

  .hide-label {
    /* .hide-visually */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  .compress {
    padding: var(--cui-spacings-bit);
    margin-right: var(--cui-spacings-bit);
  }
</style>
