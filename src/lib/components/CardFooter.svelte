<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    align?: 'left' | 'right';
    children?: Snippet;
    [key: string]: unknown;
  }

  let { align = 'right', children, ...rest }: Props = $props();
</script>

<div class="base" class:left={align === 'left'} class:right={align === 'right'} {...rest}>
  {@render children?.()}
</div>

<style>
  .base {
    display: block;
    width: 100%;
    margin-top: var(--cui-spacings-giga);
  }

  @media (min-width: 480px) {
    .base {
      display: flex;
      margin-top: var(--cui-spacings-mega);
    }
  }

  /* Alignment */

  @media (min-width: 480px) {
    .left {
      justify-content: flex-start;
    }
  }

  @media (min-width: 480px) {
    .right {
      justify-content: flex-end;
    }
  }
</style>
