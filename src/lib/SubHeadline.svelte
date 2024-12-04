<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children?: Snippet;
  }

  let { as = 'h2', children }: Props = $props();
</script>

<svelte:element this={as} class="sub-headline">
  {@render children?.()}
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
