<script lang="ts" module>
  import List from '$lib/components/List.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/List',
    component: List,
    parameters: {
      layout: 'centered'
    }
  });

  type Args = ComponentProps<typeof List>;
</script>

{#snippet items()}
  <li>This is a list</li>
  <li>A very fine list</li>
{/snippet}

<Story name="Base">
  {#snippet template(args: Args)}
    <List {...args}>{@render items()}</List>
  {/snippet}
</Story>

<Story name="Variants">
  {#snippet template()}
    {#each ['unordered', 'ordered'] as const as variant (variant)}
      <List {variant}>{@render items()}</List>
    {/each}
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    {#each ['l', 'm', 's'] as const as size (size)}
      <List {size}>{@render items()}</List>
    {/each}
  {/snippet}
</Story>

<Story name="Nested">
  {#snippet template(args: Args)}
    <List {...args}>
      <li>
        This is a list
        <List {...args}>
          <li>Sometimes a nested list</li>
        </List>
      </li>
      <li>And the list goes on</li>
    </List>
  {/snippet}
</Story>
