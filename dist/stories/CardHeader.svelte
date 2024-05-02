<script>
  import Close from '../icons/Close.svelte';
  import Button from '../components/Button.svelte';
  export let showCloseButton = false;
</script>

<div class="base" {...$$restProps}>
  <slot />
  {#if showCloseButton}
    <div class="close">
      <Button on:click size="m" variant="tertiary" hideLabel={true}>
        <Close size="24" slot="leading-icon" />
        Close
      </Button>
    </div>
  {/if}
</div>

<style>
  .base {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--cui-spacings-giga);
  }
  .base .close {
    margin-top: calc(-1 * var(--cui-spacings-byte));
    margin-right: calc(-1 * var(--cui-spacings-mega));
    margin-bottom: calc(-1 * var(--cui-spacings-byte));
    padding-right: calc(-1 * var(--cui-spacings-mega));
  }
</style>
