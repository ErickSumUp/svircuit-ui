<script lang="ts" module>
  import PhoneNumberInput, {
    type CountryCodeOption
  } from '$lib/components/PhoneNumberInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  type Args = ComponentProps<typeof PhoneNumberInput>;

  const options: CountryCodeOption[] = [
    { country: 'CA', code: '+1' },
    { country: 'US', code: '+1' },
    { country: 'DE', code: '+49' },
    { country: 'IT', code: '+39' }
  ];

  const { Story } = defineMeta({
    title: 'Forms/PhoneNumberInput',
    component: PhoneNumberInput,
    args: {
      label: 'Phone number',
      validationHint: 'Maximum 15 digits',
      countryCode: { label: 'Country code', defaultValue: 'CA', options },
      subscriberNumber: { label: 'Subscriber number', placeholder: '202 555 0132' }
    },
    argTypes: {
      size: { control: 'select', options: ['s', 'm'] },
      disabled: { control: 'boolean' }
    }
  });
</script>

{#snippet flag({ country }: { country: string | undefined })}
  {#if country}
    <img
      class="flag"
      src={`https://circuit.sumup.com/icons/v2/flag_${country.toLowerCase()}_480.svg`}
      alt=""
      width="16"
      height="12"
    />
  {/if}
{/snippet}

{#snippet withFlag(args: Args, overrides: Partial<Args> = {})}
  <PhoneNumberInput
    {...args}
    {...overrides}
    countryCode={{ ...args.countryCode, ...overrides.countryCode, prefix: flag }}
    subscriberNumber={{ ...args.subscriberNumber, ...overrides.subscriberNumber }}
  />
{/snippet}

<Story name="Base">
  {#snippet template(args)}
    {@render withFlag(args)}
  {/snippet}
</Story>

<Story name="Validations">
  {#snippet template(args)}
    <div class="stack">
      {@render withFlag(args, {
        required: true,
        validationHint: 'This is not valid',
        subscriberNumber: { ...args.subscriberNumber, invalid: true }
      })}
      {@render withFlag(args, {
        hasWarning: true,
        validationHint: 'This may include additional charges'
      })}
      {@render withFlag(args, {
        value: '+1202 555 0132',
        showValid: true,
        validationHint: 'This looks good'
      })}
    </div>
  {/snippet}
</Story>

<Story name="Readonly">
  {#snippet template(args)}
    {@render withFlag(args, { countryCode: { ...args.countryCode, readonly: true } })}
  {/snippet}
</Story>

<Story name="Optional">
  {#snippet template(args)}
    {@render withFlag(args, { required: false, optionalLabel: 'This field is optional' })}
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template(args)}
    {@render withFlag(args, { disabled: true })}
  {/snippet}
</Story>

<Story name="Without prefix">
  {#snippet template(args)}
    <PhoneNumberInput {...args} />
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template(args)}
    <div class="stack">
      {@render withFlag(args, { size: 's' })}
      {@render withFlag(args, { size: 'm' })}
    </div>
  {/snippet}
</Story>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--cui-spacings-mega);
  }

  .flag {
    display: block;
    border-radius: var(--cui-border-radius-bit);
  }
</style>
