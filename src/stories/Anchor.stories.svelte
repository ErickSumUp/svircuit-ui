<script context="module" lang="ts">
  import Anchor from '$lib/components/Anchor.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/Anchor',
    component: Anchor,
    parameters: {
      layout: 'centered'
    }
  });

  type Args = ComponentProps<typeof Anchor>;
</script>

<Story
  name="Base"
  args={{
    variant: '',
    size: 'one',
    href: 'https://opensource.sumup.com'
  }}
>
  {#snippet template({ children, ...args }: Args)}
    <Anchor {...args}>{children || `View SumUp's OSS projects`}</Anchor>
  {/snippet}
</Story>
