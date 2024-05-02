<script lang="ts">
  export let as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
</script>

<svelte:element this={as} class="sub-headline">
  <slot />
</svelte:element>

<style>
  .sub-headline {
    font-size: var(--cui-ty-sub-headline-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-ty-sub-headline-line-height);
    color: var(--cui-fg-normal);
    text-transform: uppercase;
  }
</style>
