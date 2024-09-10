<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /**
     * The padding of the Card.
     */
    spacing?: 'mega' | 'giga';
    children: Snippet;
  }

  let { spacing = 'giga', children, ...rest }: Props = $props();
</script>

<div class="base" class:mega={spacing === 'mega'} class:giga={spacing === 'giga'} {...rest}>
  {@render children()}
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--cui-bg-normal);
    border: var(--cui-border-width-mega) solid var(--cui-border-subtle);
    border-radius: var(--cui-border-radius-mega);
  }
  .mega {
    padding: var(--cui-spacings-mega) var(--cui-spacings-mega);
  }
  .giga {
    padding: var(--cui-spacings-mega) var(--cui-spacings-giga);
  }
</style>
