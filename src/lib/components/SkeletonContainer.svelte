<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Whether the section content is loading. Every `Skeleton` inside turns
     * into a placeholder.
     */
    isLoading: boolean;
    /**
     * The SkeletonContainer should wrap the entire section that's loading.
     */
    children: Snippet;
  }

  let { isLoading, children, class: className, ...rest }: Props = $props();

  // The key is read by Skeleton.svelte.
  setContext('svircuit:skeleton', () => isLoading);
</script>

<!--
  @component
  Wraps a section that's loading. It disables user interactions and signals to
  screen readers that content is being loaded.
-->
<div
  {...rest}
  class={['container', className]}
  aria-busy={isLoading}
  inert={isLoading || undefined}
>
  {@render children()}
</div>

<style>
  .container[aria-busy='true'] {
    pointer-events: none;
    user-select: none;
  }
</style>
