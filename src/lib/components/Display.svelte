<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * Choose from 4 font sizes. Default: `m`.
     */
    size?:
      | 's'
      | 'm'
      | 'l'
      | 'xl'
      /**
       * @deprecated Use `l` instead.
       */
      | 'one'
      /**
       * @deprecated Use `m` instead.
       */
      | 'two'
      /**
       * @deprecated Use `m` instead.
       */
      | 'three'
      /**
       * @deprecated Use `s` instead.
       */
      | 'four';
    /**
     * Choose from two font weights. Defaults to `black` at size `xl` and to
     * `bold` at every other size.
     */
    weight?: 'black' | 'bold';
    /**
     * The HTML heading element to render.
     * Headings should be nested sequentially without skipping any levels.
     * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: Snippet;
    [key: string]: unknown;
  }

  let { size = 'm', weight, as = 'h2', children, ...rest }: Props = $props();

  const deprecatedSizeMap: Record<string, string> = {
    one: 'l',
    two: 'm',
    three: 'm',
    four: 's'
  };

  const fontSize = $derived(deprecatedSizeMap[size] ?? size);

  /** Only the largest size is set in the display typeface by default. */
  const fontWeight = $derived(weight ?? (fontSize === 'xl' ? 'black' : 'bold'));
</script>

<svelte:element this={as} class={['base', fontSize, fontWeight]} {...rest}>
  {@render children()}
</svelte:element>

<style>
  .base {
    margin: 0;
    color: var(--cui-fg-normal);
    letter-spacing: var(--cui-letter-spacing-tight, var(--cui-letter-spacing));
  }

  /* Weights */
  .black {
    font-family: var(--cui-font-stack-display);
  }

  .bold {
    font-family: var(--cui-font-stack-default);
    font-weight: var(--cui-font-weight-bold);
  }

  /* Sizes */
  .xl {
    font-size: var(--cui-display-xl-font-size);
    line-height: var(--cui-display-xl-line-height);
  }

  .l {
    font-size: var(--cui-display-l-font-size);
    line-height: var(--cui-display-l-line-height);
  }

  .m {
    font-size: var(--cui-display-m-font-size);
    line-height: var(--cui-display-m-line-height);
  }

  .s {
    font-size: var(--cui-display-s-font-size);
    line-height: var(--cui-display-s-line-height);
  }
</style>
