<script lang="ts" module>
  import NotificationBanner from '$lib/components/NotificationBanner.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import updateImage from './assets/illustration-update.svg';

  const { Story } = defineMeta({
    title: 'Notification/NotificationBanner',
    component: NotificationBanner,
    parameters: { layout: 'padded' },
    args: {
      variant: 'system',
      headline: 'Software update',
      body: 'There is updated firmware available for your card reader. Please update to continue using your card reader.',
      action: { label: 'Update', onclick: () => alert('Action clicked') }
    },
    argTypes: {
      variant: { control: 'select', options: ['system', 'promotional'] }
    }
  });
</script>

<script lang="ts">
  let isVisible = $state(true);
</script>

<Story name="Base" args={{ image: { src: updateImage, alt: '', width: 160 } }} />

<Story
  name="Custom image"
  args={{
    action: { label: 'Update', variant: 'secondary', onclick: () => alert('Action clicked') },
    image: { src: updateImage, alt: '', width: 120 }
  }}
/>

<Story
  name="Dismissable"
  args={{
    variant: 'promotional',
    headline: 'Refer a friend, get rewarded',
    body: undefined,
    action: { label: 'Click here', variant: 'tertiary', onclick: () => alert('Action clicked') },
    image: { src: updateImage, alt: '', width: 120 }
  }}
>
  {#snippet template(args)}
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <NotificationBanner
        {...args}
        style="align-self: stretch;"
        {isVisible}
        onClose={() => (isVisible = false)}
        closeButtonLabel="Close notification"
      />
      {#if !isVisible}
        <button type="button" onclick={() => (isVisible = true)}>Show again</button>
      {/if}
    </div>
  {/snippet}
</Story>
