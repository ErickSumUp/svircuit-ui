<script context="module">
	import Button from '$lib/Button.svelte';

	export const meta = {
		title: 'Button',
		component: Button,
		argTypes: {
			variant: {
				control: { type: 'radio', defaultValue: 'secondary' },
				options: ['primary', 'secondary', 'tertiary'],
			},
		},
		parameters: {
			layout: 'centered',
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	function handleClick() {
		alert('Hello!');
	}

</script>

<Story name="Base" let:args>
	<Button {...args} on:click={handleClick}>Say hello</Button>
</Story>

<Story name="Variants">
	<Button variant="primary">Primary</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="tertiary">Tertiary</Button>
</Story>

<Story name="Destructive">
	<div style="display: flex; justify-content: space-around">
		<Button variant="primary" destructive={true}>Primary</Button>
		<Button variant="secondary" destructive={true}>Secondary</Button>
		<Button variant="tertiary" destructive={true}>Tertiary</Button>
	</div>
</Story>

<Story name="Square" source args={{ rounded: false }} />

<!-- Dynamic snippet should be disabled for this story -->
<Story name="Button No Args">
	<Button>Label</Button>
</Story>
