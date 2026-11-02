<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  type Action = {
    label: string;
    href?: string;
    onclick?: (event: MouseEvent) => void;
    destructive?: boolean;
  };

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * An image to illustrate the notification. Pass an empty `alt` if the image
     * is decorative.
     */
    image: { src: string; alt: string };
    /**
     * The notification's headline.
     */
    headline: string;
    /**
     * The heading level of the headline. Use `h1` when the notification is the
     * page's main content. Default: `h2`.
     */
    headlineAs?: 'h1' | 'h2';
    /**
     * Optional body copy for the notification's details.
     */
    body?: string;
    /**
     * Optional primary and secondary actions, rendered as links with `href` or
     * as buttons with `onclick`.
     */
    actions?: { primary: Action; secondary?: Action };
  }

  let {
    image,
    headline,
    headlineAs = 'h2',
    body,
    actions,
    class: className,
    ...rest
  }: Props = $props();
</script>

<!--
  @component
  Important information or feedback as part of a process flow, such as the
  outcome of a task or an unsupported browser.
-->
<div {...rest} class={['base', className]}>
  <img class="image" src={image.src} alt={image.alt} />
  <svelte:element this={headlineAs} class="headline">{headline}</svelte:element>
  {#if body}<p class="body">{body}</p>{/if}

  {#if actions}
    <div class="buttons">
      <div class="button-group">
        {@render action(actions.primary, 'primary')}
        {#if actions.secondary}{@render action(actions.secondary, 'secondary')}{/if}
      </div>
    </div>
  {/if}
</div>

{#snippet action({ label, href, onclick, destructive }: Action, variant: string)}
  {#if href}
    <a class={['button', variant, destructive && 'destructive']} {href} {onclick}>{label}</a>
  {:else}
    <button type="button" class={['button', variant, destructive && 'destructive']} {onclick}
      >{label}</button
    >
  {/if}
{/snippet}

<style>
  .base {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 420px;
  }

  /* Image — inlined from the Image component */
  .image {
    display: block;
    width: 100%;
    max-width: 280px;
    height: 160px;
    margin-bottom: var(--cui-spacings-giga);
    object-fit: contain;
  }

  /* Typography — inlined from the Headline (size `m`) and Body components */
  .headline,
  .body {
    margin: 0;
    color: var(--cui-fg-normal);
    text-align: center;
    letter-spacing: var(--cui-letter-spacing);
  }

  .headline {
    margin-bottom: var(--cui-spacings-byte);
    font-family: var(--cui-font-stack-default);
    font-size: var(--cui-headline-m-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-headline-m-line-height);
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
    container: notification-fullscreen-buttons / inline-size;
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
    text-decoration: none;
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

  @container notification-fullscreen-buttons (width > 370px) {
    .button-group {
      flex-direction: row-reverse;
      gap: var(--cui-spacings-mega);
      justify-content: center;
    }
  }

  @container notification-fullscreen-buttons (width < 360px) {
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
</style>
