<script lang="ts">
  import type { HTMLThAttributes } from 'svelte/elements';

	let fixed = true;

  interface Props extends HTMLThAttributes {
    /**
     * Aligns the text in the header cell.
     */
    align?: 'left' | 'right' | 'center';
    /**
     * Condenses the header cell.
     */
    condensed?: boolean;
  }

  let { align = 'left', condensed = false, children, ...rest }: Props = $props();
</script>

<th
  class:fixed
  class:align-left={align === 'left'}
  class:align-right={align === 'right'}
  class:align-center={align === 'center'}
  class:condensed
  {...rest}
>
  {@render children()}
</th>

<style>
  th {
    background-color: var(--cui-bg-normal);
    border-bottom: 1px solid var(--cui-border-normal);
    text-align: left;
    transition:
      background-color var(--cui-transitions-default),
      color var(--cui-transitions-default);
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
    color: var(--cui-fg-subtle);
    font-weight: var(--cui-font-weight-bold);
    padding: var(--cui-spacings-byte) var(--cui-spacings-giga);
    vertical-align: middle;
    white-space: nowrap;
  }
  @media (max-width: 767px) {
    th {
      left: 0;
      position: sticky;
      width: 145px;
      overflow-wrap: break-word;
      z-index: 1;
    }
    th:after {
      content: '';
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.12), rgba(255, 255, 255, 0));
      height: 100%;
      position: absolute;
      top: 0;
      left: 100%;
      width: 6px;
    }
  }
  .align-left {
    text-align: left;
  }
  .align-right {
    text-align: right;
  }
  .align-center {
    text-align: center;
  }
  .condensed {
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
    vertical-align: middle;
    padding: var(--cui-spacings-byte) var(--cui-spacings-mega) var(--cui-spacings-byte)
      var(--cui-spacings-giga);
  }
</style>
