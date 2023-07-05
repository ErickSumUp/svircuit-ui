<script lang="ts">
	export let disabled = false;
	export let label: string;
	export let validationMessage = '';
	export let value = '';
</script>

<div class="wrapper" class:wrapper-disabled={disabled}>
	<label for="input">
		<span class="label-span" class:label-span-disabled={disabled}>{label}</span>
	</label>
	<div class="input-wrapper">
		<input id="input" {disabled} bind:value on:blur on:change type="date" />
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
		transition: box-shadow 120ms ease-in-out, padding 120ms ease-in-out;
		width: 100%;
		margin: 0;

		box-shadow: inset 0 0 0 1px #999999;

		height: 48px;
		min-width: 8ch;
	}

	input:disabled {
		background-color: rgba(255, 255, 255, 0.4);
		box-shadow: inset 0 0 0 1px rgba(204, 204, 204, 0.4);
	}

	input:disabled[disabled] {
		background-color: rgba(255, 255, 255, 0.4);
	}

	input:hover {
		box-shadow: inset 0 0 0 1px #666666;
	}

	input:focus {
		box-shadow: inset 0 0 0 2px #3063e9;
	}

	input:active {
		box-shadow: inset 0 0 0 1px #3063e9;
	}

	input::placeholder {
		color: #999999;
		transition: color 120ms ease-in-out;
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
</style>
