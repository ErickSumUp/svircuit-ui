<script lang="ts" module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NotificationToasts, {
    addToast,
    notification,
    type NotificationToast
  } from '$lib/components/NotificationToastsSection.svelte';
  import Button from '$lib/components/Button.svelte';
  import Stack from '$lib/components/Stack.svelte';

  const { Story } = defineMeta({
    title: 'Notification/NotificationToastsSection',
    argTypes: {
      variant: {
        control: 'select',
        options: ['info', 'success', 'warning', 'danger']
      },
      headline: {
        control: 'text',
        defaultValue: ''
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<Story
  name="Base"
  args={{
    variant: 'info',
    body: 'Message',
    headline: '',
    timeout: 6000,
    dismissible: false
  }}
>
  {#snippet template(args: NotificationToast)}
    <NotificationToasts />
    <Button onclick={() => addToast(args)}>Open toast</Button>
  {/snippet}
</Story>

<Story name="Variants">
  {#snippet template()}
    <Stack vertical>
      {@render notification({ id: 1, body: 'This is a toast message', variant: 'info' })}
      {@render notification({ id: 2, body: 'This is a toast message', variant: 'success' })}
      {@render notification({ id: 3, body: 'This is a toast message', variant: 'warning' })}
      {@render notification({ id: 4, body: 'This is a toast message', variant: 'danger' })}
    </Stack>
  {/snippet}
</Story>
