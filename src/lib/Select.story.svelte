<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Select from './Select.svelte';

	export let Hst: Hst;

	let text = 'Badge';
	let variant = 'neutral';
	let circle = false;
	let label = 'Countries';
	let selectedValue;
	let countries = [
		{ id: 1, text: `Germany` },
		{ id: 2, text: `United States` },
		{ id: 3, text: `France` }
	];
</script>

<Hst.Story title="Components/Select" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<div style="margin: 10px">
			<Select placeholder="Select a country" bind:selectedValue {label}>
				{#each countries as country}
					<option value={country.text}>
						{country.text}
					</option>
				{/each}
			</Select>
		</div>
		Option selected: id: {selectedValue}
	</Hst.Variant>
	<Hst.Variant title="Together">
		<div style="display: flex; margin: 10px;">
			<Select value={{ id: 0, text: 'MC' }}>
				<option value={{ id: 0, text: 'MC' }}>Merchant Code</option>
			</Select>
			<Select value={{ id: 0, text: 'c' }}>
				<option value={{ id: 0, text: 'c' }}>Countries</option>
			</Select>
			<Select value={{ id: 0, text: 'c' }}>
				<option value={{ id: 0, text: 'c' }}>Countries</option>
			</Select>
		</div>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={text} title="title" />
		<Hst.Text bind:value={label} title="label" />
		<Hst.Select
			bind:value={variant}
			title="variant"
			options={['neutral', 'confirm', 'notify', 'alert', 'promo']}
		/>
		<Hst.Checkbox bind:value={circle} title="Circle" />
		<pre>{JSON.stringify({ text, variant, circle, selected: value })}</pre>
	</svelte:fragment>
</Hst.Story>
