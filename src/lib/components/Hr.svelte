<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLHRElement> {
    /**
     * Render the rule using any HTML element. Default: `hr`.
     */
    as?: string;
    [key: string]: unknown;
  }

  let {
    as = 'hr',
    class: className,
    'aria-hidden': ariaHidden = 'true',
    ...rest
  }: Props = $props();
</script>

<svelte:element this={as} {...rest} class={['base', className]} aria-hidden={ariaHidden} />

<style>
  .base {
    display: block;
    width: 100%;
    margin-top: var(--cui-spacings-mega);
    margin-bottom: var(--cui-spacings-mega);
    border: 0;
    border-top: var(--cui-border-width-kilo) solid var(--cui-border-divider);
  }
</style>
