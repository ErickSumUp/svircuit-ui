<script lang="ts">
	import Confirm from '$lib/icons/Confirm.svelte';
	import Alert from '$lib/icons/Alert.svelte';
	import Notify from '$lib/icons/Notify.svelte';

	export let disabled = false;
	export let prefix = '';
	export let suffix = '';
	export let label = '';
	export let placeholder = '';
	export let showValid = false;
	export let hasWarning = false;
	export let invalid = false;
	export let textAlignRight = false;
	export let readonly = false;
	export let validationMessage = '';
	export let value: number | string = '';
	export let type = 'text';
	export let maxlength = 10;
	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div class="wrapper" class:wrapper-disabled={disabled}>
	<label for="input">
		<span class="label-span" class:label-span-disabled={disabled}>{label}</span>
	</label>
	<div class="input-wrapper">
		{#if readonly}
			<span class="prefix-wrapper">
				{prefix}
			</span>
		{/if}
		<input
			id="input"
			class:input--warning={!disabled && hasWarning}
			class:input--invalid={!disabled && invalid}
			class:text-align-right={textAlignRight}
			class:readonly
			class:input-has-prefix={prefix.length > 0}
			class:input-has-suffix={suffix.length > 0}
			{disabled}
			{placeholder}
			{maxlength}
			bind:value
			on:blur
			on:change
			use:typeAction
		/>
		{#if suffix.length > 0}
			<span class="suffix-wrapper">
				{suffix}
			</span>
		{/if}
	</div>
	{#if validationMessage.length > 0}
		<span
			class="validation-message"
			role="status"
			aria-live="polite"
			class:validation-message--disabled={disabled}
			class:validation-message--valid={showValid}
			class:validation-message--valid--disabled={showValid && disabled}
			class:validation-message--invalid={invalid}
			class:validation-message--invalid--disabled={invalid && disabled}
			class:validation-message--warning={hasWarning}
			class:validation-message--warning--disabled={hasWarning && disabled}
		>
			{#if invalid}
				<div class="icon-wrapper">
					<Alert size="16" />
				</div>
			{:else if hasWarning}
				<div class="icon-wrapper">
					<Notify size="16" />
				</div>
			{:else if showValid}
				<div class="icon-wrapper">
					<Confirm size="16" />
				</div>
			{/if}
			{validationMessage}
		</span>
	{/if}
</div>

<style>
	.wrapper {
		flex-grow: 1;
	}
	.wrapper-disabled {
		pointer-events: none;
	}

	label {
		display: block;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.label-span {
		display: inline-block;
		margin-bottom: 4px;
	}

	.label-span-disabled {
		color: rgba(26, 26, 26, 0.4);
	}

	.input-wrapper {
		position: relative;
	}

	.prefix-wrapper {
		font-size: 1rem;
		line-height: 1.5rem;

		position: absolute;
		pointer-events: none;
		color: #666666;
		padding: 12px 16px;
		height: 48px;
		width: 48px;
	}

	.suffix-wrapper {
		font-size: 1rem;
		line-height: 1.5rem;

		position: absolute;
		top: 0;
		right: 0;
		pointer-events: none;
		color: #666666;
		padding: 12px 16px;
		height: 48px;
		width: 48px;
		transition: right 120ms ease-in-out;
	}

	input {
		font-size: 1rem;
		line-height: 1.5rem;

		-webkit-appearance: none;
		appearance: none;
		background-color: #ffffff;
		border: none;
		outline: 0;
		border-radius: 8px;
		padding: 12px 16px;
		transition:
			box-shadow 120ms ease-in-out,
			padding 120ms ease-in-out;
		width: 100%;
		margin: 0;

		box-shadow: inset 0 0 0 1px var(--cui-border-normal);
	}

	input:disabled {
		background-color: rgba(255, 255, 255, 0.4);
		box-shadow: inset 0 0 0 1px rgba(204, 204, 204, 0.4);
	}

	input:disabled[disabled] {
		background-color: rgba(255, 255, 255, 0.4);
	}

	input:hover {
		box-shadow: inset 0 0 0 1px var(--cui-border-normal-hovered);
	}

	input:focus {
		box-shadow: inset 0 0 0 2px var(--cui-border-accent);
	}

	input:active {
		box-shadow: inset 0 0 0 1px var(--cui-border-accent);
	}

	input::placeholder {
		color: #999999;
		transition: color 120ms ease-in-out;
	}

	.input--warning {
		box-shadow: inset 0 0 0 1px #f5a720;
	}

	.input--warning:hover {
		box-shadow: inset 0 0 0 1px #ad7a14;
	}

	.input--warning:focus {
		box-shadow: inset 0 0 0 2px #f5a720;
	}

	.input--warning:active {
		box-shadow: inset 0 0 0 1px #f5a720;
	}

	.input--warning:not(:focus)::placeholder {
		color: #f5a720;
	}

	.input--invalid {
		box-shadow: inset 0 0 0 1px #de331d;
	}

	.input--invalid:hover {
		box-shadow: inset 0 0 0 1px #b22426;
	}

	.input--invalid:focus {
		box-shadow: inset 0 0 0 2px #de331d;
	}

	.input--invalid:active {
		box-shadow: inset 0 0 0 1px #de331d;
	}

	.input--invalid:not(:focus)::placeholder {
		color: #de331d;
		opacity: 0.5;
	}

	.text-align-right {
		text-align: right;
	}

	.readonly {
		background-color: #f5f5f5;
	}

	.input-has-prefix {
		padding-left: 48px;
	}

	.input-has-suffix {
		padding-right: 48px;
	}

	.validation-message {
		font-size: 0.875rem;
		line-height: 1.25rem;

		display: block;
		margin-top: 4px;
		color: #6a737c;
		transition: color 120ms ease-in-out;
	}

	.validation-message--disabled {
		color: rgba(102, 102, 102, 0.4);
	}

	.validation-message--valid {
		color: #018850;
	}

	.validation-message--valid--disabled {
		color: rgba(1, 135, 48, 0.4);
	}

	.validation-message--invalid {
		color: #de331d;
	}

	.validation-message--invalid--disabled {
		color: rgba(222, 51, 29, 0.4);
	}

	.validation-message--warning {
		color: #e27900;
	}

	.validation-message--warning--disabled {
		color: rgba(232, 124, 0, 0.4);
	}

	.icon-wrapper {
		display: inline-block;
		position: relative;
		width: var(--cui-icon-size-kilo);
		height: var(--cui-icon-size-kilo);
		vertical-align: text-top;
		margin-right: var(--cui-spacings-bit);
	}
</style>
