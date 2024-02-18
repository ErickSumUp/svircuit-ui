<script lang="ts">
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
	export let required = false;
	export let validationMessage = '';
	export let value: number | string = '';
	export let type = 'text';
	export let maxlength = 10;
	export let descriptionId = '';
	export let name: string = '';
	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
	function nameAction(node: HTMLInputElement) {
		node.name = name;
	}
</script>

<div class="wrapper" class:wrapper-disabled={disabled}>
	<label for="input">
		<span class="label-span" class:label-span-disabled={disabled}>{label}</span>
	</label>
	<div class="input-wrapper">
		<span class="prefix">
			{prefix}
		</span>
		<input
			id="input"
			class="base"
			class:warning={!disabled && hasWarning}
			class:input--invalid={!disabled && invalid}
			class:text-align-right={textAlignRight}
			class:has-prefix={prefix.length > 0}
			class:has-suffix={suffix.length > 0}
			{readonly}
			{required}
			{disabled}
			{placeholder}
			{maxlength}
			aria-invalid={invalid && 'true'}
			aria-describedby={descriptionId}
			on:blur
			on:change
			on:input
			use:typeAction
			use:nameAction
			bind:value
		/>
		{#if suffix.length > 0}
			<span class="suffix">
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
			{#if invalid || hasWarning || showValid}
				<div class="icon-wrapper">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{#if invalid}
							<path
								d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3 11a1 1 0 0 1-1.41 0L8 9.41 6.41 11A1 1 0 0 1 5 9.59L6.59 8 5 6.41A1 1 0 0 1 5 5a1 1 0 0 1 1.41 0L8 6.59 9.59 5A1 1 0 0 1 11 5a1 1 0 0 1 0 1.41L9.41 8 11 9.59A1 1 0 0 1 11 11z"
								fill="currentColor"
							/>
						{:else if hasWarning}
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M10.534 1.5c-1.126-2-3.942-2-5.069 0l-5.069 9C-.73 12.5.678 15 2.931 15h10.138c2.253 0 3.661-2.5 2.534-4.5l-5.069-9zm-3.229 8.687a1.25 1.25 0 1 1 1.39 2.08 1.25 1.25 0 0 1-1.39-2.08zM7.293 4.27A1 1 0 0 1 9 4.977v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 .293-.708z"
								fill="currentColor"
							/>
						{:else if showValid}
							<path
								d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.62-4 5a.993.993 0 0 1-.72.38H7a1 1 0 0 1-.71-.29l-2-2a1.004 1.004 0 0 1 1.42-1.42L6.92 9.5l3.3-4.12a1 1 0 1 1 1.56 1.24z"
								fill="currentColor"
							/>
						{/if}
					</svg>
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
		font-size: var(--cui-typography-body-two-font-size);
		line-height: var(--cui-typography-body-two-line-height);
	}

	.label-span {
		display: inline-block;
		margin-bottom: var(--cui-spacings-bit);
	}

	.label-span-disabled {
		color: var(--cui-fg-normal-disabled);
	}

	.input-wrapper {
		position: relative;
	}

	.base {
		width: 100%;
		padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
		margin: 0;
		font-size: var(--cui-typography-body-one-font-size);
		line-height: var(--cui-typography-body-one-line-height);
		appearance: none;
		-webkit-appearance: none;
		background-color: var(--cui-bg-normal);
		border: none;
		border-radius: var(--cui-border-radius-byte);
		outline: 0;
		box-shadow: inset 0 0 0 1px var(--cui-border-normal);
		transition:
			box-shadow var(--cui-transitions-default),
			padding var(--cui-transitions-default);
	}

	.base:hover {
		box-shadow: inset 0 0 0 1px var(--cui-border-normal-hovered);
	}

	.base:focus {
		box-shadow: inset 0 0 0 2px var(--cui-border-accent);
	}

	.base:active {
		box-shadow: inset 0 0 0 1px var(--cui-border-accent);
	}

	.base::placeholder {
		color: var(--cui-fg-placeholder);
		transition: color var(--cui-transitions-default);
	}

	.base:disabled,
	.base[disabled] {
		background-color: var(--cui-bg-normal-disabled);
		box-shadow: inset 0 0 0 1px var(--cui-border-normal-disabled);
	}

	.base[readonly] {
		background-color: var(--cui-bg-subtle-disabled);
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

	.base[aria-invalid='true']:not(:focus):not([disabled])::placeholder {
		color: var(--cui-fg-danger);
	}

	.warning {
		box-shadow: inset 0 0 0 1px var(--cui-border-warning);
	}

	.warning:hover {
		box-shadow: inset 0 0 0 1px var(--cui-border-warning-hovered);
	}

	.warning:focus {
		box-shadow: inset 0 0 0 2px var(--cui-border-warning);
	}

	.warning:active {
		box-shadow: inset 0 0 0 1px var(--cui-border-warning-pressed);
	}

	.warning:not(:focus):not([disabled])::placeholder {
		color: var(--cui-fg-warning);
	}

	.text-align-right {
		text-align: right;
	}

	.has-prefix {
		padding-left: var(--cui-spacings-exa);
	}

	.has-suffix {
		padding-right: var(--cui-spacings-exa);
	}

	.prefix,
	.suffix {
		position: absolute;
		width: var(--cui-spacings-exa);
		height: var(--cui-spacings-exa);
		padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
		color: var(--cui-fg-normal);
		pointer-events: none;
		font-size: 1rem;
		line-height: 1.5rem;
	}

	.suffix {
		top: 0;
		right: 0;
		transition: right var(--cui-transitions-default);
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

	.validation-message {
		display: flex;
		margin-top: var(--cui-spacings-bit);
		font-size: var(--cui-typography-body-two-font-size);
		line-height: var(--cui-typography-body-two-line-height);
		color: var(--cui-fg-subtle);
		transition: color var(--cui-transitions-default);
	}

	.validation-message--disabled {
		color: var(--cui-fg-subtle-disabled);
	}

	.validation-message--valid {
		color: var(--cui-fg-success);
	}

	.validation-message--valid--disabled {
		color: var(--cui-fg-success-disabled);
	}

	.validation-message--invalid {
		color: var(--cui-fg-danger);
	}

	.validation-message--invalid--disabled {
		color: var(--cui-fg-danger-disabled);
	}

	.validation-message--warning {
		color: var(--cui-fg-warning);
	}

	.validation-message--warning--disabled {
		color: var(--cui-fg-warning-disabled);
	}

	.icon-wrapper {
		display: block;
		flex-shrink: 0;
		align-self: flex-start;
		width: var(--cui-icon-sizes-kilo);
		height: var(--cui-icon-sizes-kilo);
		margin-top: calc((var(--cui-typography-body-two-line-height) - var(--cui-icon-sizes-kilo)) / 2);
		margin-right: var(--cui-spacings-bit);
	}
</style>
