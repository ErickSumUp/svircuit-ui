<script lang="ts">
  import type { HTMLTdAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLTdAttributes {
    /**
     * Choose the alignment of the text in the cell.
     */
    align?: 'left' | 'center' | 'right';
    /**
     * Whether the cell should have a condensed style.
     */
    condensed?: boolean;
    /**
     * Whether the cell should wrap its content.
     */
    wrap?: boolean;
    children?: Snippet;
    [key: string]: unknown;
  }

  let { align = 'left', condensed = false, wrap = false, children, ...rest }: Props = $props();
</script>

<td
  class:align-left={align === 'left'}
  class:align-center={align === 'center'}
  class:align-right={align === 'right'}
  class:condensed
  class:wrap
  {...rest}
>
  {@render children?.()}
</td>

<style>
  td {
    text-align: left;
    border-bottom: 1px solid var(--cui-border-normal);
    padding: var(--cui-spacings-giga);
    transition: background-color var(--cui-transitions-default);
    vertical-align: middle;
    white-space: nowrap;
  }
  .align-left {
    text-align: left;
  }
  .align-center {
    text-align: center;
  }
  .align-right {
    text-align: right;
  }
  .condensed {
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega) var(--cui-spacings-kilo)
      var(--cui-spacings-giga);
    font-size: var(--cui-typography-body-m-font-size);
    line-height: var(--cui-typography-body-m-line-height);
  }
  .wrap {
    white-space: normal;
  }
</style>
