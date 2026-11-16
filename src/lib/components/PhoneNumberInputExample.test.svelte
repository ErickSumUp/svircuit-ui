<script lang="ts">
  import PhoneNumberInput, { type CountryCodeOption } from './PhoneNumberInput.svelte';

  interface Props {
    value?: string;
    onchange?: (value: string) => void;
  }

  let { value = $bindable(''), onchange }: Props = $props();

  const options: CountryCodeOption[] = [
    { country: 'CA', code: '+1' },
    { country: 'US', code: '+1' },
    { country: 'DE', code: '+49' }
  ];
</script>

<PhoneNumberInput
  label="Phone number"
  locale="en-GB"
  countryCode={{ label: 'Country code', options, defaultValue: 'CA' }}
  subscriberNumber={{ label: 'Subscriber number' }}
  bind:value
  {onchange}
/>
<output>{value || 'empty'}</output>
<button type="button" onclick={() => (value = '+4912345678')}>Set</button>
