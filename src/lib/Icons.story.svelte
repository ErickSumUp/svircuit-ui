<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Alert from '$lib/icons/Alert.svelte';
	import Close from '$lib/icons/Close.svelte';
	import Confirm from '$lib/icons/Confirm.svelte';
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	export let Hst: Hst;

	let size: '16' | '24' = '16';
</script>

<Hst.Story title="Icons" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<Confirm {size} />
	</Hst.Variant>
	<Hst.Variant title="Alert">
		<Alert />
	</Hst.Variant>
	<Hst.Variant title="Confirm">
		<Confirm />
	</Hst.Variant>
	<Hst.Variant title="ChevronLeft">
		<ChevronLeft />
	</Hst.Variant>
	<Hst.Variant title="ChevronRight">
		<ChevronRight />
	</Hst.Variant>
	<Hst.Variant title="Close">
		<Close />
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Select bind:value={size} options={['16', '24']} title="size" />
		<pre>{JSON.stringify({ size })}</pre>
	</svelte:fragment>
</Hst.Story>
