<script lang="ts" module>
  import Headline from '$lib/components/Headline.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Body from '$lib/components/Body.svelte';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/Headline',
    component: Headline,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: {
        control: {
          type: 'text'
        }
      }
    }
  });

  type Args = ComponentProps<typeof Headline>;
</script>

<Story name="Base" args={{ as: 'h2', size: 'm' }}>
  {#snippet template({ children, ...args }: Args)}
    <Headline {...args}>{children || 'This is a headline'}</Headline>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    {#each ['l', 'm', 's'] as const as size (size)}
      <Headline as="h2" {size}>This is size {size}</Headline>
    {/each}
  {/snippet}
</Story>

<Story name="SectionNoHeadline">
  {#snippet template()}
    <section>
      <Body>This is a body</Body>
    </section>
  {/snippet}
</Story>

<Story name="HeadlineNoSection">
  {#snippet template()}
    <Headline as="h2">This is a headline</Headline>
    <Body>This is a body</Body>
    <Body color="accent">This is a highlighted body that can be used also</Body>
  {/snippet}
</Story>
