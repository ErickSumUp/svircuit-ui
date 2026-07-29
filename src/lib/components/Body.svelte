<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    /**
     * Choose from 3 font sizes. Default: `m`.
     */
    size?:
      | 's'
      | 'm'
      | 'l'
      /**
       * @deprecated Use `m` instead.
       */
      | 'one'
      /**
       * @deprecated Use `s` instead.
       */
      | 'two';
    /**
     * Choose from three font weights. Default: `regular`.
     *
     * Use the `as` prop to render the component as the `strong` HTML element
     * if appropriate.
     */
    weight?: 'regular' | 'semibold' | 'bold';
    /**
     * Choose a text decoration. Underline is reserved for hyperlinks.
     *
     * Use the `as` prop to render the component as the `del` HTML element if
     * appropriate.
     */
    decoration?: 'strikethrough';
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
     * @deprecated Use the `color` prop instead of the `alert`, `confirm` and
     * `subtle` variants. Use the `weight` prop instead of the `highlight`
     * variant. Use custom CSS for the `quote` variant.
     */
    variant?: 'highlight' | 'quote' | 'confirm' | 'alert' | 'subtle';
    /**
     * Render the text using any HTML element. Default: `p`, or the element that
     * matches the deprecated `variant`.
     */
    as?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    size = 'm',
    weight,
    decoration,
    color = 'normal',
    variant,
    as,
    children,
    ...rest
  }: Props = $props();

  const deprecatedSizeMap: Record<string, string> = { one: 'm', two: 's' };

  const fontSize = $derived(deprecatedSizeMap[size] ?? size);

  /** The `strong` element is semibold unless a weight says otherwise. */
  const fontWeight = $derived(weight ?? (as === 'strong' ? 'semibold' : 'regular'));

  const element = $derived.by(() => {
    if (as) {
      return as;
    }
    if (variant === 'highlight') {
      return 'strong';
    }
    if (variant === 'quote') {
      return 'blockquote';
    }
    return 'p';
  });
</script>

<svelte:element
  this={element}
  class={['base', color, fontSize, fontWeight, decoration, variant]}
  {...rest}
>
  {@render children()}
</svelte:element>

<style>
  .base {
    margin: 0;
    letter-spacing: var(--cui-letter-spacing);
  }

  /* Sizes */
  .l {
    font-size: var(--cui-body-l-font-size);
    line-height: var(--cui-body-l-line-height);
  }

  .m {
    font-size: var(--cui-body-m-font-size);
    line-height: var(--cui-body-m-line-height);
  }

  .s {
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
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

  /* Decorations */
  .strikethrough {
    text-decoration: line-through;
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

  /* Deprecated variants */
  .highlight,
  .base :global(strong) {
    font-weight: var(--cui-font-weight-semibold);
  }

  .quote,
  blockquote.base,
  .base :global(blockquote) {
    padding-left: var(--cui-spacings-kilo);
    font-style: italic;
    border-left: var(--cui-border-width-mega) solid var(--cui-border-accent);
  }

  .confirm {
    color: var(--cui-fg-success);
  }

  .alert {
    color: var(--cui-fg-danger);
  }
</style>
