<script lang="ts" module>
  import Anchor from '$lib/components/Anchor.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/Anchor',
    component: Anchor,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      href: { control: 'text' },
      children: { control: 'text' }
    }
  });

  type Args = ComponentProps<typeof Anchor>;
</script>

<Story name="AsLink" args={{ href: 'https://opensource.sumup.com' }}>
  {#snippet template({ children, ...args }: Args)}
    <Anchor {...args}>{children || `View SumUp's OSS projects`}</Anchor>
  {/snippet}
</Story>

<Story name="AsButton" args={{ onclick: () => alert('Hello') }}>
  {#snippet template({ children, ...args }: Args)}
    <Anchor {...args}>{children || 'Say hello'}</Anchor>
  {/snippet}
</Story>

<Story
  name="ExternalLink"
  args={{
    href: 'https://opensource.sumup.com',
    target: '_blank',
    externalLabel: 'opens in a new tab'
  }}
>
  {#snippet template({ children, ...args }: Args)}
    <Anchor {...args}>{children || `View SumUp's OSS projects`}</Anchor>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    {#each ['l', 'm', 's'] as const as size (size)}
      <Anchor href="https://opensource.sumup.com" {size}>This is size {size}</Anchor>
    {/each}
  {/snippet}
</Story>
