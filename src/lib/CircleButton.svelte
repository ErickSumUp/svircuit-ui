<script lang="ts">
	export let variant: 'primary' | 'tertiary' = 'primary';
	export let disabled = false;
</script>

<button
	class:primary={variant === 'primary'}
	class:tertiary={variant === 'tertiary'}
	{disabled}
	on:click
	type="button"
>
	<slot />
</button>

<style>
	button {
		border-radius: var(--cui-border-radius-pill);
		display: inline-block;
		font-size: var(--cui-typography-body-two-font-size);
		line-height: var(--cui-typography-body-one-line-height);
		font-weight: var(--cui-font-weight-bold);
		text-align: center;
		min-width: var(--cui-icon-size-giga);
		min-height: var(--cui-icon-size-giga);
		border-style: solid;
		justify-content: center;
		height: auto;
		margin: 0;
		cursor: pointer;
		text-decoration: none;
		border-width: var(--cui-border-width-kilo);
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
</style>
