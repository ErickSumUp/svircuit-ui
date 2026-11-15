<script lang="ts">
  import CurrencyInput from './CurrencyInput.svelte';

  let { value = $bindable() }: { value?: number } = $props();
</script>

<CurrencyInput label="Amount" currency="EUR" formattingLocale="de-DE" bind:value />
<output>{value ?? 'empty'}</output>
<button type="button" onclick={() => (value = 99.9)}>Set</button>
