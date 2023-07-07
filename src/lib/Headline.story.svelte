<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Headline from '$lib/Headline.svelte';

	export let Hst: Hst;
	let size: 'one' | 'two' | 'three' | 'four' = 'one';
	let as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
</script>

<Hst.Story layout={{ type: 'grid', width: '100%' }} title="Typography/Headline">
	<Hst.Variant title="Default">
		<Headline {as} {size}>This is a headline</Headline>
	</Hst.Variant>
	<Hst.Variant title="Variants">
		<Headline as="h1" size="one">This is a headline one</Headline>
		<Headline as="h2" size="two">This is a headline two</Headline>
		<Headline as="h3" size="three">This is a headline three</Headline>
		<Headline as="h4" size="four">This is a headline four</Headline>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Select bind:value={size} options={['one', 'two', 'three', 'four']} title="variant" />
		<Hst.Select bind:value={as} options={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']} title="as" />
		<pre>{JSON.stringify({ size })}</pre>
	</svelte:fragment>
</Hst.Story>
