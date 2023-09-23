<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import NotificationToast from '$lib/NotificationToast.svelte';
	import Info from '$lib/icons/Info.svelte';

	export let Hst: Hst;

	let variant: 'info' | 'success' | 'warning' | 'danger' = 'info';
	let headline = '';
	let body = 'This is a toast message.';
</script>

<Hst.Story title="Components/Notification Toast" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<NotificationToast {variant} {headline} {body} />
	</Hst.Variant>
	<Hst.Variant title="Toast variants">
		<div style='display: flex; flex-direction: column; gap: 2rem'>
			<NotificationToast variant="info" body="This is an info toast" />
			<NotificationToast variant="success" body="This is a success toast" />
			<NotificationToast variant="warning" body="This is a warning toast" />
			<NotificationToast variant="danger" body="This is a danger toast" />
		</div>
	</Hst.Variant>
	<Hst.Variant title="With headline">
		<NotificationToast variant="info" headline="Information" body="You successfully updated your data." />
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Text bind:value={headline} title="Headline" />
		<Hst.Text bind:value={body} title="Body" />
		<Hst.Select
			bind:value={variant}
			title="Variant"
			options={['info', 'success', 'warning', 'danger']}
		/>
		<pre>{JSON.stringify({ variant })}</pre>
	</svelte:fragment>
</Hst.Story>
