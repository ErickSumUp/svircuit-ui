<script lang="ts">
  import { type Snippet } from 'svelte';

  interface Props {
    vertical?: boolean;
    align?: 'start' | 'center' | 'end' | 'baseline';
    gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
    children?: Snippet;
    [key: string]: unknown;
  }

  let { vertical = false, align = 'center', gap = 'm', children }: Props = $props();
</script>

<div
  class="base"
  class:vertical
  class:start={align === 'start'}
  class:center={align === 'center'}
  class:end={align === 'end'}
  class:baseline={align === 'baseline'}
  class:xs={gap === 'xs'}
  class:s={gap === 's'}
  class:m={gap === 'm'}
  class:l={gap === 'l'}
  class:xl={gap === 'xl'}
  class:xxl={gap === 'xxl'}
>
  {@render children?.()}
</div>

<style>
  .base {
    display: flex;
    flex-direction: column;
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

  .start {
    align-items: flex-start;
  }

  .center {
    align-items: center;
  }

  .end {
    align-items: flex-end;
  }

  .baseline {
    align-items: baseline;
  }

  .xs {
    gap: var(--cui-spacings-bit);
  }

  .s {
    gap: var(--cui-spacings-byte);
  }

  .m {
    gap: var(--cui-spacings-kilo);
  }

  .l {
    gap: var(--cui-spacings-mega);
  }

  .xl {
    gap: var(--cui-spacings-giga);
  }

  .xxl {
    gap: var(--cui-spacings-tera);
  }
</style>
