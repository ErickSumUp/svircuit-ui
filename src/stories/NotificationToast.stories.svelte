<script context="module">
  import NotificationToast, { toasts, addToast } from '$lib/components/NotificationToast.svelte';
  import { flip } from 'svelte/animate';

  export const meta = {
    title: 'Stories/NotificationToast',
    component: NotificationToast,
    argTypes: {
      label: {
        control: { type: 'text', defaultValue: 'NotificationToast' }
      }
    },
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Stack from '$lib/stories/Stack.svelte';
	import Button from '$lib/components/Button.svelte';

</script>

<Story name="Base" let:args>
  <section class="toast-notifications">
    {#each $toasts as toast (toast.id)}
      <div animate:flip={{ duration: 300 }}>
        <NotificationToast variant={toast.variant} headline={toast.headline} body={toast.body} />
      </div>
    {/each}
  </section>

  <Button on:click={() => addToast({ variant: 'info', body: 'This is a toast message' })}
    >Open toast</Button
  >
</Story>

<Story name="Variants">
  <Stack vertical>
    <NotificationToast variant="info" body="This is a toast message"></NotificationToast>
    <NotificationToast variant="success" body="This is a toast message"></NotificationToast>
    <NotificationToast variant="warning" body="This is a toast message"></NotificationToast>
    <NotificationToast variant="danger" body="This is a toast message"></NotificationToast>
  </Stack>
</Story>

<style>
  .toast-notifications {
    position: absolute;
    bottom: var(--cui-spacings-giga);
    z-index: var(--cui-z-index-toast);
    display: flex;
    gap: 1rem;
    flex-direction: column-reverse;
  }
</style>
