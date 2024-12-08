<script lang="ts" module>
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import NotificationToasts, {
    addToast,
    notification
  } from '$lib/components/NotificationToastsSection.svelte';
  import Button from '$lib/components/Button.svelte';
  import Stack from '$lib/components/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Notification/NotificationToastsSection',
    component: NotificationToasts,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  });
</script>

<Story
  name="Base"
  args={{
    variant: 'info',
    body: 'This is a toast message',
    timeout: 6000,
    dismissible: false
  }}
>
  {#snippet children({ ...args }: Args<typeof Story>)}
    <NotificationToasts />
    <Button onclick={() => addToast(args)}>Open toast</Button>
  {/snippet}
</Story>

<Story name="Variants">
  <Stack vertical>
    {@render notification({ body: 'This is a toast message', variant: 'info' })}
    {@render notification({ body: 'This is a toast message', variant: 'success' })}
    {@render notification({ body: 'This is a toast message', variant: 'warning' })}
    {@render notification({ body: 'This is a toast message', variant: 'danger' })}
  </Stack>
</Story>

<style>
</style>
