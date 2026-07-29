<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Callback for the close button. Without it, the button isn't shown.
     */
    onClose?: (event: MouseEvent) => void;
    /**
     * Text label for the close button, for screen readers. Required to show
     * the button.
     */
    closeButtonLabel?: string;
    /**
     * The headline of the card.
     */
    children?: Snippet;
    [key: string]: unknown;
  }

  let { onClose, closeButtonLabel, children, ...rest }: Props = $props();

  const showsCloseButton = $derived(Boolean(onClose && closeButtonLabel));
</script>

<div class="base" class:no-headline={!children} {...rest}>
  {@render children?.()}
  {#if showsCloseButton}
    <button
      type="button"
      class="close focus-visible"
      title={closeButtonLabel}
      aria-label={closeButtonLabel}
      onclick={onClose}
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
  .base {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--cui-spacings-giga);
  }

  .no-headline {
    justify-content: flex-end;
  }

  /* The close button is a tertiary icon button, inlined from CloseButton, and
     pulled into the card's padding so that its icon lines up with the edge. */
  .close {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    margin-top: calc(-1 * var(--cui-spacings-byte));
    margin-right: calc(-1 * var(--cui-spacings-mega));
    margin-bottom: calc(-1 * var(--cui-spacings-byte));
    color: var(--cui-fg-accent);
    cursor: pointer;
    background-color: transparent;
    border: var(--cui-border-width-kilo) solid transparent;
    border-radius: var(--cui-border-radius-kilo);
    transition:
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
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
</style>
