<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children: Snippet;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<!--
  @component
  Wraps the page content next to which side panels open. On larger viewports
  it narrows while a `SidePanel` inside it is open, so the panel doesn't cover
  the content.
-->
<div {...rest} class={['base', className]}>
  {@render children()}
</div>

<style>
  .base {
    width: 100%;
    transition: width var(--cui-transitions-slow);
  }

  @media (min-width: 768px) {
    .base:has(:global(dialog[data-side-panel][open])) {
      width: calc(100% - var(--side-panel-width, 440px));
    }
  }
</style>
