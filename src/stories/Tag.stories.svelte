<script lang="ts" module>
  import Tag from '$lib/components/Tag.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';
  import Checkmark from '$lib/icons/Checkmark.svelte';

  const { Story } = defineMeta({
    title: 'Components/Tag',
    component: Tag,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: {
        control: { type: 'text', defaultValue: 'Transactions' }
      }
    }
  });

  type Args = ComponentProps<typeof Tag>;
</script>

<Story name="Base" args={{}}>
  {#snippet template({ children, ...args }: Args)}
    <Tag {...args}>{children || 'Transactions'}</Tag>
  {/snippet}
</Story>

<Story name="Selected">
  {#snippet template()}
    <Tag selected>Transactions</Tag>
  {/snippet}
</Story>

<Story name="WithPrefix">
  {#snippet template()}
    <Tag>
      {#snippet prefix()}
        <Checkmark size={24} />
      {/snippet}
      Transactions
    </Tag>
  {/snippet}
</Story>

<Story name="WithSuffix">
  {#snippet template()}
    <Tag>
      Transactions
      {#snippet suffix()}
        <Checkmark size={24} />
      {/snippet}
    </Tag>
  {/snippet}
</Story>

<Story name="Interactive">
  {#snippet template()}
    <Tag onclick={() => alert('Tag clicked')}>Transactions</Tag>
  {/snippet}
</Story>

<Story name="Removable">
  {#snippet template()}
    <Tag selected onRemove={() => alert('Tag removed')} removeButtonLabel="remove">Transactions</Tag
    >
  {/snippet}
</Story>
