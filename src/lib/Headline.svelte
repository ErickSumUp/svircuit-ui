<script lang="ts">
  export let size: 'one' | 'two' | 'three' | 'four' = 'one';
  export let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
</script>

<svelte:element
  class="headline"
  class:one={size === 'one'}
  class:two={size === 'two'}
  class:three={size === 'three'}
  class:four={size === 'four'}
  this={as}
><slot/></svelte:element>

<style>
  .headline {
      font-weight: var(--cui-font-weight-bold);
      color: var(--cui-fg-normal);
      letter-spacing: -0.03em;
  }
  .one {
      font-size: var(--cui-ty-headline-font-size-one);
      line-height: var(--cui-ty-headline-line-height-one);
  }
  .two {
    font-size: var(--cui-ty-headline-font-size-two);
    line-height: var(--cui-ty-headline-line-height-two);
  }
  .three {
    font-size: var(--cui-ty-headline-font-size-three);
    line-height: var(--cui-ty-headline-line-height-three);
  }
  .four {
    font-size: var(--cui-ty-headline-font-size-four);
    line-height: var(--cui-ty-headline-line-height-four);
  }
</style>