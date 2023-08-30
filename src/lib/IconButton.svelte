<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let size: 'kilo' | 'giga' = 'giga';
	export let destructive = false;
	export let stretch = false;
	export let disabled = false;
</script>

<button
	class:giga={size === 'giga'}
	class:kilo={size === 'kilo'}
	class:primary={variant === 'primary' && !destructive}
	class:primary--destructive={variant === 'primary' && destructive}
	class:secondary={variant === 'secondary' && !destructive}
	class:secondary--destructive={variant === 'secondary' && destructive}
	class:stretch
	class:tertiary={variant === 'tertiary' && !destructive}
	class:tertiary--destructive={variant === 'tertiary' && destructive}
	{disabled}
	on:click
	type="button"
>
	<span class="content-wrapper">
		<slot />
	</span>
</button>

<style>
	button {
		font-size: var(--cui-ty-body-font-size-one);
		line-height: var(--cui-ty-body-line-height-one);
		display: inline-flex;
		justify-content: center;
		width: fit-content;
		height: auto;
		margin: 0;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
		font-weight: var(--cui-font-weight-bold);
		border-width: var(--cui-border-width-kilo);
		border-style: solid;
		border-radius: var(--cui-border-radius-pill);
		transition:
			opacity var(--cui-transitions-default),
			color var(--cui-transitions-default),
			background-color var(--cui-transitions-default),
			border-color var(--cui-transitions-default);
	}

	button:disabled,
	[disabled] {
		pointer-events: none;
	}

	button:focus {
		outline: 0;
		box-shadow: inset 0 0 0 4px var(--cui-border-focus);
	}

	button:focus::-moz-focus-inner {
		border: 0;
	}

	button:focus:not(:focus-visible) {
		box-shadow: none;
	}

	.primary {
		background-color: var(--cui-bg-accent-strong);
		border-color: transparent;
		color: var(--cui-fg-on-strong);
	}

	.primary:hover {
		background-color: var(--cui-bg-accent-strong-hovered);
		border-color: transparent;
		color: var(--cui-fg-on-strong-hovered);
	}

	.primary:active {
		background-color: var(--cui-bg-accent-strong-pressed);
		border-color: transparent;
		color: var(--cui-fg-on-strong-pressed);
	}

	.primary:disabled,
	[disabled] {
		background-color: var(--cui-bg-accent-strong-disabled);
		border-color: transparent;
		color: var(--cui-fg-on-strong-disabled);
	}

	.primary--destructive {
		background-color: var(--cui-bg-danger-strong);
		border-color: transparent;
		color: var(--cui-fg-on-strong);
	}

	.primary--destructive:hover {
		background-color: var(--cui-bg-danger-strong-hovered);
		border-color: transparent;
		color: var(--cui-fg-on-strong-hovered);
	}

	.primary--destructive:active {
		background-color: var(--cui-bg-danger-strong-pressed);
		border-color: transparent;
		color: var(--cui-fg-on-strong-pressed);
	}

	.primary--destructive:disabled,
	[disabled] {
		background-color: var(--cui-bg-danger-strong-disabled);
		border-color: transparent;
		color: var(--cui-fg-on-strong-disabled);
	}

	.secondary {
		background-color: var(--cui-bg-normal);
		border-color: var(--cui-border-normal);
		color: var(--cui-fg-normal);
	}

	.secondary:hover {
		background-color: var(--cui-bg-normal-hovered);
		border-color: var(--cui-border-normal-hovered);
		color: var(--cui-fg-normal-hovered);
	}

	.secondary:active {
		background-color: var(--cui-bg-normal-pressed);
		border-color: var(--cui-border-normal-pressed);
		color: var(--cui-fg-normal-pressed);
	}

	.secondary:disabled,
	[disabled] {
		background-color: var(--cui-bg-normal-disabled);
		border-color: var(--cui-border-normal-disabled);
		color: var(--cui-fg-normal-disabled);
	}

	.secondary--destructive {
		background-color: var(--cui-bg-normal);
		border-color: var(--cui-border-danger);
		color: var(--cui-fg-danger);
	}

	.secondary--destructive:hover {
		background-color: var(--cui-bg-normal-hovered);
		border-color: var(--cui-border-danger-hovered);
		color: var(--cui-fg-danger-hovered);
	}

	.secondary--destructive:active {
		background-color: var(--cui-bg-normal-pressed);
		border-color: var(--cui-border-danger-pressed);
		color: var(--cui-fg-danger-pressed);
	}

	.secondary--destructive:disabled,
	[disabled] {
		background-color: var(--cui-bg-normal-disabled);
		border-color: var(--cui-border-danger-disabled);
		color: var(--cui-fg-danger-disabled);
	}

	.tertiary {
		background-color: transparent;
		border-color: transparent;
		color: var(--cui-fg-accent);
		padding-left: 0;
		padding-right: 0;
	}

	.tertiary:hover {
		color: var(--cui-fg-accent-hovered);
		background-color: transparent;
		border-color: transparent;
	}

	.tertiary:active {
		color: var(--cui-fg-accent-pressed);
		background-color: transparent;
		border-color: transparent;
	}

	.tertiary:disabled,
	[disabled] {
		color: var(--cui-fg-accent-disabled);
		background-color: transparent;
		border-color: transparent;
	}

	.tertiary--destructive {
		background-color: transparent;
		border-color: transparent;
		color: var(--cui-fg-danger);
		padding-left: 0;
		padding-right: 0;
	}

	.tertiary--destructive:hover {
		color: var(--cui-fg-danger-hovered);
		background-color: transparent;
		border-color: transparent;
	}

	.tertiary--destructive:active {
		color: var(--cui-fg-danger-pressed);
		background-color: transparent;
		border-color: transparent;
	}

	.tertiary--destructive:disabled,
	[disabled] {
		color: var(--cui-fg-danger-disabled);
		background-color: transparent;
		border-color: transparent;
	}

	.kilo {
		padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
			calc(var(--cui-spacings-mega) - var(--cui-border-width-kilo));
	}

	.giga {
		padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo))
			calc(var(--cui-spacings-giga) - var(--cui-border-width-kilo));
	}

	.stretch {
		width: 100%;
	}

	.content-wrapper {
		display: inline-flex;
		align-items: center;
		opacity: 1;
		visibility: inherit;
		transform: scale3d(1, 1, 1);
		transition:
			opacity var(--cui-transitions-default),
			transform var(--cui-transitions-default),
			visibility var(--cui-transitions-default);
	}
</style>
