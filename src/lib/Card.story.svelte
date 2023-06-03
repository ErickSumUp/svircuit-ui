<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Card from './Card.svelte';

	export let Hst: Hst;

	let spacing: 'mega' | 'giga' = 'giga';
</script>

<Hst.Story title="Components/Card" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<Card {spacing}>
			<div
				style="
                min-height: 120px;
                max-width: 90vw;
                max-height: 90vh;
                margin-bottom: 1rem;
            "
			>
				This is a card
			</div>
		</Card>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Select bind:value={spacing} title="spacing" options={['mega', 'giga']} />
		<pre>{JSON.stringify({ spacing })}</pre>
	</svelte:fragment>
</Hst.Story>
