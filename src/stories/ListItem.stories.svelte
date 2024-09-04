<script context="module" lang="ts">
  import ListItem from '$lib/components/ListItem.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/ListItem',
    component: ListItem,
    argTypes: {
      variant: {
        control: { type: 'radio', defaultValue: 'navigation' },
        options: ['action', 'navigation']
      },
      selected: {
        control: { type: 'boolean' }
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  import SumUpCard from '$lib/icons/SumUpCard.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Body from '$lib/components/Body.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import Confirm from '$lib/icons/Confirm.svelte';

  setTemplate(template);
</script>

{#snippet template({ ...args }: Args<typeof Story>)}
  <ListItem {...args} onClick={() => console.log('clicked')}>
    <SumUpCard slot="leading" />
    <Body>Mastercard **** 4494</Body>
    <div
      slot="details"
      style="display: flex; flex-direction: row; align-items: center; gap: var(--cui-spacings-bit); "
    >
      <Confirm size="16" style="color: var(--cui-fg-success)" />
      <Body variant="highlight" size="two">Successful</Body>
      <Body size="two" variant="subtle">&middot; 17:21</Body>
    </div>

    <Body slot="trailing-label" variant="highlight">€24.00</Body>
    <Body slot="trailing-details" variant="subtle" size="two">€0.46 fee</Body>
  </ListItem>
{/snippet}

<Story name="Base" />

<Story name="Variants">
  <Stack vertical>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
    <ListItem variant="navigation">
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
  </Stack>
</Story>

<Story name="WithLeadingContent">
  <Stack vertical>
    <ListItem variant="action">
      <SumUpCard slot="leading" />
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
    <ListItem>
      <Badge variant="danger" circle={true} slot="leading">3</Badge>
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
  </Stack>
</Story>

<Story name="WithCustomLabel">
  <Stack vertical>
    <ListItem variant="navigation">
      <SumUpCard slot="leading" />
      <Body>Default truncated label: Kraftfahrzeug-Haftpflichtversicherung</Body>
    </ListItem>
    <ListItem variant="navigation">
      <SumUpCard slot="leading" />
      <Body>Custom multiline label: Kraftfahrzeug-Haftpflichtversicherung</Body>
    </ListItem>
  </Stack>
</Story>

<Story name="WithDetails">
  <Stack vertical>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      <Body slot="details" variant="subtle" size="two">17:21</Body>
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      <div
        slot="details"
        style="display: flex; flex-direction: row; align-items: center; gap: var(--cui-spacings-bit); "
      >
        <Confirm size="16" style="color: var(--cui-fg-success)" />
        <Body variant="highlight" size="two">Successful</Body>
        <Body size="two" variant="subtle">&middot; 17:21</Body>
      </div>
    </ListItem>
  </Stack>
</Story>

<Story name="WithTrailingContent">
  <Stack vertical>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      <Body variant="highlight" slot="trailing-label">€24.00</Body>
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      <Body variant="highlight" slot="trailing-label">€24.00</Body>
      <Body variant="subtle" slot="trailing-details" size="two">€0.46 fee</Body>
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      <Body slot="trailing-label" variant="subtle" size="two"><s>€24.00</s></Body>
      <Body slot="trailing-details" variant="subtle" size="two"><s>€0.46 fee</s></Body>
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      <Badge slot="trailing-component" variant="promo">Promo</Badge>
    </ListItem>
  </Stack>
</Story>

<Story name="Interactive">
  <Stack vertical>
    <ListItem variant="action" onClick={() => console.log('clicked')}>
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
    <ListItem variant="navigation" href="https://sumup.com" target="_blank">
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
  </Stack>
</Story>

<Story name="Selected">
  <ListItem variant="action" onClick={() => console.log('clicked')} selected>
    <Body>MasterCard •••• 4494</Body>
  </ListItem>
</Story>

<Story name="Disabled">
  <ListItem variant="action" disabled aria-disabled="true">
    <Body>MasterCard •••• 4494</Body>
  </ListItem>
</Story>
