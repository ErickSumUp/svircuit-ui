<script lang="ts" module>
  import PercentageInput from '$lib/components/PercentageInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Forms/PercentageInput',
    component: PercentageInput,
    parameters: {
      layout: 'centered'
    },
    args: {
      label: 'Discount',
      placeholder: 0
    },
    argTypes: {
      size: { control: 'select', options: ['s', 'm'] },
      value: { control: 'number' }
    }
  });

  type Args = ComponentProps<typeof PercentageInput>;
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';
</script>

<Story name="Base" args={{ style: 'max-width: 250px' }} />

<Story name="Locales" args={{ decimalScale: 1 }}>
  {#snippet template(args: Args)}
    <Stack>
      <PercentageInput
        {...args}
        style="max-width: 250px"
        label="Percentage (de-DE)"
        formattingLocale="de-DE"
      />
      <PercentageInput
        {...args}
        style="max-width: 250px"
        label="Percentage (en-IE)"
        formattingLocale="en-IE"
      />
    </Stack>
  {/snippet}
</Story>

<Story name="Decimals" args={{ decimalScale: 2, style: 'max-width: 250px' }} />

<Story name="Sizes">
  {#snippet template(args: Args)}
    <Stack>
      <PercentageInput {...args} size="s" />
      <PercentageInput {...args} size="m" />
    </Stack>
  {/snippet}
</Story>
