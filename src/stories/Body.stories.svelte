<script lang="ts" module>
  import Body from '$lib/components/Body.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Typography/Body',
    component: Body,
    argTypes: {
      children: { control: 'text', defaultValue: '' }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<Story name="Base">
  {#snippet children({ ...args }: Args<typeof Story>)}
    <Body {...args}><p>
        An <em>electronic</em> circuit <strong>is</strong> composed of <s>many</s> individual electronic
        components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive
        wires or traces through which electric current can flow
      </p>
    </Body>
  {/snippet}
</Story>

<Story name="Colors">
  <Body color="normal">This is a normal body</Body>
  <Body color="subtle">This is a subtle body</Body>
  <Body color="placeholder">This is a placeholder body</Body>
  <Body color="accent">This is an accent body</Body>
  <Body color="success">This is a success body</Body>
  <Body color="warning">This is a warning body</Body>
  <Body color="danger">This is a danger body</Body>
  <Body color="promo">This is a promo body</Body>
</Story>

<Story name="Sizes">
  <Body size="s"
    >This is a body small. An electronic circuit is composed of individual electronic components,
    such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires
    or traces through which electric current can flow.
  </Body>
  <Body size="m"
    >This is a body medium. An electronic circuit is composed of individual electronic components,
    such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires
    or traces through which electric current can flow.
  </Body>
  <Body size="l"
    >This is a body large. An electronic circuit is composed of individual electronic components,
    such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires
    or traces through which electric current can flow.
  </Body>
</Story>
