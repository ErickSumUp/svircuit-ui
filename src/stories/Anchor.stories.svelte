<script context="module" lang="ts">
  import Anchor from '$lib/components/Anchor.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Typography/Anchor',
    component: Anchor,
    parameters: {
      layout: 'centered'
    }
  });
</script>

<Story
  name="Base"
  args={{
    children: "View SumUp's OSS projects",
    variant: '',
    size: 'one',
    href: 'https://opensource.sumup.com'
  }}
>
  {#snippet children({ ...args }: Args<typeof Story>)}
    <Anchor href={args.href} variant={args.variant} size={args.size}>{args.children}</Anchor>
  {/snippet}
</Story>
