<script context="module">
  import Headline from '$lib/components/Headline.svelte';

  export const meta = {
    title: 'Typography/Headline',
    component: Headline,
    argTypes: {
      size: {
        control: { type: 'radio', defaultValue: 'one' },
        options: ['one', 'two', 'three', 'four']
      },
      as: {
        control: { type: 'radio', defaultValue: 'h1' },
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      }
    },
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import Body from '$lib/components/Body.svelte';

  export let as = 'h2';
</script>

<Story name="Base" let:args>
  <Headline {as} {...args}>{args.slot || 'This is a headline'}</Headline>
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
