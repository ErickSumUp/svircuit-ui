<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Body from '$lib/Body.svelte';

	export let Hst: Hst;
	let size: 'one' | 'two' = 'one';
	let variant: 'alert' | 'highlight' | 'quote' | 'confirm' | 'subtle' = 'p';
	let as: string = 'p';
</script>

<Hst.Story layout={{ type: 'grid', width: '100%' }} title="Typography/Body">
	<Hst.Variant title="Default">
		<Body {size} {variant} {as}
			>An electronic circuit is composed of individual electronic components, such as resistors,
			transistors, capacitors, inductors and diodes, connected by conductive wires or traces through
			which electric current can flow.
		</Body>
	</Hst.Variant>
	<Hst.Variant title="Component variations">
		<Body size="one"
			>This is a body one. An electronic circuit is composed of individual electronic components,
			such as resistors, transistors, capacitors, inductors and diodes, connected by conductive
			wires or traces through which electric current can flow.</Body
		>
		---
		<Body size="two"
			>This is a body two. An electronic circuit is composed of individual electronic components,
			such as resistors, transistors, capacitors, inductors and diodes, connected by conductive
			wires or traces through which electric current can flow.</Body
		>
	</Hst.Variant>
	<Hst.Variant title="Variants">
		<Body>This is a default body</Body>
		<Body variant="highlight">This is a highlight body</Body>
		<Body variant="quote">This is a quote body</Body>
		<Body variant="confirm">This is a confirm body</Body>
		<Body variant="alert">This is a alert body</Body>
		<Body variant="subtle">This is a subtle body</Body>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Select bind:value={size} options={['one', 'two']} title="size" />
		<Hst.Select
			bind:value={variant}
			options={['p', 'alert', 'highlight', 'quote', 'confirm', 'subtle']}
			title="variant"
		/>
		<Hst.Text bind:value={as} title="as" />
		<pre>{JSON.stringify({ size })}</pre>
	</svelte:fragment>
</Hst.Story>
