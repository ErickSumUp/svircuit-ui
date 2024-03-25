<script context="module">
	import Button from '$lib/Button.svelte';

	export const meta = {
		title: 'Components/Button',
		component: Button,
		argTypes: {
			variant: {
				options: ['primary', 'secondary', 'tertiary']
			},
			size: {
				options: ['s', 'm']
			}
		},
		parameters: {
			layout: 'centered'
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import ArrowSlanted from '$lib/icons/ArrowSlanted.svelte';
	import Placeholder from '$lib/icons/Placeholder.svelte';
	import Shop from '$lib/icons/Shop.svelte';
	import Close from '$lib/icons/Close.svelte';
	import DownloadCloud from '$lib/icons/DownloadCloud.svelte';

	function handleClick() {
		alert('Hello!');
	}
</script>

<Story name="Base" let:args>
	<Button {...args} on:click={handleClick}>{args.slot || 'Say Hello!'}</Button>
</Story>

<Story name="Variants">
	<Button variant="primary">Primary</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="tertiary">Tertiary</Button>
</Story>

<Story name="Destructive">
	<Button variant="primary" destructive={true}>Primary</Button>
	<Button variant="secondary" destructive={true}>Secondary</Button>
	<Button variant="tertiary" destructive={true}>Tertiary</Button>
</Story>

<Story name="Sizes">
	<Button size="s">Small</Button>
	<Button size="m">Medium</Button>
</Story>

<Story name="WithIcons">
	<div style="display: flex; gap: 1rem;">
		<Button>
			<Placeholder slot="leading-icon" />
			Add to cart
		</Button>
		<Button size="m">
			<ArrowSlanted size="16" slot="trailing-icon" />
			Terms & Conditions
		</Button>
	</div>
</Story>

<Story name="ButtonGroup">
	<Button>Go elsewhere</Button>
	<Button variant="primary">Look again</Button>
</Story>

<Story name="OnlyIcons">
	<div style="display: flex; gap: 1rem; align-items: center">
		<Button size="s" hideLabel={true}>
			<Placeholder size="16" slot="leading-icon" />
			Circuit
		</Button>
		<Button size="m" variant="primary" hideLabel={true}>
			<DownloadCloud slot="leading-icon" />
			Download
		</Button>
		<Button size="m" variant="primary" destructive={true} hideLabel={true}>
			<Close size="24" slot="leading-icon" />
			Close
		</Button>
		<Button size="m" disabled={true} hideLabel={true}>
			<Shop size="24" slot="leading-icon" />
			Cart
		</Button>
		<Button size="m" variant="primary" isLoading={true} hideLabel={true}>
			<Placeholder size="24" slot="leading-icon" />
			Circuit
		</Button>
	</div>
</Story>
