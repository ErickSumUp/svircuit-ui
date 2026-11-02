<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Direction to align the buttons. Defaults to `center`.
     */
    align?: 'left' | 'center' | 'right';
    /**
     * The size of the buttons, which sets the gap between them on wide
     * viewports. Pass the same `size` to the buttons. Defaults to `m`.
     */
    size?: 's' | 'm';
    children: Snippet;
    [key: string]: unknown;
  }

  let { align = 'center', size = 'm', class: className, children, ...rest }: Props = $props();
</script>

<div {...rest} class={['container', className]}>
  <div class={['base', align, size]}>
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
    gap: var(--cui-spacings-kilo);
    align-items: center;
  }

  @container cui-button-group (width > 370px) {
    .base {
      flex-direction: row-reverse;
    }

    .s {
      gap: var(--cui-spacings-kilo);
    }

    .m {
      gap: var(--cui-spacings-mega);
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
  }
</style>
