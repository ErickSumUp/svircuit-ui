<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLTableSectionElement> {}

  let { children, ...rest }: Props = $props();
</script>

<thead {...rest}>
  {@render children()}
</thead>

<style>
</style>
