<script context="module" lang="ts">
  import Anchor from '$lib/components/Anchor.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Typography/Anchor',
    component: Anchor,
    args: {
      children: "View SumUp's OSS projects",
      href: 'https://opensource.sumup.com/'
    },
    argTypes: {
      children: { control: 'text' },
      href: { control: 'text' },
      variant: {
        control: { type: 'inline-radio', defaultValue: 'neutral' },
        options: ['highlight', 'quote', '']
      },
      size: {
        control: { type: 'inline-radio', defaultValue: 'one' },
        options: ['one', 'two']
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template({ children, ...args }: Args<typeof Story>)}
  <Anchor href={args.href} {...args}>{children}</Anchor>
{/snippet}

<Story
  name="Base"
  args={{
    variant: '',
    href: 'https://opensource.sumup.com/',
    children: 'This is the text shown',
    size: 'one'
  }}
/>
