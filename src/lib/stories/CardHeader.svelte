<script lang="ts">
  import Close from '$lib/icons/Close.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    showCloseButton?: boolean;
  }

  let { showCloseButton = false, children, ...rest }: Props = $props();
</script>

{#snippet closeButton()}
	<Close size="24" />
{/snippet}

<div class="base" {...rest}>
  {@render children()}
  {#if showCloseButton}
    <div class="close">
      <Button onclick size="m" variant="tertiary" leading_icon={closeButton} hideLabel>
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
