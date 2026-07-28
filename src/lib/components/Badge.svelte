<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Choose the semantic style variant. Default: 'neutral'.
     */
    variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'promo';
    /**
     * Use the circular badge to indicate a count of items related to an element.
     * Short counts stay in a fixed circle; longer counts grow into a pill.
     */
    circle?: boolean;
    /**
     * Render the badge using any HTML element. Default: 'span'.
     */
    as?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    variant = 'neutral',
    circle = false,
    as = 'span',
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class="base"
  class:pill={!circle}
  class:circle
  class:neutral={variant === 'neutral'}
  class:success={variant === 'success'}
  class:warning={variant === 'warning'}
  class:danger={variant === 'danger'}
  class:promo={variant === 'promo'}
  {...rest}
>
  {@render children()}
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

  /* Default (non-circle) — inlined from Status `.pill` */
  .pill {
    padding: var(--cui-spacings-bit) var(--cui-spacings-byte);
    color: var(--badge-fg);
    background-color: var(--badge-bg);
    border-radius: var(--cui-border-radius-pill);
  }

  /* Circular count — inlined from Status `.badge`.
     `width: auto` + `min-width/min-height` keeps short counts in a perfect
     circle while letting longer counts expand, replacing Status' JS-driven
     dynamic-width computation with a purely declarative rule. */
  .circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: var(--cui-spacings-giga);
    min-height: var(--cui-spacings-giga);
    padding: var(--cui-spacings-bit);
    color: var(--badge-fg-strong);
    background-color: var(--badge-bg-strong);
    border-radius: var(--cui-border-radius-pill);
  }

  /* Colors — inlined from Status color classes, mapped to Badge's public
     variant names (success=confirm, warning=notify, danger=alert). */
  .success {
    --badge-fg: var(--cui-fg-success);
    --badge-bg: var(--cui-bg-success);
    --badge-fg-strong: var(--cui-fg-on-strong);
    --badge-bg-strong: var(--cui-bg-success-strong);
  }

  .neutral {
    --badge-fg: var(--cui-fg-neutral);
    --badge-bg: var(--cui-bg-neutral);
    --badge-fg-strong: var(--cui-fg-normal);
    --badge-bg-strong: var(--cui-bg-neutral-strong);
  }

  .warning {
    --badge-fg: var(--cui-fg-warning);
    --badge-bg: var(--cui-bg-warning);
    --badge-fg-strong: var(--cui-fg-on-strong);
    --badge-bg-strong: var(--cui-bg-warning-strong);
  }

  .danger {
    --badge-fg: var(--cui-fg-danger);
    --badge-bg: var(--cui-bg-danger);
    --badge-fg-strong: var(--cui-fg-on-strong);
    --badge-bg-strong: var(--cui-bg-danger-strong);
  }

  .promo {
    --badge-fg: var(--cui-fg-promo);
    --badge-bg: var(--cui-bg-promo);
    --badge-fg-strong: var(--cui-fg-on-strong);
    --badge-bg-strong: var(--cui-bg-promo-strong);
  }
</style>
