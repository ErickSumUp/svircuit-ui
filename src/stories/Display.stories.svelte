<script lang="ts" module>
  import Display from '$lib/components/Display.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/Display',
    component: Display,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: { control: { type: 'text' } }
    }
  });

  type Args = ComponentProps<typeof Display>;
</script>

<Story name="Base" args={{ as: 'h2', size: 'm' }}>
  {#snippet template({ children, ...args }: Args)}
    <Display {...args}>{children || 'This is a Display'}</Display>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    {#each ['xl', 'l', 'm', 's'] as const as size (size)}
      <Display as="h2" {size}>This is size {size}</Display>
    {/each}
  {/snippet}
</Story>

<Story name="Weights">
  {#snippet template()}
    {#each ['black', 'bold'] as const as weight (weight)}
      <Display as="h2" {weight}>This is {weight}</Display>
    {/each}
  {/snippet}
</Story>
