<script lang="ts">
	import ChevronDown from '$lib/icons/ChevronDown.svelte';

	export let disabled = false;
	export let invalid = false;
	export let prefix = '';
	export let label = '';
	export let value: number | string = '';
	export let placeholder = '';
	export let placeholderValue: number | string = '';
</script>

<div class="wrapper">
	<label class="label-wrapper">
		<span>{label}</span>
		<div class="select--wrapper">
			{prefix}
			<select
				class:select--invalid={invalid && !disabled}
				class:select--prefix={prefix.length > 0}
				class:select--disabled={disabled}
				on:change
				bind:value
			>
				{#if placeholder}
					<option value={placeholderValue} disabled selected>{placeholder}</option>
				{/if}
				<slot />
			</select>
			<div class="chevron">
				<ChevronDown />
			</div>
		</div>
	</label>
</div>

<style>
	.wrapper {
		flex-grow: 1;
	}
	.label-wrapper {
		font-size: var(--cui-ty-body-font-size-two);
		line-height: var(--cui-ty-body-line-height-two);
		display: block;
	}
	.label-wrapper:disabled {
		opacity: 0.5;
		pointer-events: none;
		box-shadow: none;
	}
	select {
		font-size: var(--cui-ty-body-font-size-one);
		line-height: var(--cui-ty-body-line-height-one);
		appearance: none;
		cursor: pointer;
		background-color: var(--cui-bg-normal);
		outline: none;
		border: 0;
		border-radius: var(--cui-border-radius-byte);
		color: var(--cui-fg-normal);
		margin: var(--cui-spacings-bit) 0 0;
		padding: var(--cui-spacings-kilo) var(--cui-spacings-exa) var(--cui-spacings-kilo)
			var(--cui-spacings-mega);
		position: relative;
		width: 100%;
		z-index: var(--cui-z-index-input);
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition:
			box-shadow var(--cui-transitions-default),
			padding var(--cui-transitions-default);
		box-shadow: 0 0 0 1px var(--cui-border-normal);
	}
	select:-moz-focusring {
		color: transparent;
		text-shadow: 0 0 0 var(--cui-bg-overlay);
	}
	select::-ms-expand {
		display: none;
	}
	.select--disabled {
		box-shadow: 0 0 0 1px var(--cui-fg-subtle);
	}
	.select--invalid {
		padding-right: var(--cui-spacings-zetta);
	}
	.select--prefix {
		padding-left: var(--cui-spacings-exa);
	}
	select:hover {
		box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
	}
	select:focus {
		box-shadow: 0 0 0 2px var(--cui-bg-accent-strong);
	}
	select:active {
		box-shadow: 0 0 0 1x var(--cui-bg-accent-strong);
	}
	.chevron {
		color: var(--cui-fg-subtle);
		display: block;
		z-index: calc(var(--cui-z-index-input) + 1);
		pointer-events: none;
		position: absolute;
		height: var(--cui-spacings-exa);
		width: var(--cui-spacings-exa);
		top: 0;
		right: 0;
		padding: var(--cui-spacings-mega);
	}
	.select--wrapper {
		color: var(--cui-fg-normal);
		display: block;
		position: relative;
	}
	label {
		display: block;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
