<script lang="ts" module>
  import Headline from '$lib/components/Headline.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

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
</script>

<script lang="ts">
  import Body from '$lib/components/Body.svelte';
</script>

<Story name="Base" args={{ as: 'h1', size: 'one', children: 'This is a headline!' }}>
  {#snippet children({ ...args }: Args<typeof Story>)}
    <Headline {...args}>{args.children}</Headline>
  {/snippet}
</Story>

<Story name="Sizes">
  <Headline size="one">This is a headline one</Headline>
  <Headline size="two" as="h2">This is a headline two</Headline>
  <Headline size="three" as="h3">This is a headline three</Headline>
  <Headline size="four" as="h4">This is a headline four</Headline>
</Story>

<Story name="SectionNoHeadline">
  <section>
    <Body>This is a body</Body>
  </section>
</Story>

<Story name="HeadlineNoSection">
  <Headline>This is a headline</Headline>
  <Body>This is a body</Body>
  <Body variant="highlight">This is a highlighted body that can be used also</Body>
</Story>
