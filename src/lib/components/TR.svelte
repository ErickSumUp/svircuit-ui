<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLTableRowElement> {
    [key: string]: unknown;
  }

  let { children, ...rest }: Props = $props();
</script>

<tr {...rest}>
  {@render children()}
</tr>

<style>
  tr {
    vertical-align: middle;
  }
  tr:hover {
    background-color: var(--cui-bg-normal-hovered);
    color: var(--cui-fg-accent-hovered);
  }
</style>
