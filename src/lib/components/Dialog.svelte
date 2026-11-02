<script lang="ts">
  import type { HTMLDialogAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLDialogAttributes {
    /**
     * The native `dialog` element. Bind it to open the dialog with
     * `dialog.showModal()` and close it with `dialog.close()`.
     */
    dialog?: HTMLDialogElement;
    /**
     * Use the `immersive` variant to focus the user's attention on the content:
     * on small viewports it covers the whole screen. Default: `contextual`.
     */
    variant?: 'contextual' | 'immersive';
    /**
     * Hides the close button and stops Escape and backdrop clicks from closing
     * the dialog, so only its content can. Default: `false`.
     */
    preventClose?: boolean;
    /**
     * The close button's accessible name. Default: `Close`.
     */
    closeButtonLabel?: string;
    children: Snippet;
  }

  let {
    dialog = $bindable(),
    variant = 'contextual',
    preventClose = false,
    closeButtonLabel = 'Close',
    children,
    oncancel,
    onclick,
    ...rest
  }: Props = $props();

  function handleCancel(event: Event & { currentTarget: EventTarget & HTMLDialogElement }) {
    if (preventClose) event.preventDefault();
    oncancel?.(event);
  }

  /* Fallback for browsers without `closedby`. A click on the backdrop targets
     the dialog itself, because the content fills it. */
  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDialogElement }) {
    if (event.target === dialog && !preventClose) dialog.close();
    onclick?.(event);
  }
</script>

<!--
  @component
  A modal dialog for self-contained tasks, which the user has to complete or
  dismiss before returning to the page.

  This is our port of circuit's `Modal`, built directly on the native `dialog`
  element. We don't port circuit's `Modal` as a separate component: circuit's
  version wraps `dialog` in React state and re-implements in JavaScript what the
  browser already provides (opening, Escape, outside clicks, focus trapping and
  restoring, closing animations). Here the native element is the API: open it
  with `dialog.showModal()`, close it with `dialog.close()` or a
  `<form method="dialog">`, and listen to its `close` event. Every other
  attribute is passed on to the `dialog`. Only circuit's styles, its `variant`
  and `preventClose` are added on top.
-->
<dialog
  {...rest}
  bind:this={dialog}
  class={['base', variant, rest.class]}
  closedby={preventClose ? 'none' : 'any'}
  oncancel={handleCancel}
  onclick={handleClick}
>
  <div class="content">
    {@render children()}
  </div>

  {#if !preventClose}
    <button
      type="button"
      class="close"
      title={closeButtonLabel}
      aria-label={closeButtonLabel}
      onclick={() => dialog?.close()}
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
  /* Locks the page scroll while the dialog is open as a modal. */
  :global(html):has(.base:modal) {
    overflow: hidden;
  }

  .base {
    --cui-bg-normal: var(--cui-bg-elevated);

    position: fixed;
    max-height: 90vh;
    max-height: 90dvh;
    padding: 0;
    margin: auto;
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-elevated);
    border: none;
    /* A box shadow as the backdrop, so it fades together with the dialog. */
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

  @media (min-width: 480px) {
    .base {
      inset: 0;
      min-width: 480px;
      max-width: 50vw;
      border-radius: var(--cui-border-radius-mega);
    }
  }

  /* A bottom sheet that slides up */
  @media (max-width: 479px) {
    .base {
      inset: auto 0 0;
      width: 100%;
      max-width: 100%;
      margin: 0;
      border-radius: var(--cui-border-radius-mega) var(--cui-border-radius-mega) 0 0;
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

    .immersive {
      height: 100%;
      max-height: none;
      border-radius: 0;
    }

    .immersive .content {
      max-height: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition: none;
    }
  }

  /* Close button — inlined from the CloseButton component, tertiary, size `m` */
  .close {
    position: absolute;
    top: var(--cui-spacings-byte);
    right: var(--cui-spacings-byte);
    z-index: calc(var(--cui-z-index-input) + 1);
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
