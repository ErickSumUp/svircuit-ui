<script lang="ts">
	export let id = 'date-input';
	export let disabled = false;
	export let readonly = false;
	export let label: string;
	export let validationMessage = '';
	export let value = '';
</script>

<div class="wrapper" class:wrapper-disabled={disabled}>
	<label for="input">
		<span class="label-span" class:label-span-disabled={disabled}>{label}</span>
	</label>
	<div class="input-wrapper">
		<input {id} class="base" {disabled} {readonly} bind:value on:blur on:change type="date" />
	</div>
	{#if validationMessage.length > 0}
		<span
			class="validation-message"
			role="status"
			aria-live="polite"
			class:validation-message--disabled={disabled}
		>
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
		box-shadow: 0 0 0 1px var(--cui-border-normal);
		transition:
			box-shadow var(--cui-transitions-default),
			padding var(--cui-transitions-default);
		min-width: 10ch;
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

	.base::placeholder {
		color: var(--cui-fg-placeholder);
		transition: color var(--cui-transitions-default);
	}

	.base:disabled,
	.base[disabled] {
		background-color: var(--cui-bg-normal-disabled);
		box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
	}

	.base[readonly] {
		background-color: var(--cui-bg-subtle-disabled);
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
</style>
