<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLTableSectionElement> {
    [key: string]: unknown;
  }

  let { children, ...rest }: Props = $props();
</script>

<thead {...rest}>
  {@render children()}
</thead>

<style>
</style>
