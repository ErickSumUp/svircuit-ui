<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	import Headline from './Headline.svelte';

	export let Hst: Hst;
	let showModal = false;
</script>

<Hst.Story title="Components/Modal" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<Modal bind:showModal>
			<div style="margin-bottom: 24px;">
				<Headline as="h2" size="four">Hello World!</Headline>
			</div>
			<p>I am a modal</p>
		</Modal>
		<Button
			variant="secondary"
			on:click={() => {
				showModal = true;
			}}>Open modal</Button
		>
	</Hst.Variant>
</Hst.Story>
