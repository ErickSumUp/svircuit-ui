<script context="module">
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	export const meta = {
		title: 'Components/ProgressBar',
		component: ProgressBar,
		argTypes: {
			size: {
				control: { type: 'radio', defaultValue: 'm' },
				options: ['s', 'm', 'l']
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
	<div style="width: 500px">
		<ProgressBar value={4} max={10} {...args} />
	</div>
</Story>

<Story name="Labelled">
	<div style="width: 500px">
		<ProgressBar label="3/10" value={3} max={10} />
		<ProgressBar label="30%" value={3} max={10} />
	</div>
</Story>

<Story name="Steps">
	<div style="width: 500px">
		<ProgressBar label="30%" value={3} max={10} />
	</div>
</Story>

<Story name="Timer">
	<div style="width: 500px">
		<ProgressBar
			label="A time-based progressbar"
			hideLabel={true}
			duration={3000}
			paused={false}
			loop={true}
		/>
	</div>
</Story>

<Story name="Sizes">
	<div style="width: 500px">
		<ProgressBar label="A small progressbar" size="s" value={3} max={10} />
		<ProgressBar label="A medium progressbar" size="m" value={3} max={10} />
		<ProgressBar label="A large progressbar" size="l" value={3} max={10} />
	</div>
</Story>
