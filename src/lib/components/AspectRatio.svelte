<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The ratio of width to height, for example `16 / 9` or `1.5`. Without it
     * the content keeps its own size.
     */
    aspectRatio?: number;
    /**
     * A single element that fills the box, for example an `img` or a `video`.
     * Nothing is rendered without it.
     */
    children?: Snippet;
    [key: string]: unknown;
  }

  let { aspectRatio, class: className, style, children, ...rest }: Props = $props();
</script>

{#if children}
  {#if aspectRatio}
    <div
      {...rest}
      class={['base', className]}
      style={[`--aspect-ratio: ${aspectRatio}`, style].filter(Boolean).join('; ')}
    >
      {@render children()}
    </div>
  {:else}
    <div {...rest} class={className} {style}>
      {@render children()}
    </div>
  {/if}
{/if}

<style>
  .base {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: var(--aspect-ratio);
    overflow: hidden;
  }

  /* The child is the consumer's markup, so it carries the consumer's scope.
     The `div` outranks a child component's own single-class rules, such as
     Image's `height: auto`, whichever stylesheet loads last. */
  div.base > :global(*) {
    position: absolute;
    inset: 0;
    z-index: var(--cui-z-index-absolute);
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
