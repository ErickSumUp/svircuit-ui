<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Choose the style variant. Default: 'pill'.
     */
    variant?: 'pill' | 'badge' | 'dot' | 'line';
    /**
     * Choose the semantic color. Default: 'neutral'.
     */
    color?: 'confirm' | 'neutral' | 'notify' | 'alert' | 'promo' | 'special';
    /**
     * Leading icon, only rendered for the 'line' variant.
     */
    icon?: Snippet;
    /**
     * Render the status using any HTML element. Default: 'div'.
     */
    as?: string;
    /**
     * Label. Used as the visible content for every variant except 'dot',
     * where it's rendered visually hidden as the accessible name instead.
     */
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    variant = 'pill',
    color = 'neutral',
    icon,
    as = 'div',
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class="base"
  class:pill={variant === 'pill'}
  class:badge={variant === 'badge'}
  class:dot={variant === 'dot'}
  class:line={variant === 'line'}
  class:confirm={color === 'confirm'}
  class:neutral={color === 'neutral'}
  class:notify={color === 'notify'}
  class:alert={color === 'alert'}
  class:promo={color === 'promo'}
  class:special={color === 'special'}
  {...rest}
>
  {#if variant === 'line' && icon}
    {@render icon()}
  {/if}
  {#if children}
    {#if variant === 'dot'}
      <span class="hide-label">{@render children()}</span>
    {:else}
      {@render children()}
    {/if}
  {/if}
</svelte:element>

<style>
  /* Base — inlined from circuit-ui Status `.base` */
  .base {
    display: inline-block;
    font-size: var(--cui-compact-s-font-size);
    font-weight: var(--cui-font-weight-semibold);
    line-height: var(--cui-compact-s-line-height);
    text-align: center;
    letter-spacing: var(--cui-letter-spacing);
  }

  /* Pill — a rounded label with a soft, semantic background */
  .pill {
    padding: var(--cui-spacings-bit) var(--cui-spacings-byte);
    color: var(--status-fg);
    background-color: var(--status-bg);
    border-radius: var(--cui-border-radius-pill);
  }

  /* Badge — a circular counter that grows into a pill for longer labels.
     `width: auto` + `min-width/min-height` keeps short counts in a perfect
     circle while letting longer counts expand, replacing circuit-ui's
     JS-driven dynamic-width computation with a purely declarative rule. */
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: var(--cui-spacings-giga);
    min-height: var(--cui-spacings-giga);
    padding: var(--cui-spacings-bit);
    color: var(--status-fg-strong);
    background-color: var(--status-bg-strong);
    border-radius: var(--cui-border-radius-pill);
  }

  /* Dot — a small indicator; the label is kept for screen readers only */
  .dot {
    --status-dot-size: calc(var(--cui-spacings-byte) + var(--cui-border-width-mega));

    position: relative;
    display: inline-block;
    width: var(--cui-spacings-mega);
    height: var(--cui-spacings-mega);
  }

  .dot::before {
    position: absolute;
    top: calc((var(--cui-spacings-mega) - var(--status-dot-size)) / 2);
    left: calc((var(--cui-spacings-mega) - var(--status-dot-size)) / 2);
    width: var(--status-dot-size);
    height: var(--status-dot-size);
    content: '';
    background-color: var(--status-dot-color);
    border-radius: var(--cui-border-radius-circle);
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

  /* Line — an inline icon and label with no background */
  .line {
    display: inline-flex;
    gap: var(--cui-spacings-bit);
    align-items: center;
    padding: var(--cui-spacings-bit) 0;
    color: var(--cui-fg-normal);
    background: none;
  }

  .line :global(svg) {
    flex-shrink: 0;
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
    color: var(--status-icon-color);
  }

  /* Colors — inlined from circuit-ui's Status color classes */
  .confirm {
    --status-fg: var(--cui-fg-success);
    --status-bg: var(--cui-bg-success);
    --status-fg-strong: var(--cui-fg-on-strong);
    --status-bg-strong: var(--cui-bg-success-strong);
    --status-dot-color: var(--cui-bg-success-strong);
    --status-icon-color: var(--cui-fg-success);
  }

  .neutral {
    --status-fg: var(--cui-fg-neutral);
    --status-bg: var(--cui-bg-neutral);
    --status-fg-strong: var(--cui-fg-normal);
    --status-bg-strong: var(--cui-bg-neutral-strong);
    --status-dot-color: var(--cui-bg-neutral-strong);
    --status-icon-color: var(--cui-fg-neutral);
  }

  .notify {
    --status-fg: var(--cui-fg-warning);
    --status-bg: var(--cui-bg-warning);
    --status-fg-strong: var(--cui-fg-on-strong);
    --status-bg-strong: var(--cui-bg-warning-strong);
    --status-dot-color: var(--cui-bg-warning-strong);
    --status-icon-color: var(--cui-fg-warning);
  }

  .alert {
    --status-fg: var(--cui-fg-danger);
    --status-bg: var(--cui-bg-danger);
    --status-fg-strong: var(--cui-fg-on-strong);
    --status-bg-strong: var(--cui-bg-danger-strong);
    --status-dot-color: var(--cui-bg-danger-strong);
    --status-icon-color: var(--cui-fg-danger);
  }

  .promo {
    --status-fg: var(--cui-fg-promo);
    --status-bg: var(--cui-bg-promo);
    --status-fg-strong: var(--cui-fg-on-strong);
    --status-bg-strong: var(--cui-bg-promo-strong);
    --status-dot-color: var(--cui-bg-promo-strong);
    --status-icon-color: var(--cui-fg-promo);
  }

  .special {
    --status-fg: var(--cui-fg-on-strong);
    --status-bg: var(--cui-fg-normal);
    --status-fg-strong: var(--cui-fg-on-strong);
    --status-bg-strong: var(--cui-fg-normal);
    --status-dot-color: var(--cui-fg-normal);
    --status-icon-color: var(--cui-fg-normal);
  }
</style>
