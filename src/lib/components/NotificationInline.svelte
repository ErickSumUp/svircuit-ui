<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The notification's variant. Default: `info`.
     */
    variant?: 'info' | 'success' | 'warning' | 'danger';
    /**
     * An optional headline above the body copy.
     */
    headline?: string;
    /**
     * The heading level of the headline. Pick it to fit the page's heading
     * structure. Default: `h3`.
     */
    headlineAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    /**
     * The notification's body copy.
     */
    body: string;
    /**
     * An optional call to action, rendered as a link with `href` or as a
     * button with `onclick`.
     */
    action?: {
      label: string;
      href?: string;
      target?: string;
      rel?: string;
      onclick?: (event: MouseEvent) => void;
    };
    /**
     * Whether the notification is visible. Changes animate the height and
     * opacity. Default: `true`.
     */
    isVisible?: boolean;
    /**
     * A text replacement for the icon, if the body copy isn't self-explanatory.
     */
    iconLabel?: string;
    /**
     * Renders a close button in the top right corner. Requires `closeButtonLabel`.
     */
    onClose?: (event: MouseEvent) => void;
    /**
     * The close button's accessible name.
     */
    closeButtonLabel?: string;
  }

  let {
    variant = 'info',
    headline,
    headlineAs = 'h3',
    body,
    action,
    isVisible = true,
    iconLabel = '',
    onClose,
    closeButtonLabel,
    class: className,
    ...rest
  }: Props = $props();
</script>

<!--
  @component
  An inline notification within the content flow, to give additional guidance
  or draw attention to a section of the interface.
-->
<div {...rest} class={['base', !isVisible && 'hidden', className]}>
  <div class="collapsible">
    <div class={['wrapper', variant]}>
      <div class="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {#if variant === 'success'}
            <path
              fill="currentColor"
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m4.385 6.866a1.25 1.25 0 0 0-1.768 0L11 12.482l-1.366-1.366a1.25 1.25 0 1 0-1.768 1.768l2.25 2.25a1.25 1.25 0 0 0 1.768 0l4.5-4.5a1.25 1.25 0 0 0 0-1.768"
            />
          {:else if variant === 'warning'}
            <path
              fill="currentColor"
              d="M12 3c.493 0 .977.13 1.404.375s.781.598 1.027 1.024l7.194 12.436a2.76 2.76 0 0 1-.002 2.78 2.8 2.8 0 0 1-1.025 1.015c-.425.242-.905.37-1.394.37H4.814a2.8 2.8 0 0 1-1.394-.36 2.8 2.8 0 0 1-1.036-1.013 2.76 2.76 0 0 1-.008-2.792L9.569 4.399A2.82 2.82 0 0 1 12 3m.009 12.447a1 1 0 0 0 0 2h.009a1 1 0 0 0 0-2zm0-7.105a1 1 0 0 0-1 1V14.5h2V9.342a1 1 0 0 0-1-1"
            />
          {:else if variant === 'danger'}
            <path
              fill="currentColor"
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.407 6.593a1 1 0 0 0-1.414 0L12 10.586l-1.993-1.993a1 1 0 0 0-1.414 1.414L10.586 12l-1.993 1.993a1 1 0 0 0 1.414 1.414L12 13.414l1.993 1.993a1 1 0 0 0 1.414-1.414L13.414 12l1.993-1.993a1 1 0 0 0 0-1.414"
            />
          {:else}
            <path
              fill="currentColor"
              d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0m-9 3.6V12a1 1 0 1 1 2 0v3.6a1 1 0 1 1-2 0m1.009-8.2a1 1 0 1 1 0 2H12a1 1 0 0 1 0-2zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10"
            />
          {/if}
        </svg>
      </div>
      {#if iconLabel}<span class="hide-visually">{iconLabel}</span>{/if}

      <div class="content">
        {#if headline}
          <svelte:element this={headlineAs} class="text headline">{headline}</svelte:element>
        {/if}
        <p class="text">{body}</p>
        {#if action?.href}
          <a
            class="text action"
            href={action.href}
            target={action.target}
            rel={action.rel}
            onclick={action.onclick}>{action.label}</a
          >
        {:else if action}
          <button type="button" class="text action" onclick={action.onclick}>{action.label}</button>
        {/if}
      </div>

      {#if onClose && closeButtonLabel}
        <button
          type="button"
          class="close"
          title={closeButtonLabel}
          aria-label={closeButtonLabel}
          onclick={onClose}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11.528 3.528a.667.667 0 0 1 .944.944L8.943 8l3.529 3.528a.667.667 0 0 1-.944.944L8 8.943l-3.528 3.529a.667.667 0 0 1-.944-.944L7.057 8 3.528 4.472a.667.667 0 0 1 .944-.944L8 7.057z"
            />
          </svg>
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .base {
    display: grid;
    grid-template-rows: 1fr;
    transition:
      opacity var(--cui-transitions-slow),
      grid-template-rows var(--cui-transitions-slow),
      visibility var(--cui-transitions-slow);
  }

  .base.hidden {
    grid-template-rows: 0fr;
    visibility: hidden;
    opacity: 0;
  }

  .collapsible {
    min-height: 0;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .base {
      transition: none;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    border-radius: var(--cui-border-radius-kilo);
  }

  .icon {
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: flex-start;
    line-height: 0;
  }

  /* Variants */

  .info {
    background-color: var(--cui-bg-subtle);
  }

  .info .icon {
    color: var(--cui-fg-accent);
  }

  .success {
    background-color: var(--cui-bg-success);
  }

  .success .icon {
    color: var(--cui-fg-success);
  }

  .warning {
    background-color: var(--cui-bg-warning);
  }

  .warning .icon {
    color: var(--cui-fg-warning);
  }

  .danger {
    background-color: var(--cui-bg-danger);
  }

  .danger .icon {
    color: var(--cui-fg-danger);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-right: var(--cui-spacings-peta);
    padding-left: var(--cui-spacings-mega);
  }

  /* Typography — inlined from the Body component, size `m` */
  .text {
    margin: 0;
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-m-line-height);
    color: var(--cui-fg-normal);
    letter-spacing: var(--cui-letter-spacing);
  }

  .headline {
    font-weight: var(--cui-font-weight-semibold);
  }

  /* Action — inlined from the Anchor component, weight `bold` */
  .action {
    padding: 0;
    margin-top: var(--cui-spacings-byte);
    font-weight: var(--cui-font-weight-bold);
    color: var(--cui-fg-accent);
    text-align: left;
    text-decoration: underline;
    text-decoration-skip-ink: auto;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--cui-border-radius-bit);
    outline: none;
    transition: color var(--cui-transitions-default);
  }

  .action:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .action:active {
    color: var(--cui-fg-accent-pressed);
  }

  .action:focus-visible {
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  /* Close button — inlined from the CloseButton component, tertiary, size `s` */
  .close {
    display: inline-flex;
    flex-grow: 0;
    flex-shrink: 0;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    min-width: 24px;
    min-height: 24px;
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
    margin: calc(-1 * var(--cui-spacings-bit)) 0 calc(-1 * var(--cui-spacings-bit)) auto;
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
    transform: translate(0, 1px);
  }

  .close:focus-visible {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
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
</style>
