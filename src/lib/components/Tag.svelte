<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /**
     * Render prop that should render a leading-aligned icon or element.
     */
    prefix?: Snippet;
    /**
     * Render prop that should render a trailing-aligned icon or element.
     */
    suffix?: Snippet;
    /**
     * Triggers selected styles on the tag.
     */
    selected?: boolean;
    /**
     * Function that's called when the button is clicked.
     */
    onclick?: (event: MouseEvent) => void;
    /**
     * Renders a close button inside the tag and calls the provided function
     * when the button is clicked.
     */
    onclickRemove?: (event: MouseEvent) => void;
    /**
     * Text label for the remove icon for screen readers.
     * Important for accessibility.
     */
    removeButtonLabel?: string;
    children: Snippet;

    [key: string]: unknown;
  }

  let {
    prefix,
    suffix,
    selected = false,
    onclick,
    onclickRemove,
    removeButtonLabel = '',
    children,
    href,
    ...rest
  }: Props = $props();

  let element: 'div' | 'a' | 'button' = $state('div');

  if (href) {
    element = 'a';
  } else if (onclick) {
    element = 'button';
  }

  const isRemovable = $derived(onclickRemove && removeButtonLabel);
  const isButton = $derived(onclick && !href);
</script>

<div class="base {selected ? 'selected' : ''} {isRemovable ? 'removable' : ''}">
  <svelte:element
    this={element}
    class="content"
    class:focus-visible={!onclick}
    type={isButton ? 'button' : undefined}
    aria-pressed={isButton && selected ? 'true' : undefined}
    onclick={onclick ? onclick : undefined}
    role={isButton ? 'button' : undefined}
    {...rest}
  >
    {#if prefix}
      <span class="prefix" aria-hidden="true">
        {@render prefix?.()}
      </span>
    {/if}

    {@render children?.()}

    {#if suffix}
      <span class="suffix" aria-hidden="true">
        {@render suffix?.()}
      </span>
    {/if}
  </svelte:element>

  {#if isRemovable}
    <button
      onclick={onclickRemove}
      class="remove-button remove-button-base remove-button-s remove-button-focus-visible remove-button-{selected
        ? 'primary'
        : 'secondary'}"
      class:remove-button-primary={selected}
      class:remove-button-secondary={!selected}
    >
      <span class="remove-button-content">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="remove-button-leading-icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
            fill="currentColor"
          />
        </svg>
        <span class="remove-button-label">{removeButtonLabel}</span>
      </span>
    </button>
  {/if}
</div>

<style>
  .base {
    --tag-border-width: var(--cui-border-width-kilo);

    position: relative;
    display: inline-block;
  }

  .content {
    display: inline-flex;
    align-items: center;
    padding: var(--cui-spacings-bit) var(--cui-spacings-kilo);
    margin: 0;
    font-size: var(--cui-body-m-font-size);
    line-height: var(--cui-body-m-line-height);
    color: var(--cui-fg-normal);
    overflow-wrap: break-word;
    cursor: default;
    background-color: var(--cui-bg-normal);
    border: var(--tag-border-width) solid var(--cui-border-normal);
    border-radius: var(--cui-border-radius-byte);
    transition:
      opacity var(--cui-transitions-default),
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);
  }

  .removable .content {
    padding-right: calc(var(--cui-spacings-bit) + var(--cui-spacings-tera));
  }

  .selected .content {
    color: var(--cui-fg-on-strong);
    background-color: var(--cui-bg-accent-strong);
    border-color: var(--cui-border-accent);
  }

  /* Interactive */

  a.content,
  button.content {
    text-align: left;
    cursor: pointer;
    outline: 0;
  }

  a.content:hover,
  button.content:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  a.content:active,
  button.content:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
    border-color: var(--cui-border-normal-pressed);
  }

  .selected a.content:hover,
  .selected button.content:hover {
    color: var(--cui-fg-on-strong-hovered);
    background-color: var(--cui-bg-accent-strong-hovered);
    border-color: var(--cui-border-accent-hovered);
  }

  .selected a.content:active,
  .selected button.content:active {
    color: var(--cui-fg-on-strong-pressed);
    background-color: var(--cui-bg-accent-strong-pressed);
    border-color: var(--cui-border-accent-pressed);
  }

  .prefix {
    flex-shrink: 0;
    margin-right: var(--cui-spacings-bit);
    margin-left: calc(-1 * var(--cui-spacings-bit));
  }

  .suffix {
    flex-shrink: 0;
    margin-right: calc(-1 * var(--cui-spacings-bit));
    margin-left: var(--cui-spacings-bit);
  }

  .base .remove-button {
    position: absolute;
    top: 50%;
    right: var(--tag-border-width);
    border: 0;
    border-radius: var(--cui-border-radius-byte);
    transform: translateY(-50%);
  }

  /* Remove button */

  .remove-button-base {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    margin: 0;
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-semibold);
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

  .remove-button-content {
    display: flex;
    gap: var(--content-gap);
    place-content: center;
    align-items: center;
    min-width: 24px;
    min-height: 24px;
    opacity: 1;
    transition: opacity var(--cui-transitions-default);
  }

  .remove-button-base:active .remove-button-content {
    transform: translate(0, 1px);
  }

  .remove-button-leading-icon {
    width: var(--leading-icon-size);
    height: var(--leading-icon-size);
  }

  /* Sizes */
  .remove-button-s {
    --content-gap: var(--cui-spacings-bit);
    --leading-icon-size: var(--cui-icon-sizes-kilo);

    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    border-radius: var(--cui-border-radius-byte);
  }

  /* Variants */
  .remove-button-primary {
    color: var(--cui-fg-on-strong);
    background-color: var(--cui-bg-accent-strong);
    border-color: transparent;
  }

  .remove-button-primary:hover {
    color: var(--cui-fg-on-strong-hovered);
    background-color: var(--cui-bg-accent-strong-hovered);
    border-color: transparent;
  }

  .remove-button-primary:active {
    color: var(--cui-fg-on-strong-pressed);
    background-color: var(--cui-bg-accent-strong-pressed);
    border-color: transparent;
  }

  .remove-button-primary:disabled {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-highlight-disabled);
    border-color: transparent;
  }

  .remove-button-secondary {
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal);
  }

  .remove-button-secondary:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-subtle-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  .remove-button-secondary:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-subtle-pressed);
    border-color: var(--cui-border-normal-pressed);
  }

  .remove-button-secondary:disabled {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal-disabled);
  }

  /* Disabled */
  .remove-button-base:disabled {
    cursor: not-allowed;
  }

  .remove-button-base:disabled .remove-button-content {
    transform: translate(0);
  }

  .remove-button-focus-visible:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .remove-button-focus-visible:focus::-moz-focus-inner {
    border: 0;
  }

  .remove-button-focus-visible:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .remove-button-base > span:last-child > span:last-child {
    /* .hide-visually */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip: rect(0 0 0 0);
  }

  .remove-button-s {
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
  }

  .remove-button-s {
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
  }
</style>
