<script lang="ts" module>
  import SelectorGroup from '$lib/stories/SelectorGroup.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/SelectorGroup',
    component: SelectorGroup,
    parameters: {
      layout: 'centered'
    },
    args: {
      label: 'Choose your favourite fruit',
      options: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Mango', value: 'mango' }
      ]
    }
  });

  type Args = ComponentProps<typeof SelectorGroup>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';

  let value = $state<string | string[]>('apple');
  let valueMultiple = $state<string | string[]>(['apple', 'mango']);
  let valueValidations = $state<string | string[]>();
  let valueDisabled = $state<string | string[]>('apple');
  let valuePartiallyDisabled = $state<string | string[]>('apple');
</script>

{#snippet cardReaderSolo()}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.3 4.8a.9.9 0 0 1 .9.9v12.6a.9.9 0 0 1-.9.9H5.7a.9.9 0 0 1-.9-.9V5.7a.9.9 0 0 1 .9-.9zm0-1.8H5.7A2.7 2.7 0 0 0 3 5.7v12.6A2.7 2.7 0 0 0 5.7 21h12.6a2.7 2.7 0 0 0 2.7-2.7V5.7A2.7 2.7 0 0 0 18.3 3m-.9 3.6H6.6v10.8h10.8z"
    />
  </svg>
{/snippet}

{#snippet cardReaderAir()}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.3 19v2H5.7v-2zm.7-.7V5.7a.7.7 0 0 0-.7-.7H5.7a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7v2l-.266-.014a2.7 2.7 0 0 1-1.445-.597l-.198-.18A2.7 2.7 0 0 1 3 18.299V5.7a2.7 2.7 0 0 1 .611-1.71l.18-.199a2.7 2.7 0 0 1 1.643-.777L5.7 3h12.6A2.7 2.7 0 0 1 21 5.7v12.6a2.7 2.7 0 0 1-2.7 2.7v-2a.7.7 0 0 0 .7-.7"
    />
    <path
      fill="currentColor"
      d="M17.5 7v3h-11V7zM6.5 13a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M10.5 13a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M14.5 13a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M6.5 16a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M10.5 16a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1M14.5 16a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1"
    />
  </svg>
{/snippet}

{#snippet phone()}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      fill="currentColor"
      d="M8.6 5.6A.6.6 0 0 0 8 5H5.6a.6.6 0 0 0-.6.6A13.4 13.4 0 0 0 18.4 19a.6.6 0 0 0 .6-.6V16a.6.6 0 0 0-.6-.6H16a.6.6 0 0 0-.48.24l-.005.006-.285.37.001.002a1.8 1.8 0 0 1-2.183.546q-.011-.007-.023-.012a12.2 12.2 0 0 1-5.57-5.563l-.002-.004a1.8 1.8 0 0 1-.134-1.203l.043-.15a1.8 1.8 0 0 1 .617-.866l.006-.005.375-.28A.6.6 0 0 0 8.6 8zm2 2.4a2.6 2.6 0 0 1-1.04 2.08l-.234.174a10.2 10.2 0 0 0 4.416 4.418l.183-.238A2.6 2.6 0 0 1 16 13.4h2.4A2.6 2.6 0 0 1 21 16v2.4a2.6 2.6 0 0 1-2.6 2.6A15.4 15.4 0 0 1 3 5.6 2.6 2.6 0 0 1 5.6 3H8a2.6 2.6 0 0 1 2.6 2.6z"
    />
  </svg>
{/snippet}

<Story name="Base" args={{ name: 'fruit' }}>
  {#snippet template(args: Args)}
    <SelectorGroup {...args} bind:value />
  {/snippet}
</Story>

<Story name="Multiple" args={{ name: 'multiple', label: 'Choose your favourite fruits' }}>
  {#snippet template(args: Args)}
    <SelectorGroup {...args} multiple bind:value={valueMultiple} />
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args: Args)}
    <Stack vertical>
      <SelectorGroup {...args} name="small" label="Small" size="s" />
      <SelectorGroup {...args} name="medium" label="Medium" size="m" />
      <SelectorGroup {...args} name="flexible" label="Flexible" size="flexible" />
    </Stack>
  {/snippet}
</Story>

<Story name="With descriptions">
  {#snippet template()}
    <SelectorGroup
      name="descriptions"
      label="Choose your favourite fruit"
      options={[
        { label: 'Apple', description: 'Braeburn, Granny Smith, or Jonagold', value: 'apple' },
        { label: 'Banana', description: 'Cavendish, Lakatan, or Tindok', value: 'banana' },
        { label: 'Mango', description: 'Alphonso, Dasheri, or Haden', value: 'mango' }
      ]}
    />
  {/snippet}
</Story>

<Story name="With icons">
  {#snippet template()}
    <SelectorGroup
      name="icons"
      label="Choose a device"
      options={[
        {
          icon: cardReaderSolo,
          label: 'SumUp Solo',
          value: 'solo',
          description: 'Accepts payments as a standalone device'
        },
        {
          icon: cardReaderAir,
          label: 'SumUp Air',
          value: 'air',
          description: 'Requires the free SumUp app to accept payments'
        },
        {
          icon: phone,
          label: 'Phone',
          value: 'phone',
          description: 'Accept payments using the free SumUp app'
        }
      ]}
    />
  {/snippet}
</Story>

<Story name="Validations" args={{ name: 'invalid', optionalLabel: 'Optional', required: true }}>
  {#snippet template(args: Args)}
    <SelectorGroup
      {...args}
      invalid={!valueValidations}
      validationHint={valueValidations ? undefined : 'Please choose an option.'}
      bind:value={valueValidations}
    />
  {/snippet}
</Story>

<Story name="Disabled" args={{ label: 'Select a fruit to order' }}>
  {#snippet template()}
    <Stack>
      <SelectorGroup
        name="fully-disabled"
        label="Fully disabled"
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Mango', value: 'mango' }
        ]}
        disabled
        bind:value={valueDisabled}
      />
      <SelectorGroup
        name="partially-disabled"
        label="Partially disabled"
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Mango', value: 'mango', disabled: true }
        ]}
        bind:value={valuePartiallyDisabled}
      />
    </Stack>
  {/snippet}
</Story>
