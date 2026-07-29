<script lang="ts" module>
  import ListItemGroup, { type Item } from '$lib/stories/ListItemGroup.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/ListItemGroup',
    component: ListItemGroup,
    argTypes: {
      variant: { control: { type: 'radio' }, options: ['inset', 'plain'] },
      hideLabel: { control: { type: 'boolean' } }
    },
    parameters: {
      layout: 'centered'
    }
  });

  const items: Item[] = [
    { key: 1, children: labelOne },
    { key: 2, children: labelTwo },
    { key: 3, children: labelThree }
  ];

  const navigationItems: Item[] = items.map((item) => ({
    ...item,
    variant: 'navigation' as const,
    onclick: () => console.log('clicked')
  }));
</script>

{#snippet labelOne()}Mastercard •••• 4494{/snippet}
{#snippet labelTwo()}Visa •••• 7621{/snippet}
{#snippet labelThree()}American Express •••• 1005{/snippet}

<Story
  name="Base"
  args={{ label: 'Payment methods', details: '3 cards', items }}
  parameters={{ layout: 'padded' }}
>
  {#snippet template(args)}
    <ListItemGroup {...args} />
  {/snippet}
</Story>

<Story name="Variants" parameters={{ layout: 'padded' }}>
  {#snippet template()}
    <div style="display: grid; gap: 2rem;">
      <ListItemGroup variant="inset" label="Inset (default)" {items} />
      <ListItemGroup variant="plain" label="Plain" {items} />
    </div>
  {/snippet}
</Story>

<Story name="Interactive" parameters={{ layout: 'padded' }}>
  {#snippet template()}
    <ListItemGroup label="Choose a card" items={navigationItems} />
  {/snippet}
</Story>

<Story name="Selected" parameters={{ layout: 'padded' }}>
  {#snippet template()}
    <ListItemGroup
      label="Choose a card"
      items={navigationItems.map((item, index) => ({ ...item, selected: index === 1 }))}
    />
  {/snippet}
</Story>

<Story name="HiddenLabel" parameters={{ layout: 'padded' }}>
  {#snippet template()}
    <ListItemGroup label="Payment methods" hideLabel {items} />
  {/snippet}
</Story>
