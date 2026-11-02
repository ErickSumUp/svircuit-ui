<script lang="ts" module>
  import Callout from '$lib/components/Callout.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Notification/Callout',
    component: Callout,
    args: {
      body: 'Callout is a newly available component for static inline guidance or emphasis.',
      color: 'promo'
    },
    argTypes: {
      color: { control: 'select', options: ['confirm', 'neutral', 'notify', 'alert', 'promo'] }
    }
  });

  type Args = ComponentProps<typeof Callout>;
</script>

<script lang="ts">
  import Anchor from '$lib/components/Anchor.svelte';
</script>

{#snippet sparkles()}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5.602 19.198a.8.8 0 1 0-1.6 0 .8.8 0 0 0 1.6 0m5.55-10.277a2.8 2.8 0 0 1-2.231 2.231L4.437 12l4.484.848a2.8 2.8 0 0 1 2.231 2.231L12 19.562l.848-4.483a2.8 2.8 0 0 1 2.231-2.231L19.562 12l-4.483-.848a2.8 2.8 0 0 1-2.231-2.231L12 4.437zm8.926 2.981h.004zm-1.88-5.3v-.8h-.8a1 1 0 0 1 0-2h.8v-.8a1 1 0 0 1 2 0v.8h.8a1 1 0 0 1 0 2h-.8v.8a1 1 0 0 1-2 0M7.602 19.198a2.8 2.8 0 1 1-5.6 0 2.8 2.8 0 0 1 5.6 0M22 12a1.9 1.9 0 0 1-1.55 1.866l.001.001-5 .945a.8.8 0 0 0-.607.522l-.031.116-.946 5.001a1.9 1.9 0 0 1-3.734 0l-.945-5a.8.8 0 0 0-.522-.607l-.116-.031-5.001-.946a1.9 1.9 0 0 1 0-3.734l5-.945.117-.032a.8.8 0 0 0 .521-.606l.946-5.001a1.9 1.9 0 0 1 2.949-1.211l.132.1.123.112a1.9 1.9 0 0 1 .53.999l.945 5 .032.117a.8.8 0 0 0 .606.521l5.001.946A1.9 1.9 0 0 1 22 12"
    />
  </svg>
{/snippet}

{#snippet richContent()}
  <div id="callout-rich-content">
    Callouts can include <Anchor href="#callout-rich-content">links to related content</Anchor>.
  </div>
{/snippet}

<Story name="Base">
  {#snippet template(args: Args)}
    <Callout {...args} icon={sparkles} />
  {/snippet}
</Story>

<Story name="Colors" args={{ body: 'This is a callout message' }}>
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <Callout {...args} color="confirm" />
      <Callout {...args} color="neutral" />
      <Callout {...args} color="notify" />
      <Callout {...args} color="alert" />
      <Callout {...args} color="promo" />
    </div>
  {/snippet}
</Story>

<Story name="With rich content">
  {#snippet template(args: Args)}
    <Callout {...args} body={richContent} icon={sparkles} />
  {/snippet}
</Story>
