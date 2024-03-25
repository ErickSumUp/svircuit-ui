<script context="module">
	import Badge from '$lib/Badge.svelte';

	export const meta = {
		title: 'Components/Badge',
		component: Badge,
		argTypes: {
			variant: {
				control: { type: 'radio', defaultValue: 'neutral' },
				options: ['neutral', 'success', 'warning', 'danger', 'promo']
			}
		},
		parameters: {
			layout: 'centered'
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Base" let:args>
	<Badge {...args}>{args.slot || 'Badge'}</Badge>
</Story>

<Story name="Variants">
	<div style="display: flex; gap: 1rem;">
		<Badge variant="neutral">Neutral</Badge>
		<Badge variant="success">Success</Badge>
		<Badge variant="warning">Warning</Badge>
		<Badge variant="danger">Danger</Badge>
		<Badge variant="promo">Promo</Badge>
	</div>
</Story>

<Story name="Circular">
	<div style="display: flex; gap: 1rem;">
		<Badge variant="neutral" circle={true}>1</Badge>
		<Badge variant="neutral" circle={true}>42</Badge>
		<Badge variant="neutral" circle={true}>999</Badge>
	</div>
</Story>
