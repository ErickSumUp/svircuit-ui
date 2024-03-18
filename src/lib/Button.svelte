<script lang="ts">
	/**
	 * Choose from 3 style variants. Default: 'secondary'.
	 */
	export let variant: 'primary' | 'secondary' | 'tertiary' = 'secondary';
	/**
	 * Choose from 2 sizes. Default: 'm'.
	 */
	export let size: 's' | 'm' = 'm';
	export let destructive = false;
	export let stretch = false;
	export let disabled = false;
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let circle = false;
	export let wrap = false;
	export let isLoading = false;
</script>

<button
	class:medium={size === 'm'}
	class:small={size === 's'}
	class:circle-medium={circle && size === 'm'}
	class:circle-small={circle && size === 's'}
	class:primary={variant === 'primary'}
	class:primary--destructive={variant === 'primary'}
	class:secondary={variant === 'secondary'}
	class:secondary--destructive={variant === 'secondary'}
	class:tertiary={variant === 'tertiary'}
	class:tertiary--destructive={variant === 'tertiary'}
	aria-busy={isLoading}
	class:destructive
	class:stretch
	{disabled}
	on:click
	{type}
>
	<slot name="descriptive-icon" />
	<span
		class="label content-wrapper"
		class:w-desc-icon={$$slots['descriptive-icon']}
		class:w-trai-icon={$$slots['trailing-icon']}
		class:wrap
	>
		<slot />
	</span>
	<slot name="trailing-icon" />
</button>

<style>
	button {
		font-size: var(--cui-typography-body-one-font-size);
		line-height: var(--cui-typography-body-one-line-height);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: var(--cui-content-gap);
		width: fit-content;
		height: fit-content;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
		font-weight: var(--cui-font-weight-bold);
		border-width: var(--cui-border-width-kilo);
		border-style: solid;
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

	.label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.primary {
		color: var(--cui-fg-on-strong);
		background-color: var(--cui-bg-accent-strong);
		border-color: transparent;
	}

	.primary:hover {
		color: var(--cui-fg-on-strong-hovered);
		background-color: var(--cui-bg-accent-strong-hovered);
		border-color: transparent;
	}

	.primary:active {
		color: var(--cui-fg-on-strong-pressed);
		background-color: var(--cui-bg-accent-strong-pressed);
		border-color: transparent;
	}

	.primary.destructive {
		background-color: var(--cui-bg-danger-strong);
	}

	.primary.destructive:hover {
		background-color: var(--cui-bg-danger-strong-hovered);
	}

	.primary.destructive:active {
		background-color: var(--cui-bg-danger-strong-pressed);
	}

	.secondary {
		color: var(--cui-fg-normal);
		background-color: var(--cui-bg-normal);
		border-color: var(--cui-border-normal);
	}

	.secondary:hover {
		color: var(--cui-fg-normal-hovered);
		background-color: var(--cui-bg-normal-hovered);
		border-color: var(--cui-border-normal-hovered);
	}

	.secondary:active {
		color: var(--cui-fg-normal-pressed);
		background-color: var(--cui-bg-normal-pressed);
		border-color: var(--cui-border-normal-pressed);
	}

	.secondary.destructive {
		color: var(--cui-fg-danger);
	}

	.secondary.destructive:hover {
		color: var(--cui-fg-danger-hovered);
		background-color: var(--cui-bg-danger-hovered);
		border-color: var(--cui-border-danger-hovered);
	}

	.secondary.destructive:active {
		color: var(--cui-fg-danger-pressed);
		background-color: var(--cui-bg-danger-pressed);
		border-color: var(--cui-border-danger-pressed);
	}

	.tertiary {
		color: var(--cui-fg-accent);
		background-color: transparent;
		border-color: transparent;
	}

	.tertiary:hover {
		color: var(--cui-fg-accent-hovered);
		background-color: var(--cui-bg-accent-hovered);
		border-color: transparent;
	}

	.tertiary:active {
		color: var(--cui-fg-accent-pressed);
		background-color: var(--cui-bg-accent-pressed);
		border-color: transparent;
	}

	.tertiary:focus-visible {
		background-color: var(--cui-bg-accent-hovered);
	}

	.tertiary.destructive {
		color: var(--cui-fg-danger);
	}

	.tertiary.destructive:hover {
		color: var(--cui-fg-danger-hovered);
		background-color: var(--cui-bg-danger-hovered);
	}

	.tertiary.destructive:active {
		color: var(--cui-fg-danger-pressed);
		background-color: var(--cui-bg-danger-pressed);
	}

	.tertiary.destructive:focus-visible {
		background-color: var(--cui-bg-danger-hovered);
	}

	.tertiary .label {
		position: relative;
	}

	.tertiary .label::after {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 100%;
		content: '';
		border-top: var(--cui-border-width-kilo) dashed var(--cui-border-normal);
		opacity: 1;
		transition:
			transform var(--cui-transitions-default),
			opacity var(--cui-transitions-default);
	}

	.tertiary:focus-visible .label::after {
		opacity: 0;
		transform: translateY(2px);
	}

	.tertiary:hover .label::after,
	.tertiary:active .label::after .tertiary[aria-busy='true'] .label::after,
	.tertiary:disabled .label::after,
	.tertiary[disabled] .label::after {
		opacity: 0;
		transform: translateY(2px);
	}

	.small {
		padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
			calc(var(--cui-spacings-mega) - var(--cui-border-width-kilo));
		border-radius: var(--cui-border-radius-kilo);
		--content-gap: var(--cui-spacings-bit);
	}

	.medium {
		padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo))
			calc(var(--cui-spacings-giga) - var(--cui-border-width-kilo));
		border-radius: var(--cui-border-radius-kilo);
		--content-gap: var(--cui-spacings-byte);
	}

	.stretch {
		width: 100%;
	}

	.content-wrapper {
		display: inline-flex;
		white-space: nowrap;
		align-items: center;
		opacity: 1;
		visibility: inherit;
		transform: scale3d(1, 1, 1);
		transition:
			opacity var(--cui-transitions-default),
			transform var(--cui-transitions-default),
			visibility var(--cui-transitions-default);
	}

	.circle-small {
		padding: calc(var(--cui-spacings-byte) - var(--cui-border-width-kilo));
	}

	.circle-medium {
		padding: calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));
	}

	.wrap {
		white-space: normal;
	}

	.w-desc-icon {
		margin-left: var(--cui-spacings-byte);
	}

	.w-trai-icon {
		margin-right: var(--cui-spacings-byte);
	}
</style>
