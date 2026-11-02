<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Use `system` for system notifications and `promotional` for promotions
     * and recommendations. Default: `system`.
     */
    variant?: 'system' | 'promotional';
    /**
     * The notification's headline, rendered as an `h2`.
     */
    headline: string;
    /**
     * Optional body copy below the headline.
     */
    body?: string;
    /**
     * The call to action, rendered as a link with `href` or as a button with
     * `onclick`. Default variant: `primary`.
     */
    action: {
      label: string;
      variant?: 'primary' | 'secondary' | 'tertiary';
      href?: string;
      target?: string;
      rel?: string;
      onclick?: (event: MouseEvent) => void;
    };
    /**
     * An optional image beside the content. `width` is in pixels (default
     * `200`), `align` sets the image's position within its box (default
     * `center`).
     */
    image?: {
      src: string;
      alt: string;
      width?: number;
      align?: 'top' | 'left' | 'bottom' | 'right' | 'center';
    };
    /**
     * Whether the banner is visible. Changes animate the height and opacity.
     * Default: `true`.
     */
    isVisible?: boolean;
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
    variant = 'system',
    headline,
    body,
    action,
    image,
    isVisible = true,
    onClose,
    closeButtonLabel,
    class: className,
    ...rest
  }: Props = $props();

  const actionClass = $derived(['button', action.variant ?? 'primary']);
</script>

<!--
  @component
  A prominent banner for high-level, site-wide information, with a call to
  action and optionally an image.
-->
<div {...rest} class={['base', !isVisible && 'hidden', className]}>
  <div class="collapsible">
    <div class={['banner', variant]}>
      <div class="grid">
        <div class="content">
          <h2 class="headline">{headline}</h2>
          {#if body}<p class="body">{body}</p>{/if}
        </div>

        {#if action.href}
          <a
            class={actionClass}
            href={action.href}
            target={action.target}
            rel={action.rel}
            onclick={action.onclick}>{action.label}</a
          >
        {:else}
          <button type="button" class={actionClass} onclick={action.onclick}>{action.label}</button>
        {/if}

        {#if image}
          <img
            class="image"
            src={image.src}
            alt={image.alt}
            style:width="{image.width ?? 200}px"
            style:object-position={image.align ?? 'center'}
          />
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
      opacity 200ms ease-in-out,
      grid-template-rows 200ms ease-in-out,
      visibility 200ms ease-in-out;
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

  .banner {
    position: relative;
    container: notification-banner / inline-size;
    overflow: hidden;
    border-radius: var(--cui-border-radius-mega);
  }

  .system {
    background-color: var(--cui-bg-accent);
  }

  .promotional {
    background-color: var(--cui-bg-subtle);
  }

  .grid {
    display: grid;
    grid-template-areas: 'content image' 'button image';
    grid-template-columns: minmax(150px, 1fr) auto;
  }

  .content {
    display: flex;
    flex-direction: column;
    grid-area: content;
    gap: var(--cui-spacings-byte);
    max-width: 600px;
    margin: var(--cui-spacings-giga) var(--cui-spacings-byte) 0 var(--cui-spacings-giga);
  }

  /* Typography — inlined from the Headline and Body components */
  .headline,
  .body {
    margin: 0;
    color: var(--cui-fg-normal);
    letter-spacing: var(--cui-letter-spacing);
  }

  .headline {
    font-family: var(--cui-font-stack-default);
    font-size: var(--cui-headline-s-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-headline-s-line-height);
  }

  .body {
    font-size: var(--cui-body-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-s-line-height);
  }

  @media (min-width: 768px) {
    .headline {
      font-size: var(--cui-headline-m-font-size);
      line-height: var(--cui-headline-m-line-height);
    }

    .body {
      font-size: var(--cui-body-m-font-size);
      line-height: var(--cui-body-m-line-height);
    }
  }

  .image {
    display: block;
    grid-area: image;
    align-self: stretch;
    min-width: 0;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0 var(--cui-border-radius-mega) var(--cui-border-radius-mega) 0;
  }

  /* Action — inlined from the Button component, size `s` */
  .button {
    display: inline-flex;
    grid-area: button;
    align-items: center;
    justify-content: center;
    width: fit-content;
    min-height: 24px;
    box-sizing: content-box;
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
    margin: var(--cui-spacings-byte) var(--cui-spacings-byte) var(--cui-spacings-giga)
      var(--cui-spacings-giga);
    font-size: var(--cui-body-s-font-size);
    font-weight: var(--cui-font-weight-semibold);
    line-height: var(--cui-body-s-line-height);
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    border: var(--cui-border-width-kilo) solid;
    border-radius: var(--cui-border-radius-byte);
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

  .tertiary {
    padding-right: 0;
    padding-left: 0;
    color: var(--cui-fg-accent);
    text-decoration: underline;
    text-underline-offset: 0.25em;
    background-color: transparent;
    border-color: transparent;
  }

  .tertiary:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .tertiary:active {
    color: var(--cui-fg-accent-pressed);
  }

  /* Placed after the base rules so the wide layout wins over them. */
  @container notification-banner (width > 960px) {
    .grid {
      grid-template-areas: 'image content button';
      grid-template-columns: auto minmax(150px, 1fr) auto;
      align-items: center;
    }

    .content {
      margin: var(--cui-spacings-giga) 0 var(--cui-spacings-giga) var(--cui-spacings-byte);
    }

    .button {
      margin: var(--cui-spacings-giga);
    }
  }

  /* Close button — inlined from the CloseButton component, tertiary, size `s` */
  .close {
    position: absolute;
    top: var(--cui-spacings-byte);
    right: var(--cui-spacings-byte);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    min-width: 24px;
    min-height: 24px;
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
    color: var(--cui-fg-accent);
    cursor: pointer;
    background-color: inherit;
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
</style>
