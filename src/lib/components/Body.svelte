<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /**
     * Choose from size variants. Default: `m`.
     */
    size?: 's' | 'm' | 'l';
    /**
     * Choose a foreground color token name. Default: `normal`.
     */
    color?:
      | 'normal'
      | 'subtle'
      | 'placeholder'
      | 'accent'
      | 'success'
      | 'warning'
      | 'danger'
      | 'promo';

    children: Snippet;
    [key: string]: unknown;
  }

  let { size = 'm', color = 'normal', children, ...rest }: Props = $props();
</script>

<p
  class="base {color}"
  class:s={size === 's'}
  class:m={size === 'm'}
  class:l={size === 'l'}
  {...rest}
>
  {@render children()}
</p>

<style>
  .base,
  p {
    font-weight: var(--cui-font-weight-regular);
  }
  .s {
    font-size: var(--cui-typography-body-s-font-size);
    line-height: var(--cui-typography-body-s-line-height);
  }
  .m {
    font-size: var(--cui-typography-body-m-font-size);
    line-height: var(--cui-typography-body-m-line-height);
  }
  .l {
    font-size: var(--cui-typography-body-l-font-size);
    line-height: var(--cui-typography-body-l-line-height);
  }

  .normal {
    color: var(--cui-fg-normal);
  }

  .subtle {
    color: var(--cui-fg-subtle);
  }

  .placeholder {
    color: var(--cui-fg-placeholder);
  }

  .accent {
    color: var(--cui-fg-accent);
  }

  .success {
    color: var(--cui-fg-success);
  }

  .warning {
    color: var(--cui-fg-warning);
  }

  .danger {
    color: var(--cui-fg-danger);
  }

  .promo {
    color: var(--cui-fg-promo);
  }
</style>
