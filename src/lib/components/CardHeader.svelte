<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    showCloseButton?: boolean;

    closeButtonLabel?: string;

    onClickCloseButton?: () => void;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    showCloseButton = false,
    closeButtonLabel = 'Close',
    onClickCloseButton = () => {},
    children,
    ...rest
  }: Props = $props();
</script>

<div class="base" {...rest}>
  {@render children?.()}
  {#if showCloseButton}
    <div class="close">
      {@render closeButton()}
    </div>
  {/if}
</div>

{#snippet closeButton()}
  <button
    class="button button-focus-visible"
    class:button-tertiary={true}
    class:button-m={true}
    class:button-hide-label-m={true}
    onclick={onClickCloseButton}
  >
    <span class="button-content">
      {@render closeIcon()}
      <span class="button-label" class:hide-label={true}>
        {closeButtonLabel}
      </span>
    </span>
  </button>
{/snippet}

{#snippet closeIcon()}
  <svg
    width={24}
    height={24}
    viewBox="0 0 {24} {24}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.71 19.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29L12 13.42l-7.29 7.29c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71L10.58 12 3.29 4.71A1.014 1.014 0 0 1 3 4a1 1 0 0 1 1-1c.266 0 .52.104.71.29L12 10.58l7.29-7.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L13.42 12l7.29 7.29z"
      fill="currentColor"
    />
  </svg>
{/snippet}

<style>
  .base {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--cui-spacings-giga);
  }
  .base .close {
    margin-top: calc(-1 * var(--cui-spacings-byte));
    margin-right: calc(-1 * var(--cui-spacings-mega));
    margin-bottom: calc(-1 * var(--cui-spacings-byte));
    padding-right: calc(-1 * var(--cui-spacings-mega));
  }

  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: max-content;
    margin: 0;
    font-size: var(--cui-typography-body-s-font-size);
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

  /* Content */
  .button-content {
    display: flex;
    gap: var(--content-gap);
    place-content: center;
    align-items: center;
    min-width: 24px;
    min-height: 24px;
    opacity: 1;
    transition: opacity var(--cui-transitions-default);
  }

  .button:active .button-content {
    transform: translate(0, 1px);
  }

  .button-m {
    --content-gap: var(--cui-spacings-byte);
    --leading-icon-size: var(--cui-icon-sizes-mega);
    --loader-diameter: 6px;
    --loader-gap: 5px;
    --loader-transform: scale(133%);

    font-size: var(--cui-typography-body-s-font-size);
    line-height: var(--cui-typography-body-s-line-height);
    border-radius: var(--cui-border-radius-kilo);

    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-giga) - var(--cui-border-width-kilo));
  }

  .button-tertiary {
    color: var(--cui-fg-accent);
    background-color: transparent;
    border-color: transparent;
  }

  .button-tertiary:hover {
    color: var(--cui-fg-accent-hovered);
    background-color: var(--cui-bg-accent-hovered);
    border-color: transparent;
  }

  .button-tertiary:active {
    color: var(--cui-fg-accent-pressed);
    background-color: transparent;
    border-color: transparent;
  }

  .button-hide-label-m {
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
</style>
