<script context="module">
	import SearchInput from '$lib/components/SearchInput.svelte';

	export const meta = {
		title: 'Components/SearchInput',
		component: SearchInput,
		argTypes: {
			label: {
				control: { type: 'text', defaultValue: 'SearchInput' }
			},
			placeholder: {
				control: { type: 'text', defaultValue: 'Type a word...' },
				type: { name: 'string', required: false }
			}
		},
		parameters: {
			layout: 'centered'
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	export let label = 'First name';
	export let placeholder = 'Type a word...';
	export let maxLength = 100;
	$: validationHint = `Maximum ${maxLength} characters`;
</script>

<Story name="Base" let:args>
	<SearchInput {label} {maxLength} {validationHint} {placeholder} {...args} />
</Story>
