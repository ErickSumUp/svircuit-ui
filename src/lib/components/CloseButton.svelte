<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    /**
     * Communicates the action that will be performed. Displayed on hover and
     * read by screen readers. Default: `Close`.
     */
    label?: string;
    /**
     * Choose from 3 style variants. Default: `tertiary`.
     */
    variant?: 'primary' | 'secondary' | 'tertiary';
    /**
     * Choose from 2 sizes. Default: `m`.
     */
    size?: 's' | 'm';
    /**
     * Visually and functionally disable the button.
     */
    disabled?: boolean;
    /**
     * Change the color from accent to danger to signal to the user that the
     * action is irreversible or otherwise dangerous.
     */
    destructive?: boolean;
    [key: string]: unknown;
  }

  let {
    label = 'Close',
    variant = 'tertiary',
    size = 'm',
    disabled = false,
    destructive = false,
    ...rest
  }: Props = $props();
</script>

<button
  type="button"
  class="base focus-visible"
  class:primary={variant === 'primary'}
  class:secondary={variant === 'secondary'}
  class:tertiary={variant === 'tertiary'}
  class:s={size === 's'}
  class:m={size === 'm'}
  class:destructive
  title={label}
  aria-label={label}
  {disabled}
  {...rest}
>
  {#if size === 's'}
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11.528 3.528a.667.667 0 0 1 .944.944L8.943 8l3.529 3.528a.667.667 0 0 1-.944.944L8 8.943l-3.528 3.529a.667.667 0 0 1-.944-.944L7.057 8 3.528 4.472a.667.667 0 0 1 .944-.944L8 7.057z"
      />
    </svg>
  {:else}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.293 5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586z"
      />
    </svg>
  {/if}
</button>

<style>
  /* Inlined from the Button component — a CloseButton is an icon-only button
     with a fixed icon, so it is square rather than padded for a label. */
  .base {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    margin: 0;
    cursor: pointer;
    border-style: solid;
    border-width: var(--cui-border-width-kilo);
    transition:
      opacity var(--cui-transitions-default),
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);
  }

  .base:active {
    transform: translate(0, 1px);
  }

  /* Sizes */
  .s {
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
    border-radius: var(--cui-border-radius-byte);
  }

  .m {
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    border-radius: var(--cui-border-radius-kilo);
  }

  /* Variants */
  .primary {
    color: var(--cui-fg-on-strong);
    background-color: var(--cui-bg-strong);
    border-color: transparent;
  }

  .primary:hover {
    color: var(--cui-fg-on-strong-hovered);
    background-color: var(--cui-bg-strong-hovered);
  }

  .primary:active {
    color: var(--cui-fg-on-strong-pressed);
    background-color: var(--cui-bg-strong-pressed);
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

  .primary:disabled {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-accent-strong-disabled);
  }

  .secondary {
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal);
  }

  .secondary:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-subtle-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  .secondary:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-subtle-pressed);
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

  .secondary:disabled {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal-disabled);
  }

  .tertiary {
    color: var(--cui-fg-accent);
    background-color: transparent;
    border-color: transparent;
  }

  .tertiary:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .tertiary:active {
    color: var(--cui-fg-accent-pressed);
  }

  .tertiary.destructive {
    color: var(--cui-fg-danger);
  }

  .tertiary.destructive:hover {
    color: var(--cui-fg-danger-hovered);
  }

  .tertiary:disabled {
    color: var(--cui-fg-normal-disabled);
  }

  .base:disabled {
    cursor: not-allowed;
    transform: translate(0);
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
</style>
