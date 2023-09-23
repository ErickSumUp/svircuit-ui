<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import NotificationToast from '$lib/NotificationToast.svelte';
	import Info from '$lib/icons/Info.svelte';

	export let Hst: Hst;

	let variant: 'info' | 'success' | 'warning' | 'danger' = 'info';
	let headline = 'This is a headline';
	let body = 'This is a body';
</script>

<Hst.Story title="Components/Notification Toast" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Toast variants">
		<NotificationToast {variant} {headline} {body} />
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={headline} title="Headline" />
		<Hst.Text bind:value={body} title="Body" />
		<Hst.Select bind:value={variant} title="Variant" options={['info', 'success', 'warning', 'danger']} />
		<pre>{JSON.stringify({ variant })}</pre>
	</svelte:fragment>
</Hst.Story>
