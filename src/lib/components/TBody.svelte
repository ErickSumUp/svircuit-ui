<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLTableSectionElement> {
    children?: Snippet;
    [key: string]: unknown;
  }

  let { children, ...rest }: Props = $props();
</script>

<tbody {...rest}>
  {@render children?.()}
</tbody>

<style>
  :global(tbody, tbody :last-child th, tbody :last-child td) {
    border-bottom: none;
  }
  tbody {
    cursor: pointer;
    position: relative;
  }
  tbody:focus {
    z-index: 1;
    transform: translate(0, 0);
    outline: 0;
    box-shadow: inset 0 0 0 4px var(--cui-border-focus);
  }
  tbody::-moz-focus-inner {
    border: 0;
  }
  tbody:focus:not(:focus-visible) {
    box-shadow: none;
  }
</style>
