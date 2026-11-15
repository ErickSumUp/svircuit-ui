<script lang="ts">
  import PercentageInput from './PercentageInput.svelte';

  let { value = $bindable() }: { value?: number } = $props();
</script>

<PercentageInput label="Discount" formattingLocale="de-DE" decimalScale={1} bind:value />
<output>{value ?? 'empty'}</output>
<button type="button" onclick={() => (value = 12.5)}>Set</button>
