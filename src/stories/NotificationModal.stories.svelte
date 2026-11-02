<script lang="ts" module>
  import NotificationModal from '$lib/components/NotificationModal.svelte';
  import Button from '$lib/components/Button.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import updateImage from './assets/illustration-update.svg';

  const { Story } = defineMeta({
    title: 'Notification/NotificationModal',
    component: NotificationModal,
    parameters: { layout: 'padded' },
    args: {
      image: { src: updateImage, alt: '' },
      headline: "It's time to update your browser",
      body: "You'll soon need a more up-to-date browser to continue using SumUp.",
      actions: {
        primary: { label: 'Update now', onclick: () => console.log('primary') },
        secondary: { label: 'Not now', onclick: () => console.log('secondary') }
      },
      closeButtonLabel: 'Close'
    }
  });
</script>

<script lang="ts">
  let open = $state(false);
  let destructiveOpen = $state(false);
</script>

<Story name="Base">
  {#snippet template(args)}
    <Button onclick={() => (open = true)}>Open modal</Button>
    <NotificationModal
      image={args.image}
      headline={args.headline}
      body={args.body}
      actions={args.actions}
      closeButtonLabel={args.closeButtonLabel}
      preventClose={args.preventClose}
      bind:open
    />
  {/snippet}
</Story>

<Story name="Destructive confirmation">
  {#snippet template()}
    <Button destructive onclick={() => (destructiveOpen = true)}>Delete account</Button>
    <NotificationModal
      bind:open={destructiveOpen}
      headline="Delete your account?"
      body="This permanently deletes your account and all of its data."
      actions={{
        primary: { label: 'Delete', destructive: true },
        secondary: { label: 'Cancel' }
      }}
      preventClose
    />
  {/snippet}
</Story>
