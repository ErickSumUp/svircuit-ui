<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Direction to align the buttons. Defaults to `center`.
     */
    align?: 'left' | 'center' | 'right';
    children: Snippet;
    [key: string]: unknown;
  }

  let { align = 'center', children, ...rest }: Props = $props();
</script>

<div class="container" {...rest}>
  <div
    class="base"
    class:left={align === 'left'}
    class:center={align === 'center'}
    class:right={align === 'right'}
  >
    {@render children()}
  </div>
</div>

<style>
  .container {
    width: 100%;
    container: cui-button-group / inline-size;
  }

  .base {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: var(--cui-spacings-kilo);
    gap: 1rem;
  }

  @container cui-button-group (width > 370px) {
    .base {
      flex-direction: row-reverse;
    }

    .left {
      justify-content: flex-end;
    }

    .center {
      justify-content: center;
    }

    .right {
      justify-content: flex-start;
    }

    .base .secondary {
      margin-top: 0;
      margin-right: var(--cui-spacings-mega);
    }
  }
</style>
