<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /**
     * Choose from 4 font sizes. Default: `m`.
     */
    size?: 's' | 'm' | 'l' | 'xl';
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
     * Choose a text decoration. Underline is reserved for hyperlinks.
     *
     * Use the `as` prop to render the component as the `del` HTML element if
     * appropriate.
     */
    decoration?: 'strikethrough';
    /**
     * Render the number using any HTML element. Default: `p`.
     */
    as?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { size = 'm', color = 'normal', decoration, as = 'p', children, ...rest }: Props = $props();
</script>

<svelte:element this={as} class={['base', size, color, decoration]} {...rest}>
  {@render children()}
</svelte:element>

<style>
  .base {
    margin: 0;
    font-variant-numeric: tabular-nums;
    letter-spacing: var(--cui-letter-spacing);
  }

  /* Sizes — the weight is part of the size, numbers get heavier as they grow */
  .xl {
    font-size: var(--cui-numeral-xl-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-numeral-xl-line-height);
  }

  .l {
    font-size: var(--cui-numeral-l-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-numeral-l-line-height);
  }

  .m {
    font-size: var(--cui-numeral-m-font-size);
    font-weight: var(--cui-font-weight-semibold);
    line-height: var(--cui-numeral-m-line-height);
  }

  .s {
    font-size: var(--cui-numeral-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-numeral-s-line-height);
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

  /* Decorations */
  .strikethrough {
    text-decoration: line-through;
  }
</style>
