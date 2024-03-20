<script context="module">
	import Button from '$lib/Button.svelte';

	export const meta = {
		title: 'Button',
		component: Button,
		argTypes: {
			variant: {
				control: { type: 'radio', defaultValue: 'secondary' },
				options: ['primary', 'secondary', 'tertiary']
			},
			size: {
				control: { type: 'radio', defaultValue: 'm' },
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