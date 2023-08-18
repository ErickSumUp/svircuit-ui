<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Input from '$lib/Input.svelte';

	export let Hst: Hst;

	let text = 'Badge';
	let disabled = false;
	let label = 'First name';
	let placeholder = 'Jane';
	let prefix = '';
	let suffix = '';
	let hasWarning = false;
	let showValid = false;
	let invalid = false;
	let textAlignRight = false;
	let readonly = false;
	let validationMessage = 'Maximum 100 characters';
	let value: number | string = 'Jane';
	let maxlength = 100;
	let type = 'text';

	let valueNumber: number | string = 1001;
</script>

<Hst.Story title="Components/Input" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<Input
			{label}
			{disabled}
			{placeholder}
			{showValid}
			{hasWarning}
			{invalid}
			{textAlignRight}
			{readonly}
			{prefix}
			{suffix}
			{validationMessage}
			{maxlength}
			{type}
			bind:value
		/>
		<br/>
		<span>Value read: {value}</span>
	</Hst.Variant>
	<Hst.Variant title="Number" >
		<Input
				type="number"
				bind:value={valueNumber}
		/>
		<br/>
		<span>Value read: {valueNumber}</span>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={label} title="Label" />
		<Hst.Select bind:value={type} options={['text', 'number']} title="Type" />
		<Hst.Checkbox bind:value={disabled} title="Disabled" />
		<Hst.Checkbox bind:value={showValid} title="Show valid" />
		<Hst.Checkbox bind:value={hasWarning} title="Has warning" />
		<Hst.Checkbox bind:value={invalid} title="Invalid" />
		<Hst.Checkbox bind:value={textAlignRight} title="Text align right" />
		<Hst.Checkbox bind:value={readonly} title="Readonly" />
		<Hst.Text bind:value={placeholder} title="Placeholder" />
		<Hst.Text bind:value={prefix} title="Prefix" />
		<Hst.Text bind:value={suffix} title="Suffix" />
		<Hst.Text bind:value={validationMessage} title="Validation message" />
		<Hst.Number bind:value={maxlength} title="Max Length" />
		<pre>{JSON.stringify({ text, disabled })}</pre>
	</svelte:fragment>
</Hst.Story>
