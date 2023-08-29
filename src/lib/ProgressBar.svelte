<script lang="ts">
	export let variant: 'primary' | 'secondary' = 'primary';
	export let size: 'byte' | 'kilo' | 'mega' = 'kilo';
	export let max: number;
	export let value: number;

	let width: number;

	$: {
		width = value && max ? (value / max) * 100 : 0;
	}
</script>

<div
	class="container"
	class:byte={size === 'byte'}
	class:kilo={size === 'kilo'}
	class:mega={size === 'mega'}
>
	<div
		class="progress-bar"
		class:primary={variant === 'primary'}
		class:secondary={variant === 'secondary'}
		class:byte={size === 'byte'}
		class:kilo={size === 'kilo'}
		class:mega={size === 'mega'}
		style="width: {width}%"
	/>
</div>

<style>
	.container {
		background-color: var(--cui-bg-highlight);
		border-radius: var(--cui-border-radius-pill);
		width: 100%;
		height: 16px;
	}
	.progress-bar {
		border-radius: var(--cui-border-radius-pill);
		overflow: hidden;
		content: '';
		display: block;
		top: 0;
		bottom: 0;
		left: 0;
		transition: width 0.05s ease-out;
		height: 16px;
		animation-name: loop;
		animation-fill-mode: forwards;
		animation-play-state: running;
		animation-duration: 3000ms;
		animation-iteration-count: infinite;
	}
	.primary {
		background-color: var(--cui-bg-accent-strong);
	}
	.secondary {
		background-color: var(--cui-bg-strong);
	}
	.byte {
		height: var(--cui-spacings-bit);
	}
	.kilo {
		height: var(--cui-spacings-byte);
	}
	.mega {
		height: var(--cui-spacings-mega);
	}
</style>
