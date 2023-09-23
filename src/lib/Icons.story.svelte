<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import Alert from '$lib/icons/Alert.svelte';
	import Close from '$lib/icons/Close.svelte';
	import Confirm from '$lib/icons/Confirm.svelte';
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import Info from '$lib/icons/Info.svelte';
	import Notify from '$lib/icons/Notify.svelte';
	export let Hst: Hst;

	let size: '16' | '24' = '16';
</script>

<Hst.Story title="Icons" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<Confirm {size} />
		<Alert {size} />
		<Confirm {size} />
		<ChevronLeft {size} />
		<ChevronRight {size} />
		<Close {size} />
		<Info {size} />
		<Notify {size} />
	</Hst.Variant>
	<Hst.Variant title="Confirm">
		<Confirm {size} />
	</Hst.Variant>
	<Hst.Variant title="Alert">
		<Alert {size} />
	</Hst.Variant>
	<Hst.Variant title="Info">
		<Info {size} />
	</Hst.Variant>
	<Hst.Variant title="Notify">
		<Notify {size} />
	</Hst.Variant>
	<Hst.Variant title="ChevronLeft">
		<ChevronLeft {size} />
	</Hst.Variant>
	<Hst.Variant title="ChevronRight">
		<ChevronRight {size} />
	</Hst.Variant>
	<Hst.Variant title="Close">
		<Close {size} />
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Select bind:value={size} options={['16', '24']} title="size" />
		<pre>{JSON.stringify({ size })}</pre>
	</svelte:fragment>
</Hst.Story>
