<script lang="ts" module>
  import CurrencyInput from '$lib/components/CurrencyInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/CurrencyInput',
    component: CurrencyInput,
    parameters: {
      layout: 'centered'
    },
    args: {
      label: 'Amount',
      placeholder: 123.45,
      validationHint: 'Excluding VAT',
      currency: 'EUR',
      style: 'max-width: 250px'
    },
    argTypes: {
      size: { control: 'select', options: ['s', 'm'] },
      value: { control: 'number' }
    }
  });

  type Args = ComponentProps<typeof CurrencyInput>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';
</script>

<Story name="Base" />

<Story name="Currencies">
  {#snippet template(args: Args)}
    <Stack>
      <CurrencyInput
        {...args}
        label="Amount (pt-BR, BRL)"
        currency="BRL"
        formattingLocale="pt-BR"
      />
      <CurrencyInput
        {...args}
        label="Amount (pt-BR, EUR)"
        currency="EUR"
        formattingLocale="pt-BR"
      />
    </Stack>
  {/snippet}
</Story>

<Story name="Locales">
  {#snippet template(args: Args)}
    <Stack>
      <CurrencyInput
        {...args}
        label="Amount (de-DE, EUR)"
        currency="EUR"
        formattingLocale="de-DE"
      />
      <CurrencyInput
        {...args}
        label="Amount (en-IE, EUR)"
        currency="EUR"
        formattingLocale="en-IE"
      />
    </Stack>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args: Args)}
    <Stack>
      <CurrencyInput {...args} size="s" />
      <CurrencyInput {...args} size="m" />
    </Stack>
  {/snippet}
</Story>
