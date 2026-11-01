<script lang="ts">
  import { getContext, type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The content that is replaced by a placeholder while it loads. The
     * placeholder takes its size, so pass content of a realistic length.
     */
    children: Snippet;
    /**
     * Whether the placeholder is circular instead of rectangular. Default: `false`.
     */
    circle?: boolean;
    /**
     * Render the skeleton using any HTML element. Default: `span`.
     */
    as?: string;
  }

  let { children, circle = false, as = 'span', class: className, ...rest }: Props = $props();

  // The key is set by SkeletonContainer.svelte.
  const isLoading = getContext<(() => boolean) | undefined>('svircuit:skeleton') ?? (() => false);
</script>

<!--
  @component
  A placeholder for asynchronously loaded content with a subtle loading
  animation. Only works inside a `SkeletonContainer`.
-->
<svelte:element
  this={as}
  {...rest}
  class={['base', isLoading() && 'placeholder', isLoading() && circle && 'circle', className]}
>
  {@render children()}
</svelte:element>

<style>
  .base {
    display: inline-block;
    line-height: 0;
  }

  .placeholder {
    --skeleton-pulse-width: 8rem;

    background-color: var(--cui-bg-highlight);
    background-image: linear-gradient(
      90deg,
      var(--cui-bg-highlight),
      var(--cui-bg-subtle),
      var(--cui-bg-highlight)
    );
    background-repeat: no-repeat;
    background-size: var(--skeleton-pulse-width) 100%;
    border-radius: var(--cui-border-radius-byte);
    animation: pulse 3s ease-in-out infinite;
  }

  .placeholder > :global(*) {
    visibility: hidden !important;
  }

  .circle {
    border-radius: var(--cui-border-radius-circle);
  }

  @media (prefers-reduced-motion: reduce) {
    .placeholder {
      animation: none;
    }
  }

  @keyframes pulse {
    0% {
      background-position: calc(-1 * var(--skeleton-pulse-width)) 0;
    }

    50%,
    100% {
      background-position: calc(var(--skeleton-pulse-width) + 100%) 0;
    }
  }
</style>
