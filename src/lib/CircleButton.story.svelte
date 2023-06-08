<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import CircleButton from '$lib/CircleButton.svelte';

	export let Hst: Hst;

	let text = '1';
	let variant: 'primary' | 'tertiary' = 'primary';
</script>

<Hst.Story title="Components/CircleButton" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<CircleButton
			on:click={() => {
				alert('Hello!');
			}}
			{variant}>{text}</CircleButton
		>
	</Hst.Variant>
	<Hst.Variant title="Variants">
		<CircleButton variant="primary">Primary</CircleButton>
		<CircleButton variant="tertiary">Tertiary</CircleButton>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={text} title="Text" />
		<Hst.Select bind:value={variant} options={['primary', 'tertiary']} title="Variant" />
		<pre>{JSON.stringify({ text, variant }, null, 2)}</pre>
	</svelte:fragment>
</Hst.Story>
