<script context="module">
	import Modal from '$lib/components/Modal.svelte';

	export const meta = {
		title: 'Components/Modal',
		component: Modal,
		parameters: {
			layout: 'centered'
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/Button.svelte';
	import Headline from '$lib/components/Headline.svelte';
	import Body from '$lib/components/Body.svelte';

	let dialog: HTMLDialogElement;
</script>

<Story name="Base" let:args>
	<Modal bind:dialog {...args}>
		<Headline as="h2" size="four" style="margin-bottom: 1rem">
			Hello World!
		</Headline>
		<Body>I am a modal.</Body>
	</Modal>

	<Button on:click={() => dialog.showModal()}>Show Modal</Button>
</Story>
