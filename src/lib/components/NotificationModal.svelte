<script lang="ts">
  import type { HTMLDialogAttributes } from 'svelte/elements';

  type Action = {
    label: string;
    onclick?: (event: MouseEvent) => void;
    destructive?: boolean;
  };

  interface Props extends Omit<HTMLDialogAttributes, 'open'> {
    /**
     * Whether the modal is open. Bindable: closing the modal sets it to `false`.
     */
    open?: boolean;
    /**
     * The notification's headline, rendered as an `h2` that labels the modal.
     */
    headline: string;
    /**
     * Optional body copy for the notification's details.
     */
    body?: string;
    /**
     * An optional image above the headline. Pass an empty `alt` if the image is
     * decorative.
     */
    image?: { src: string; alt: string };
    /**
     * The primary and an optional secondary action. Clicking either closes the
     * modal, then calls its `onclick`.
     */
    actions: { primary: Action; secondary?: Action };
    /**
     * Called after the modal has closed, however it was closed.
     */
    onClose?: () => void;
    /**
     * The close button's accessible name. Default: `Close`.
     */
    closeButtonLabel?: string;
    /**
     * Hides the close button and stops Escape and backdrop clicks from closing
     * the modal, so only the actions can. Default: `false`.
     */
    preventClose?: boolean;
  }

  let {
    open = $bindable(false),
    headline,
    body,
    image,
    actions,
    onClose,
    closeButtonLabel = 'Close',
    preventClose = false,
    ...rest
  }: Props = $props();

  const headlineId = $props.id();
  let dialog: HTMLDialogElement;

  $effect(() => {
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  });

  function handleClose() {
    open = false;
    onClose?.();
  }

  function handleCancel(event: Event) {
    if (preventClose) event.preventDefault();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === dialog && !preventClose) open = false;
  }

  function act(action: Action) {
    return (event: MouseEvent) => {
      open = false;
      action.onclick?.(event);
    };
  }
</script>

<!--
  @component
  A modal that communicates critical information while blocking the rest of
  the page, and needs the user's attention or action to proceed.
-->
<dialog
  {...rest}
  bind:this={dialog}
  class="base"
  aria-labelledby={headlineId}
  onclose={handleClose}
  oncancel={handleCancel}
  onclick={handleBackdropClick}
>
  <div class="content">
    {#if image}<img class="image" src={image.src} alt={image.alt} />{/if}
    <h2 id={headlineId} class={['headline', image && 'below-image']}>{headline}</h2>
    {#if body}<p class="body">{body}</p>{/if}

    <div class="buttons">
      <div class="button-group">
        <button
          type="button"
          class={['button', 'primary', actions.primary.destructive && 'destructive']}
          onclick={act(actions.primary)}>{actions.primary.label}</button
        >
        {#if actions.secondary}
          <!-- svelte-ignore a11y_autofocus -->
          <button
            type="button"
            class={['button', 'secondary', actions.secondary.destructive && 'destructive']}
            autofocus
            onclick={act(actions.secondary)}>{actions.secondary.label}</button
          >
        {/if}
      </div>
    </div>
  </div>

  {#if !preventClose}
    <button
      type="button"
      class="close"
      title={closeButtonLabel}
      aria-label={closeButtonLabel}
      onclick={() => (open = false)}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.293 5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 1 1 1.414-1.414L12 10.586z"
        />
      </svg>
    </button>
  {/if}
</dialog>

<style>
  /* Locks the page scroll while the modal is open. */
  :global(html):has(.base[open]) {
    overflow: hidden;
  }

  .base {
    --cui-bg-normal: var(--cui-bg-elevated);

    width: calc(100vw - var(--cui-spacings-peta) * 2);
    max-width: 420px;
    max-height: 90vh;
    max-height: 90dvh;
    padding: 0;
    margin: auto;
    color: var(--cui-fg-normal);
    text-align: center;
    background-color: var(--cui-bg-elevated);
    border: none;
    border-radius: var(--cui-border-radius-mega);
    /* A box shadow as the backdrop, so it fades together with the modal. */
    box-shadow: 0 0 0 100vmax var(--cui-bg-overlay);
    opacity: 0;
    transition:
      opacity 300ms,
      transform 300ms,
      overlay 300ms allow-discrete,
      display 300ms allow-discrete;
  }

  .base[open] {
    opacity: 1;
  }

  @starting-style {
    .base[open] {
      opacity: 0;
    }
  }

  .base::backdrop {
    background: transparent;
  }

  .base:focus {
    outline: none;
  }

  /* Fades out content that scrolls under the bottom padding. */
  .base::after {
    position: absolute;
    right: 0;
    bottom: env(safe-area-inset-bottom);
    left: 0;
    display: block;
    height: var(--cui-spacings-giga);
    pointer-events: none;
    content: '';
    background: linear-gradient(
      color-mix(in srgb, var(--cui-bg-elevated) 0%, transparent),
      color-mix(in srgb, var(--cui-bg-elevated) 66%, transparent),
      color-mix(in srgb, var(--cui-bg-elevated) 100%, transparent)
    );
    border-radius: inherit;
  }

  .content {
    max-height: 90vh;
    max-height: 90dvh;
    padding: var(--cui-spacings-giga);
    padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-giga));
    overflow-y: auto;
  }

  @media (max-width: 479px) {
    .base {
      opacity: 1;
      transform: translateY(100%);
    }

    .base[open] {
      transform: none;
    }

    @starting-style {
      .base[open] {
        transform: translateY(100%);
      }
    }

    .base::after {
      height: var(--cui-spacings-mega);
    }

    .content {
      padding: var(--cui-spacings-mega);
      padding-bottom: calc(env(safe-area-inset-bottom) + var(--cui-spacings-mega));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition: none;
    }
  }

  /* Image — inlined from the Image component */
  .image {
    display: block;
    width: 100%;
    max-width: 232px;
    height: 120px;
    margin: 0 auto var(--cui-spacings-giga);
    object-fit: contain;
  }

  /* Typography — inlined from the Headline (size `s`) and Body components */
  .headline,
  .body {
    margin: 0;
    color: var(--cui-fg-normal);
    letter-spacing: var(--cui-letter-spacing);
  }

  /* Keeps the headline clear of the close button. */
  .headline {
    max-width: 80%;
    margin: 0 auto var(--cui-spacings-byte);
    font-family: var(--cui-font-stack-default);
    font-size: var(--cui-headline-s-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-headline-s-line-height);
  }

  .headline.below-image {
    max-width: 100%;
  }

  .body {
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-m-line-height);
  }

  /* Actions — inlined from the ButtonGroup and Button (size `m`) components */
  .buttons {
    width: 100%;
    margin-top: var(--cui-spacings-giga);
    container: notification-modal-buttons / inline-size;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: var(--cui-spacings-kilo);
    align-items: center;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: calc(24px + var(--cui-spacings-kilo) * 2);
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-giga) - var(--cui-border-width-kilo));
    margin: 0;
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-semibold);
    line-height: var(--cui-body-m-line-height);
    cursor: pointer;
    border: var(--cui-border-width-kilo) solid;
    border-radius: var(--cui-border-radius-kilo);
    transition:
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);
  }

  .button:active {
    transform: translate(0, 1px);
  }

  .button:focus-visible {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  @container notification-modal-buttons (width > 370px) {
    .button-group {
      flex-direction: row-reverse;
      gap: var(--cui-spacings-mega);
      justify-content: center;
    }
  }

  @container notification-modal-buttons (width < 360px) {
    .button {
      width: 100%;
    }
  }

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

  .secondary.destructive:active {
    color: var(--cui-fg-danger-pressed);
    background-color: var(--cui-bg-danger-pressed);
    border-color: var(--cui-border-danger-pressed);
  }

  /* Close button — inlined from the CloseButton component, tertiary, size `m` */
  .close {
    position: absolute;
    top: var(--cui-spacings-byte);
    right: var(--cui-spacings-byte);
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    min-width: 24px;
    min-height: 24px;
    padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    color: var(--cui-fg-accent);
    cursor: pointer;
    background-color: transparent;
    border: var(--cui-border-width-kilo) solid transparent;
    border-radius: var(--cui-border-radius-kilo);
    transition: color var(--cui-transitions-default);
  }

  @media (max-width: 479px) {
    .close {
      top: var(--cui-spacings-bit);
      right: var(--cui-spacings-bit);
    }
  }

  .close:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .close:active {
    color: var(--cui-fg-accent-pressed);
    transform: translate(0, 1px);
  }

  .close:focus-visible {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }
</style>
