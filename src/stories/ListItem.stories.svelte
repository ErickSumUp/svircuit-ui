<script lang="ts" module>
  import ListItem from '$lib/components/ListItem.svelte';
  import SumUpCard from '$lib/icons/SumUpCard.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import Body from '$lib/components/Body.svelte';
  import Stack from '$lib/components/Stack.svelte';
  import Confirm from '$lib/icons/Confirm.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

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
</script>

<Story name="Base">
  {#snippet children({ ...args }: Args<typeof Story>)}
    <ListItem {...args} onClick={() => console.log('clicked')}>
      {#snippet leading()}
        <SumUpCard />
      {/snippet}
      <Body>Mastercard **** 4494</Body>
      {#snippet details()}
        <div
          style="display: flex; flex-direction: row; align-items: center; gap: var(--cui-spacings-bit); "
        >
          <Confirm size="16" style="color: var(--cui-fg-success)" />
          <Body variant="highlight" size="two">Successful</Body>
          <Body size="two" variant="subtle">&middot; 17:21</Body>
        </div>
      {/snippet}
      {#snippet trailingLabel()}
        <Body variant="highlight">€24.00</Body>
      {/snippet}
      {#snippet trailingDetails()}
        <Body variant="subtle" size="two">€0.46 fee</Body>
      {/snippet}
    </ListItem>
  {/snippet}
</Story>

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
      {#snippet leading()}
        <SumUpCard />
      {/snippet}
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
    <ListItem>
      {#snippet leading()}
        <Badge variant="danger" circle={true}>3</Badge>
      {/snippet}
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
  </Stack>
</Story>

<Story name="WithCustomLabel">
  <Stack vertical>
    <ListItem variant="navigation">
      {#snippet leading()}
        <SumUpCard />
      {/snippet}
      <Body>Default truncated label: Kraftfahrzeug-Haftpflichtversicherung</Body>
    </ListItem>
    <ListItem variant="navigation">
      {#snippet leading()}
        <SumUpCard />
      {/snippet}
      <Body>Custom multiline label: Kraftfahrzeug-Haftpflichtversicherung</Body>
    </ListItem>
  </Stack>
</Story>

<Story name="WithDetails">
  <Stack vertical>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      {#snippet details()}
        <Body variant="subtle" size="two">17:21</Body>
      {/snippet}
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      {#snippet details()}
        <div
          style="display: flex; flex-direction: row; align-items: center; gap: var(--cui-spacings-bit); "
        >
          <Confirm size="16" style="color: var(--cui-fg-success)" />
          <Body variant="highlight" size="two">Successful</Body>
          <Body size="two" variant="subtle">&middot; 17:21</Body>
        </div>
      {/snippet}
    </ListItem>
  </Stack>
</Story>

<Story name="WithTrailingContent">
  <Stack vertical>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      {#snippet trailingLabel()}
        <Body variant="highlight">€24.00</Body>
      {/snippet}
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      {#snippet trailingLabel()}
        <Body variant="subtle" size="two">€24.00</Body>
      {/snippet}
      {#snippet trailingDetails()}
        <Body variant="subtle" size="two">€0.46 fee</Body>
      {/snippet}
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      {#snippet trailingLabel()}
        <Body variant="subtle" size="two"><s>€24.00</s></Body>
      {/snippet}
      {#snippet trailingDetails()}
        <Body variant="subtle" size="two"><s>€0.46 fee</s></Body>
      {/snippet}
    </ListItem>
    <ListItem variant="action">
      <Body>MasterCard •••• 4494</Body>
      {#snippet trailingComponent()}
        <Badge variant="promo">Promo</Badge>
      {/snippet}
    </ListItem>
  </Stack>
</Story>

<Story name="Interactive">
  <Stack vertical>
    <ListItem variant="action" onclick={() => console.log('clicked')}>
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
    <ListItem variant="navigation" href="https://sumup.com" target="_blank">
      <Body>MasterCard •••• 4494</Body>
    </ListItem>
  </Stack>
</Story>

<Story name="Selected">
  <ListItem variant="action" onclick={() => console.log('clicked')} selected>
    <Body>MasterCard •••• 4494</Body>
  </ListItem>
</Story>

<Story name="Disabled">
  <ListItem variant="action" disabled>
    <Body>MasterCard •••• 4494</Body>
  </ListItem>
</Story>
