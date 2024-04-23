<script context="module">
	import Input from '$lib/components/Input.svelte';

	export const meta = {
		title: 'Forms/Input',
		component: Input,
		argTypes: {
			label: {
				control: { type: 'text', defaultValue: 'Input' }
			}
		},
		parameters: {
			layout: 'centered'
		}
	};
</script>

<script lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import Search from '$lib/icons/Search.svelte';
	import SearchInput from '$lib/SearchInput.svelte';
	import SearchInputDev from '$lib/dev/SearchInput.svelte';
	import CloseButtonSecondary from '$lib/dev/CloseButtonSecondary.svelte';

	export let label = 'First name';
	export let placeholder = 'Jane';
	export let maxLength = 100;
	$: validationHint = `Maximum ${maxLength} characters`;
</script>

<Story name="Base" let:args>
	<Input {label} {maxLength} {validationHint} {placeholder} {...args} />
</Story>

<Story name="Validations">
	<div style="display: flex; flex-direction: row; gap: 2rem;">
		<Input
			id="invalid"
			label="Username"
			placeholder="jane123"
			validationHint="This field is required."
			invalid
		/>
		<Input
			id="warning"
			label="Username"
			value="poop"
			validationHint="Choose an appropriate name."
			hasWarning
		/>
		<Input
			id="valid"
			label="Username"
			value="jhon.doe"
			validationHint="Yay! That username is available."
			showValid
		/>
	</div>
</Story>

<Story name="Optional">
	<Input
		id="optional"
		optionalLabel="optional"
		label="First name"
		placeholder="Jane"
		validationHint="Maximum 100 characters"
	/>
</Story>

<Story name="Readonly">
	<Input
		id="optional"
		label="API token"
		value="a3b2c1"
		validationHint="Select and copy me."
		readOnly
	/>
</Story>

<Story name="Disabled">
	<Input
		id="disabled"
		label="First name"
		value="You can't edit me"
		validationHint="Maximum 100 characters"
		disabled
	/>
</Story>

<Story name="Inline">
	<div style="display: flex; gap: var(--cui-spacings-mega); grid-template-columns: repeat(2, 1fr)">
		<Input
			id="first-name"
			label="First name"
			placeholder="Jane"
			validationHint="Maximum 100 characters"
		/>
		<Input
			id="second-name"
			label="Last name"
			placeholder="Doe"
			validationHint="Maximum 100 characters"
		/>
	</div>
</Story>

<Story name="Hidden Label">
	<Input id="email" label="Email" hideLabel={true} placeholder="Email"/>
</Story>

<Story name="Date">
	<Input id="date" label="Date of birth" type="date" validationHint="You must be at least 18 years old" />
</Story>

<Story name="SearchStory">
	<Input id="xd" label="Search" placeholder="Search...">
		<Search
			slot="prefix"
			style="position: absolute; z-index: calc(var(--cui-z-index-input) + 1); display: block; width: var(--cui-spacings-exa); height: var(--cui-spacings-exa); padding: var(--cui-spacings-mega); pointer-events: auto;"
		/>
		<CloseButtonSecondary
			slot="suffix" />
	</Input>
	<CloseButtonSecondary />
	<SearchInput id="search" label="Search" placeholder="Search..." />
	<SearchInputDev id="search" label="Search" placeholder="Search..." />
</Story>
