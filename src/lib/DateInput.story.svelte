<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import DateInput from '$lib/DateInput.svelte';

	export let Hst: Hst;

	let text = 'Badge';
	let disabled = false;
	let label = 'Date of birth';
	let validationMessage = 'You must be at least 18 years old';
	let value = '2023-05-24';
</script>

<Hst.Story title="Components/DateInput" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<DateInput {label} {disabled} {validationMessage} bind:value />
		<span>{value}</span>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={label} title="Label" />
		<Hst.Checkbox bind:value={disabled} title="Disabled" />
		<Hst.Text bind:value={validationMessage} title="Validation message" />
		<pre>{JSON.stringify({ text, disabled, value })}</pre>
	</svelte:fragment>
</Hst.Story>
