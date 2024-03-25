<script lang="ts">
	export let disabled = false;
	/**
	 * Label to indicate that the select is optional. Only displayed when the
	 * `required` prop is falsy.
	 * @type {string}
	 */
	export let optionalLabel: string = '';
	export let ariaDescribedBy: string;
	export let invalid = false;
	export let prefix = '';
	export let label = '';
	export let value: number | string = '';
	export let placeholder = '';
	export let placeholderValue: number | string = '';
	/**
	 * Whether the field is required or not.

	 * @type {boolean}
	 */
	export let required: boolean = false;
	/**
	 * Whether the label should be hidden visually.
	 * @type {boolean}
	 */
	export let hideLabel: boolean = false;
	/**
	 * A unique identifier for the input field. Must be defined.
	 * @type {string}
	 */
	export let id: string;
	/**
	 * Name of the select form element.
	 * @type {string}
	 */
	export let name: string = 'select';
</script>

<div class="field-wrapper" data-disabled={disabled}>
	<label for={id} class="label" data-disabled={disabled}>
		<span class="label-text" class:label-hide-visually={hideLabel} data-disabled={disabled}>
			{label}
			{#if optionalLabel && !required}
				<span class="label-text-optional"> ({optionalLabel})</span>
			{/if}
		</span>
	</label>
	<div class="wrapper">
		<slot name="prefix" class="prefix" />
		<select
			{id}
			bind:value
			aria-describedby={ariaDescribedBy}
			aria-invalid={invalid}
			{required}
			{disabled}
			aria-pressed
			{name}
			class="base"
			class:has-prefix={$$slots.prefix}
			class:select--invalid={invalid && !disabled}
			class:select--disabled={disabled}
			on:change
			aria-label={label}
		>
			{#if placeholder}
				<option value={placeholderValue} selected>{placeholder}</option>
			{/if}
			<slot />
		</select>
		<svg
			class="icon"
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 11c-.266 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 3 6a1 1 0 0 1 1-1c.266 0 .52.104.71.29L8 8.58l3.29-3.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71l-4 4c-.19.186-.444.29-.71.29z"
				fill="currentColor"
			/>
		</svg>
	</div>
</div>

<style>
	.field-wrapper[data-disabled='true'] {
		pointer-events: none;
	}

	.label {
		display: block;
		font-size: var(--cui-typography-body-two-font-size);
		line-height: var(--cui-typography-body-two-line-height);
	}

	.wrapper {
		position: relative;
		display: block;
		color: var(--cui-fg-normal);
	}

	.base {
		position: relative;
		z-index: var(--cui-z-index-input);
		width: 100%;
		padding-top: var(--cui-spacings-kilo);
		padding-right: var(--cui-spacings-exa);
		padding-bottom: var(--cui-spacings-kilo);
		padding-left: var(--cui-spacings-mega);
		margin: 0;
		overflow-x: hidden;
		font-size: var(--cui-typography-body-one-font-size);
		line-height: var(--cui-typography-body-one-line-height);
		color: var(--cui-fg-normal);
		text-overflow: ellipsis;
		white-space: nowrap;
		appearance: none;
		cursor: pointer;
		background-color: var(--cui-bg-normal);
		border: 0;
		border-radius: var(--cui-border-radius-byte);
		outline: none;
		box-shadow: none;
		box-shadow: 0 0 0 1px var(--cui-border-normal);
		transition:
			box-shadow var(--cui-transitions-default),
			padding var(--cui-transitions-default);
	}

	.base:hover {
		box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
	}

	.base:focus {
		box-shadow: 0 0 0 2px var(--cui-border-accent);
	}

	.base:active {
		box-shadow: 0 0 0 1px var(--cui-border-accent);
	}

	.base:-moz-focusring {
		color: transparent;
		text-shadow: 0 0 0 #000;
	}

	.base::-ms-expand {
		display: none;
	}

	/* Validations */

	.base[aria-invalid='true'] {
		box-shadow: 0 0 0 1px var(--cui-border-danger);
	}

	.base[aria-invalid='true']:hover {
		box-shadow: 0 0 0 1px var(--cui-border-danger-hovered);
	}

	.base[aria-invalid='true']:focus {
		box-shadow: 0 0 0 2px var(--cui-border-danger);
	}

	.base[aria-invalid='true']:active {
		box-shadow: 0 0 0 1px var(--cui-border-danger-pressed);
	}

	.has-prefix {
		padding-left: var(--cui-spacings-exa);
	}

	.prefix {
		position: absolute;
		z-index: calc(var(--cui-z-index-input) + 1);
		display: block;
		width: var(--cui-spacings-exa);
		height: var(--cui-spacings-exa);
		padding: var(--cui-spacings-mega);
		pointer-events: auto;
	}

	.icon {
		position: absolute;
		top: 0;
		right: 0;
		z-index: calc(var(--cui-z-index-input) + 1);
		display: block;
		width: var(--cui-spacings-exa);
		height: var(--cui-spacings-exa);
		padding: var(--cui-spacings-mega);
		color: var(--cui-fg-subtle);
		pointer-events: none;
	}

	.base:active ~ .icon {
		transform: rotate(180deg);
	}

	.label-hide-visually {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	.label-text {
		display: inline-block;
		margin-bottom: var(--cui-spacings-bit);
	}

	[data-disabled='true'] .label-text {
		color: var(--cui-fg-normal-disabled);
	}

	.label-text-optional {
		color: var(--cui-fg-subtle);
	}

	[data-disabled='true'] .label-text-optional {
		color: var(--cui-fg-subtle-disabled);
	}
</style>
