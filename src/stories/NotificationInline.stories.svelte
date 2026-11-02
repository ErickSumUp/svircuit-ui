<script lang="ts" module>
  import NotificationInline from '$lib/components/NotificationInline.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Notification/NotificationInline',
    component: NotificationInline,
    args: {
      body: 'You successfully updated your data.',
      variant: 'info'
    },
    argTypes: {
      variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] }
    }
  });

  const variants = ['info', 'success', 'warning', 'danger'] as const;
</script>

<script lang="ts">
  let isVisible = $state(true);
</script>

<Story name="Base" />

<Story name="Variants" args={{ body: 'This is an inline message' }}>
  {#snippet template(args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      {#each variants as variant (variant)}
        <NotificationInline {...args} {variant} />
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Dismissable">
  {#snippet template(args)}
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <NotificationInline
        {...args}
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

<Story
  name="With headline and action"
  args={{
    headline: 'Information',
    action: { label: 'Click here', onclick: () => alert('Action clicked') }
  }}
/>
