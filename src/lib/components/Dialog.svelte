<script lang="ts">
  import type { HTMLDialogAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLDialogAttributes {
    dialog: HTMLDialogElement;
    children: Snippet;
  }

  let { dialog = $bindable(), children, ...rest }: Props = $props();
</script>

<dialog class="base" bind:this={dialog} {...rest}>
  <div class="content">
    {@render children()}
    {@render closeButton()}
  </div>
</dialog>

{#snippet crossSVG()}
  <svg
    class="close-button-leading-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.71 19.29c.186.19.29.445.29.71a1 1 0 0 1-1 1c-.265 0-.52-.104-.71-.29L12 13.42l-7.29 7.29c-.19.186-.444.29-.71.29a1 1 0 0 1-1-1c0-.265.104-.52.29-.71L10.58 12 3.29 4.71A1.014 1.014 0 0 1 3 4a1 1 0 0 1 1-1c.266 0 .52.104.71.29L12 10.58l7.29-7.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71L13.42 12l7.29 7.29z"
      fill="currentColor"
    />
  </svg>
{/snippet}

{#snippet closeButton()}
  <button class="close-button" onclick={() => dialog.close()}>
    <span class="close-button-content">
      {@render crossSVG()}
      <span class="close-button-label">Close</span>
    </span>
  </button>
{/snippet}

<style>
  dialog {
    padding: 0;
    border: none;
    border-radius: var(--cui-border-radius-mega);
  }

  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  dialog::backdrop {
    background: var(--cui-bg-overlay);
  }

  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .content {
    overflow-y: auto;
  }

  @media (max-width: 479px) {
    .content {
      width: 100vw;
      padding: var(--cui-spacings-mega);
      padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-mega));
      -webkit-overflow-scrolling: touch;
    }
  }

  @media (min-width: 480px) {
    .content {
      min-width: 480px;
      max-width: 90vw;
      max-height: 90vh;
      padding: var(--cui-spacings-giga);
      padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-giga));
    }
  }

  .close-button {
    position: absolute;
    top: var(--cui-spacings-byte);
    right: var(--cui-spacings-byte);
    z-index: var(--cui-z-index-absolute);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: max-content;
    margin: 0;
    font-weight: var(--cui-font-weight-bold);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition:
      opacity var(--cui-transitions-default),
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);

    --content-gap: var(--cui-spacings-byte);
    --leading-icon-size: var(--cui-icon-sizes-mega);
    --loader-diameter: 6px;
    --loader-gap: 5px;
    --loader-transform: scale(133%);

    font-size: var(--cui-typography-body-s-font-size);
    line-height: var(--cui-typography-body-s-line-height);
    border-radius: var(--cui-border-radius-kilo);

    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal);

    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));

    border: none;
  }

  .close-button-content {
    display: flex;
    gap: var(--content-gap);
    place-content: center;
    align-items: center;
    min-width: 24px;
    min-height: 24px;
    opacity: 1;
    transition: opacity var(--cui-transitions-default);
  }

  .close-button:active .close-button-content {
    transform: translate(0, 1px);
  }

  .close-button-label {
    text-overflow: ellipsis;
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

  .close-button-leading-icon {
    width: var(--leading-icon-size);
    height: var(--leading-icon-size);
  }

  .close-button:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  .close-button:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
    border-color: var(--cui-border-normal-pressed);
  }

  .close-button:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .close-button:focus::-moz-focus-inner {
    border: 0;
  }

  .close-button:focus:not(:focus-visible) {
    box-shadow: none;
  }
</style>
