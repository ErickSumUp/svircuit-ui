<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLHeadingElement> {
    /**
     * Choose from 3 font sizes. Default: `m`.
     */
    size?:
      | 's'
      | 'm'
      | 'l'
      /**
       * @deprecated Use `l` instead.
       */
      | 'one'
      /**
       * @deprecated Use `m` instead.
       */
      | 'two'
      /**
       * @deprecated Use `s` instead.
       */
      | 'three'
      /**
       * @deprecated Use `s` instead.
       */
      | 'four';
    /**
     * The HTML heading element to render.
     * Headings should be nested sequentially without skipping any levels.
     * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: Snippet;
    [key: string]: unknown;
  }

  let { size = 'm', as = 'h2', children, ...rest }: Props = $props();

  const deprecatedSizeMap: Record<string, string> = {
    one: 'l',
    two: 'm',
    three: 's',
    four: 's'
  };

  const fontSize = $derived(deprecatedSizeMap[size] ?? size);
</script>

<svelte:element
  this={as}
  class="base"
  class:s={fontSize === 's'}
  class:m={fontSize === 'm'}
  class:l={fontSize === 'l'}
  {...rest}
>
  {@render children()}
</svelte:element>

<style>
  .base {
    margin: 0;
    color: var(--cui-fg-normal);
    letter-spacing: var(--cui-letter-spacing);
  }

  /* Sizes — the largest headline is set in the display typeface */
  .l {
    font-family: var(--cui-font-stack-display);
    font-size: var(--cui-headline-l-font-size);
    line-height: var(--cui-headline-l-line-height);
  }

  .m {
    font-family: var(--cui-font-stack-default);
    font-size: var(--cui-headline-m-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-headline-m-line-height);
  }

  .s {
    font-family: var(--cui-font-stack-default);
    font-size: var(--cui-headline-s-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-headline-s-line-height);
  }
</style>
