<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import ProgressBar from '$lib/ProgressBar.svelte';

	export let Hst: Hst;

	let variant: 'primary' | 'secondary' = 'primary';
	let max = 10;
	let value = 7;
</script>

<Hst.Story layout={{ type: 'grid', width: '100%' }} title="Components/ProgressBar">
	<Hst.Variant title="Default">
		<ProgressBar {max} {value} {variant} />
	</Hst.Variant>
	<Hst.Variant title="Variants" />
	<Hst.Variant title="Circle" />
	<svelte:fragment slot="controls">
		<Hst.Number bind:value={max} max={100} min={0} step={1} title="Max" />
		<Hst.Number bind:value {max} min={0} step={1} title="Value" />
		<Hst.Select bind:value={variant} options={['primary', 'secondary']} title="Variant" />
		<pre>{JSON.stringify({ variant, max, value })}</pre>
	</svelte:fragment>
</Hst.Story>
