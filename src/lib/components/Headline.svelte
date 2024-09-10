<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /**
     * A Circuit UI headline size. Defaults to `one`.
     */
    size?: 'one' | 'two' | 'three' | 'four';
    /**
     * The HTML heading element to render.
     * Headings should be nested sequentially without skipping any levels.
     * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: Snippet;
  }

  let { size = 'one', as = 'h1', children, ...rest }: Props = $props();
</script>

<svelte:element
  this={as}
  class="base"
  class:one={size === 'one'}
  class:two={size === 'two'}
  class:three={size === 'three'}
  class:four={size === 'four'}
  {...rest}
>
  {@render children()}
</svelte:element>

<style>
  .base {
    font-weight: var(--cui-font-weight-bold);
    color: var(--cui-fg-normal);
    letter-spacing: -0.03em;
  }
  .one {
    font-size: var(--cui-typography-headline-one-font-size);
    line-height: var(--cui-typography-headline-one-line-height);
  }

  .two {
    font-size: var(--cui-typography-headline-two-font-size);
    line-height: var(--cui-typography-headline-two-line-height);
  }

  .three {
    font-size: var(--cui-typography-headline-three-font-size);
    line-height: var(--cui-typography-headline-three-line-height);
  }

  .four {
    font-size: var(--cui-typography-headline-four-font-size);
    line-height: var(--cui-typography-headline-four-line-height);
  }
</style>
