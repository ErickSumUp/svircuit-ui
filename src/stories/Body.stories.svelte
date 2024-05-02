<script context="module">
  import Body from '$lib/components/Body.svelte';

  export const meta = {
    title: 'Typography/Body',
    component: Body,
    argTypes: {
      variant: {
        control: { type: 'radio', defaultValue: 'p' },
        options: ['alert', 'highlight', 'quote', 'confirm', 'subtle', 'p']
      },
      size: {
        control: { type: 'radio', defaultValue: 'one' },
        options: ['one', 'two']
      }
    },
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';

  export let content =
    'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';
</script>

<Story name="Base" let:args>
  <Body {...args}>{args.slot || content}</Body>
</Story>

<Story name="Variants">
  <Body variant="highlight">This is a highlight body</Body>
  <Body variant="quote">This is a quote body</Body>
  <Body variant="confirm">This is a confirm body</Body>
  <Body variant="alert">This is an alert body</Body>
  <Body variant="subtle">This is a subtle body</Body>
  <Body variant="p">This is a paragraph body</Body>
</Story>

<Story name="Sizes">
  <Body size="one"
    >This is a body one. An electronic circuit is composed of individual electronic components, such
    as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or
    traces through which electric current can flow.</Body
  >
  <Body size="two"
    >This is a body two. An electronic circuit is composed of individual electronic components, such
    as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or
    traces through which electric current can flow.</Body
  >
</Story>
