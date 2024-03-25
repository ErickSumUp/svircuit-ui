<script context="module">
	import Select from '$lib/Select.svelte';

	export const meta = {
		title: 'Components/Select',
		component: Select,
		argTypes: {
			label: {
				control: { type: 'text', defaultValue: 'Select' },
			},
		},
		parameters: {
			layout: 'centered'
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';

	export let label = 'Countries';
</script>

<Story name="Base" let:args>
	<Select {label} {...args} >
		<option value="" disabled selected>Select an option</option>
		<option value="US">United States</option>
		<option value="DE">Germany</option>
		<option value="FR">France</option>
	</Select>
</Story>

<Story name='Prefix'>
	<Select label='How much do you want?' id='money' ariaDescribedBy='money request'>
		<option value="" disabled selected>Select a range</option>
		<option value="A">0-100</option>
		<option value="B">101-200</option>
		<option value="C">201-300</option>
	</Select>
</Story>
