<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import SideNavigation from '$lib/SideNavigation.svelte';
	import Body from '$lib/Body.svelte';
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';

	export let Hst: Hst;

	let text = 'Hello World';
</script>

<Hst.Story title="Stories/SideNavigation" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<div style="margin: 10px;height: 500px">
			<SideNavigation>
				<ChevronLeft /><Body>xdddd</Body>
			</SideNavigation>
		</div>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={text} title="title" />
		<pre>{JSON.stringify({ text })}</pre>
	</svelte:fragment>
</Hst.Story>
