<script context="module">
	import Anchor from '$lib/Anchor.svelte';

	export const meta = {
		title: 'Typography/Anchor',
		component: Anchor,
		argTypes: {
			variant: {
				control: { type: 'radio', defaultValue: 'neutral' },
				options: ['highlight', 'quote', '']
			},
			size: {
				control: { type: 'radio', defaultValue: 'one' },
				options: ['one', 'two']
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
	<Anchor href={args.href || 'https://opensource.sumup.com/'} {...args}>{args.slot || "View SumUp's OSS projects"}</Anchor>
</Story>
