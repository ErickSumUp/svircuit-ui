<script context="module">
	import Input from '$lib/Input.svelte';

	export const meta = {
		title: 'Components/Input',
		component: Input,
		argTypes: {
			label: {
				control: { type: 'text', defaultValue: 'Input' },
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
	<Input {label} {...args} >
		<option value="" disabled Inputed>Input an option</option>
		<option value="US">United States</option>
		<option value="DE">Germany</option>
		<option value="FR">France</option>
	</Input>
</Story>

<Story name='Placeholder'>
	<Input label='Countries' id='country' ariaDescribedBy='country Inputed'>
		<option value="" disabled Inputed>Input an option</option>
	</Input>
</Story>
