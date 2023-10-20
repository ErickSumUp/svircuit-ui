<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Button from './Button.svelte';
	import Close from '$lib/icons/Close.svelte';
	import Plus from '$lib/icons/Plus.svelte';

	export let Hst: Hst;

	let text = 'Say hello';
	let variant: 'primary' | 'secondary' = 'secondary';
	let size: 'kilo' | 'giga' = 'giga';
	let disabled = false;
	let destructive = false;
</script>

<Hst.Story title="Components/Button" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Custom">
		<Button
			on:click={() => {
				alert('Hello!');
			}}
			{variant}
			{size}
			{disabled}
			{destructive}>{text}</Button
		>
	</Hst.Variant>
	<Hst.Variant title="Default">
		<Button>Default</Button>
	</Hst.Variant>
	<Hst.Variant title="Variants">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="tertiary">Tertiary</Button>
	</Hst.Variant>
	<Hst.Variant title="Destructive">
		<Button variant="primary" destructive>Primary</Button>
		<Button variant="secondary" destructive>Secondary</Button>
		<Button variant="tertiary" destructive>Tertiary</Button>
	</Hst.Variant>
	<Hst.Variant title="Sizes">
		<Button size="kilo" variant="secondary">Kilo</Button>
		<Button size="giga" variant="secondary">Giga</Button>
	</Hst.Variant>
	<Hst.Variant title="Circle button with icon">
		<Button circle={true} size="giga" variant="secondary">
			<Plus size="24" />
		</Button>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={text} title="Text" />
		<Hst.Select
			bind:value={variant}
			options={['primary', 'secondary', 'tertiary']}
			title="Variant"
		/>
		<Hst.Select bind:value={size} options={['kilo', 'giga']} title="Size" />
		<Hst.Checkbox bind:value={disabled} title="Disabled" />
		<Hst.Checkbox bind:value={destructive} title="Destructive" />
		<pre>{JSON.stringify({ text, variant, size, disabled, destructive }, null, 2)}</pre>
	</svelte:fragment>
</Hst.Story>
