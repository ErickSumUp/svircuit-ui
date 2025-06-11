<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    vertical?: boolean;
    children?: Snippet;
    align?: 'center';
    [key: string]: unknown;
  }

  let { vertical = false, children }: Props = $props();
</script>

<div class="base" class:vertical>
  {@render children?.()}
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }

  @media screen and (min-width: 600px) {
    .base {
      flex-direction: row;
    }
  }

  @media screen and (min-width: 600px) {
    .vertical {
      flex-direction: column;
    }
  }
</style>
