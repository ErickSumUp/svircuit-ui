<script>
  /**
   * A Circuit UI headline size. Defaults to `one`.
   * @type {('one' | 'two' | 'three' | 'four')}
   */
  export let size = 'one';
  /**
   * The HTML heading element to render.
   * Headings should be nested sequentially without skipping any levels.
   * Learn more at https://www.w3.org/WAI/tutorials/page-structure/headings/.
   * @type {('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')}
   */
  export let as = 'h1';
</script>

<svelte:element
  this={as}
  class="base"
  class:one={size === 'one'}
  class:two={size === 'two'}
  class:three={size === 'three'}
  class:four={size === 'four'}
  {...$$restProps}><slot /></svelte:element
>

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
