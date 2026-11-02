<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The callout's color. Default: `neutral`.
     */
    color?: 'confirm' | 'neutral' | 'notify' | 'alert' | 'promo';
    /**
     * The callout's body content: a string, or a snippet for text with links.
     */
    body: string | Snippet;
    /**
     * The 24px icon displayed next to the body. Default: an info icon.
     */
    icon?: Snippet;
    /**
     * A text replacement for the icon, if the body copy isn't self-explanatory.
     */
    iconLabel?: string;
  }

  let {
    color = 'neutral',
    body,
    icon,
    iconLabel = '',
    class: className,
    ...rest
  }: Props = $props();
</script>

<!--
  @component
  Static inline guidance or emphasis within the content flow.
-->
<div {...rest} class={['base', color, className]}>
  <div class="icon">
    {#if icon}
      {@render icon()}
    {:else}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0m-9 3.6V12a1 1 0 1 1 2 0v3.6a1 1 0 1 1-2 0m1.009-8.2a1 1 0 1 1 0 2H12a1 1 0 0 1 0-2zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10"
        />
      </svg>
    {/if}
  </div>
  {#if iconLabel}<span class="hide-visually">{iconLabel}</span>{/if}
  <div class="content">
    {#if typeof body === 'string'}
      {body}
    {:else}
      {@render body()}
    {/if}
  </div>
</div>

<style>
  .base {
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

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: var(--cui-spacings-mega);
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-m-line-height);
    letter-spacing: var(--cui-letter-spacing);
  }

  /* Colors */

  .confirm {
    background-color: var(--cui-bg-success);
  }

  .confirm .icon {
    color: var(--cui-fg-success);
  }

  .neutral {
    background-color: var(--cui-bg-neutral);
  }

  .neutral .icon {
    color: var(--cui-fg-neutral);
  }

  .notify {
    background-color: var(--cui-bg-warning);
  }

  .notify .icon {
    color: var(--cui-fg-warning);
  }

  .alert {
    background-color: var(--cui-bg-danger);
  }

  .alert .icon {
    color: var(--cui-fg-danger);
  }

  .promo {
    background-color: var(--cui-bg-promo);
  }

  .promo .icon {
    color: var(--cui-fg-promo);
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
