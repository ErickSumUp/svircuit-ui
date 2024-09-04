<script context="module" lang="ts">
  import Headline from '$lib/components/Headline.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Typography/Headline',
    component: Headline,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      size: {
        control: {
          type: 'radio',
          defaultValue: 'one'
        },
        options: ['one', 'two', 'three', 'four']
      },
      as: {
        control: {
          type: 'radio',
          defaultValue: 'h1'
        },
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      },
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

  setTemplate(template);
</script>

{#snippet template({ children, ...args }: Args<typeof Story>)}
  <Headline {...args}>{children}</Headline>
{/snippet}

<Story name="Base" args={{ as: 'h1', size: 'one', children: 'This is a headline!' }} />

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
