<script lang="ts">
	export let variant: 'primary' | 'secondary' = 'primary';
	export let size: 'byte' | 'kilo' | 'mega' = 'kilo';
	export let max;
	export let value;

	let width;

	$: {
		width = value && max ? (value / max) * 100 : 0;
	}
</script>

<div class="wrapper">
	<span
		class="progress-background"
		class:byte={size === 'byte'}
		class:kilo={size === 'kilo'}
		class:mega={size === 'mega'}
	/>
	<span
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
	.wrapper {
		display: flex;
		align-items: center;
	}
	.progress-background {
		background-color: var(--cui-bg-highlight);
		border-radius: var(--cui-border-radius-pill);
		position: relative;
		width: 100%;
		overflow: hidden;
		height: 16px;
	}
	.progress-bar {
		border-radius: var(--cui-border-radius-pill);
		overflow: hidden;
		content: '';
		display: block;
		position: absolute;
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
		height: var(--cui-spacing-bit);
	}
	.kilo {
		height: var(--cui-spacing-byte);
	}
	.mega {
		height: var(--cui-spacing-mega);
	}
</style>
