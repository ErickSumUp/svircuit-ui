<script lang="ts" module>
  import Toggletip from '$lib/components/Toggletip.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Toggletip',
    component: Toggletip,
    parameters: {
      layout: 'centered'
    }
  });

  type Args = ComponentProps<typeof Toggletip>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';
  import Info from '$lib/icons/Info.svelte';
  import ArrowSlanted from '$lib/icons/ArrowSlanted.svelte';

  const headline = 'What is a chargeback?';
  const body =
    'A chargeback is a return of money to a payer of a transaction, especially a credit card transaction.';
</script>

{#snippet arrowIcon()}
  <ArrowSlanted size="16" />
{/snippet}

{#snippet infoTrigger(attrs: Record<string, unknown>)}
  <button {...attrs} class="trigger-button" type="button">
    <Info size="16" />
    <span class="hide-visually">View details</span>
  </button>
{/snippet}

<Story
  name="Base"
  args={{
    headline,
    body,
    action: { label: 'Learn more', href: 'https://help.sumup.com', target: '_blank' },
    offset: 8
  }}
>
  {#snippet template(args: Args)}
    <div class="wrapper">
      Chargeback
      <Toggletip {...args} action={{ ...args.action!, icon: arrowIcon }} trigger={infoTrigger} />
    </div>
  {/snippet}
</Story>

<Story name="Placements">
  {#snippet template()}
    <Stack>
      <Toggletip {headline} {body} offset={8} placement="left" trigger={infoTrigger} />
      <Toggletip {headline} {body} offset={8} placement="bottom-start" trigger={infoTrigger} />
      <Toggletip {headline} {body} offset={8} placement="right-end" trigger={infoTrigger} />
    </Stack>
  {/snippet}
</Story>

<Story name="WithoutHeadline">
  {#snippet template()}
    <div class="wrapper">
      Chargeback
      <Toggletip {body} trigger={infoTrigger} />
    </div>
  {/snippet}
</Story>

<Story name="WithAction">
  {#snippet template()}
    <div class="wrapper">
      Chargeback
      <Toggletip
        {headline}
        {body}
        action={{
          label: 'Learn more',
          href: 'https://help.sumup.com',
          target: '_blank',
          icon: arrowIcon
        }}
        trigger={infoTrigger}
      />
    </div>
  {/snippet}
</Story>

<style>
  .wrapper {
    display: flex;
    gap: var(--cui-spacings-bit);
    align-items: center;
  }

  /* A tertiary icon button, standing in for the Button component so that the
     story shows what a trigger should look like. */
  .trigger-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--cui-spacings-bit);
    color: var(--cui-fg-accent);
    cursor: pointer;
    background: none;
    border: none;
    border-radius: var(--cui-border-radius-byte);
  }

  .hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: rect(0 0 0 0);
  }
</style>
