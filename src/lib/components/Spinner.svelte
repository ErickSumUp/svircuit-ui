<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /**
     * Choose from 3 sizes. Default: `m`.
     */
    size?:
      | 's'
      | 'm'
      | 'l'
      /**
       * @deprecated Use `s` instead.
       */
      | 'byte'
      /**
       * @deprecated Use `m` instead.
       */
      | 'kilo'
      /**
       * @deprecated Use `l` instead.
       */
      | 'giga';
    [key: string]: unknown;
  }

  let { size = 'm', ...rest }: Props = $props();

  const legacySizeMap: Record<string, string> = { byte: 's', kilo: 'm', giga: 'l' };

  const spinnerSize = $derived(legacySizeMap[size] ?? size);
</script>

<span class={['base', spinnerSize]} {...rest}></span>

<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .base {
    display: block;
    border: var(--cui-border-width-mega) solid currentColor;
    border-top-color: transparent;
    border-radius: var(--cui-border-radius-circle);
    transform-origin: 50% 50%;
    animation: spin 1s infinite linear;
  }

  .s {
    width: var(--cui-icon-sizes-m);
    height: var(--cui-icon-sizes-m);
  }

  .m {
    width: var(--cui-icon-sizes-l);
    height: var(--cui-icon-sizes-l);
  }

  .l {
    width: var(--cui-icon-sizes-xl);
    height: var(--cui-icon-sizes-xl);
  }
</style>
