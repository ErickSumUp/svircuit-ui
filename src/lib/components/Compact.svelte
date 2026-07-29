<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /**
     * Choose from 3 font sizes. Default: `m`.
     */
    size?: 's' | 'm' | 'l';
    /**
     * Choose from three font weights. Default: `regular`.
     */
    weight?: 'regular' | 'semibold' | 'bold';
    /**
     * Choose a foreground color token name. Default: `normal`.
     */
    color?:
      | 'normal'
      | 'subtle'
      | 'placeholder'
      | 'on-strong'
      | 'on-strong-subtle'
      | 'accent'
      | 'success'
      | 'warning'
      | 'danger'
      | 'promo';
    /**
     * Render the text using any HTML element. Default: `p`.
     */
    as?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    size = 'm',
    weight = 'regular',
    color = 'normal',
    as = 'p',
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element this={as} class={['base', size, weight, color]} {...rest}>
  {@render children()}
</svelte:element>

<style>
  .base {
    margin: 0;
    letter-spacing: var(--cui-letter-spacing);
  }

  /* Sizes */
  .l {
    font-size: var(--cui-compact-l-font-size);
    line-height: var(--cui-compact-l-line-height);
  }

  .m {
    font-size: var(--cui-compact-m-font-size);
    line-height: var(--cui-compact-m-line-height);
  }

  .s {
    font-size: var(--cui-compact-s-font-size);
    line-height: var(--cui-compact-s-line-height);
  }

  /* Weights */
  .regular {
    font-weight: var(--cui-font-weight-regular);
  }

  .semibold {
    font-weight: var(--cui-font-weight-semibold);
  }

  .bold {
    font-weight: var(--cui-font-weight-bold);
  }

  /* Colors */
  .normal {
    color: var(--cui-fg-normal);
  }

  .subtle {
    color: var(--cui-fg-subtle);
  }

  .placeholder {
    color: var(--cui-fg-placeholder);
  }

  .on-strong {
    color: var(--cui-fg-on-strong);
  }

  .on-strong-subtle {
    color: var(--cui-fg-on-strong-subtle);
  }

  .accent {
    color: var(--cui-fg-accent);
  }

  .success {
    color: var(--cui-fg-success);
  }

  .warning {
    color: var(--cui-fg-warning);
  }

  .danger {
    color: var(--cui-fg-danger);
  }

  .promo {
    color: var(--cui-fg-promo);
  }
</style>
