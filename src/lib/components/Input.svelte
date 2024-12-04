<script lang="ts">
  import { type Snippet } from 'svelte';
  import { type HTMLInputTypeAttribute } from 'svelte/elements';

  interface Props {
    /**
     * A clear and concise description of the input purpose. Required for accessibility purposes.
     * @type {string}
     */
    label: string;
    /**
     * A unique identifier for the input field. Must be provided for accessibility.
     * @type {string} @default
     */
    id: string;
    /**
     * An information, warning or error message, displayed below the input.
     * @type {string} @default ''
     */
    validationHint?: string;
    /**
     * Label to indicate that the input is optional. Only displayed when the
     * `required` prop is falsy.
     * @type {string} @default ''
     */
    optionalLabel?: string;
    /**
     * Triggers error styles on the component. Important for accessibility.
     * @type {boolean} @default false
     */
    invalid?: boolean;
    /**
     * Triggers warning styles on the component.
     * @type {boolean} @default false
     */
    hasWarning?: boolean;
    /**
     * Enables valid styles on the component.
     * @type {boolean} @default false
     */
    showValid?: boolean;
    /**
     * Aligns text to the right in the input
     * @type {boolean} @default false
     */
    textAlignRight?: boolean;
    /**
     * Visually hide the label. This should only be used in rare cases and only
     * if the purpose of the field can be inferred from other context.
     * @type {boolean} @default false
     */
    hideLabel?: boolean;
    /**
     * Disables the input field.
     * @type {boolean} @default false
     */
    disabled?: boolean;
    /**
     * Aria described by
     * @type {string} @default ''
     */
    ariaDescribedBy?: string;
    /**
     * Sets if the input is required, this will be used in forms.
     * @type {boolean}
     */
    required?: boolean;
    /**
     * The value of the input field.
     * @type {string}
     */
    value?: number | string;
    type?: HTMLInputTypeAttribute | undefined | null;
    placeholder?: string;
    readonly?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
  }

  let {
    label,
    id,
    validationHint = '',
    optionalLabel = '',
    invalid = false,
    hasWarning = false,
    showValid = false,
    textAlignRight = false,
    hideLabel = false,
    disabled = false,
    ariaDescribedBy = '',
    required = false,
    value = $bindable(''),
    prefix,
    suffix,
    type,
    placeholder,
    readonly,
    ...rest
  }: Props = $props();
</script>

<div class="container" data-disabled={disabled} aria-disabled={disabled}>
  <label for={id} class="label" data-disabled={disabled}>
    <span class="label-text" class:label-hide-visually={hideLabel} data-disabled={disabled}>
      {label}
      {#if optionalLabel && !required}
        <span class="label-text-optional"> ({optionalLabel})</span>
      {/if}
    </span>
  </label>
  <div class="wrapper">
    {@render prefix?.()}
    <input
      {id}
      bind:value
      aria-describedby={ariaDescribedBy}
      class="base"
      class:warning={!disabled && hasWarning}
      class:has-prefix={prefix}
      class:has-suffix={suffix}
      class:select--invalid={invalid && !disabled}
      class:select--disabled={disabled}
      class:align-right={textAlignRight}
      aria-invalid={invalid}
      {disabled}
      {required}
      aria-label={label}
      {type}
      {placeholder}
      {readonly}
      {...rest}
    />
    {@render suffix?.()}
  </div>
  {#if validationHint && (!(invalid || hasWarning || showValid) || disabled)}
    <div
      class="validation-hint"
      data-disabled={disabled}
      class:validation-hint-invalid={!disabled && invalid}
      class:validation-hint-warning={!disabled && hasWarning}
      class:validation-hint-valid={!disabled && showValid}
    >
      {validationHint}
    </div>
  {/if}
  <span role="status" aria-live="polite">
    {#if validationHint && !disabled && (invalid || hasWarning || showValid)}
      <div
        class="validation-hint"
        data-disabled={disabled}
        class:validation-hint-invalid={invalid}
        class:validation-hint-warning={hasWarning}
        class:validation-hint-valid={showValid}
      >
        <div class="validation-hint-icon">
          <svg
            aria-hidden="true"
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
        {validationHint}
      </div>
    {/if}
  </span>
</div>

<style>
  .container {
    flex-grow: 1;
  }

  .label {
    display: block;
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
  }

  .wrapper {
    position: relative;
  }

  .base {
    width: 100%;
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    margin: 0;
    font-size: var(--cui-typography-body-one-font-size);
    line-height: var(--cui-typography-body-one-line-height);
    appearance: none;
    background-color: var(--cui-bg-normal);
    border: 0;
    border-radius: var(--cui-border-radius-byte);
    outline: 0;
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

  .base::placeholder {
    color: var(--cui-fg-placeholder);
    transition: color var(--cui-transitions-default);
  }

  .base:placeholder-shown {
    text-overflow: ellipsis;
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

  .validation-hint {
    display: flex;
    margin-top: var(--cui-spacings-bit);
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
  }

  [data-disabled='true'] .validation-hint,
  :global([data-disabled='true']) .validation-hint {
    pointer-events: none;
    color: var(--cui-fg-subtle-disabled);
  }

  .validation-hint-invalid {
    color: var(--cui-fg-danger);
  }

  [data-disabled='true'] .validation-hint-invalid {
    color: var(--cui-fg-danger-disabled);
  }

  .validation-hint-icon {
    display: block;
    flex-shrink: 0;
    align-self: flex-start;
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
    margin-top: calc((var(--cui-typography-body-two-line-height) - var(--cui-icon-sizes-kilo)) / 2);
    margin-right: var(--cui-spacings-bit);
  }

  .wrapper .prefix,
  .wrapper .suffix {
    position: absolute;
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    color: var(--cui-fg-subtle);
    pointer-events: none;
  }

  .wrapper .suffix {
    top: 0;
    right: 0;
    transition: right var(--cui-transitions-default);
  }

  .wrapper {
    position: relative;
  }

  .warning {
    box-shadow: 0 0 0 1px var(--cui-border-warning);
  }

  .warning:hover {
    box-shadow: 0 0 0 1px var(--cui-border-warning-hovered);
  }

  .warning:focus {
    box-shadow: 0 0 0 2px var(--cui-border-warning);
  }

  .warning:active {
    box-shadow: 0 0 0 1px var(--cui-border-warning-pressed);
  }

  .warning:not(:focus):not([disabled])::placeholder {
    color: var(--cui-fg-warning);
  }

  .base:disabled,
  .base[disabled],
  .base[data-disabled='true'],
  .base[aria-disabled='true'] {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal-disabled);
    box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
  }

  .base[readonly] {
    background-color: var(--cui-bg-subtle-disabled);
  }

  /* Alignment */

  .align-right {
    text-align: right;
  }

  /* Prefix & suffix */

  .has-prefix {
    padding-left: var(--cui-spacings-exa);
  }

  .has-suffix {
    padding-right: var(--cui-spacings-exa);
  }

  .wrapper .prefix,
  .wrapper .suffix {
    position: absolute;
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    color: var(--cui-fg-subtle);
    pointer-events: none;
  }

  .wrapper .suffix {
    top: 0;
    right: 0;
    transition: right var(--cui-transitions-default);
  }

  /* Field */
  .validation-hint-valid {
    color: var(--cui-fg-success);
  }

  [data-disabled='true'] .validation-hint-valid,
  :global([data-disabled='true']) .validation-hint-valid {
    color: var(--cui-fg-success-disabled);
  }

  .validation-hint-warning {
    color: var(--cui-fg-warning);
  }

  [data-disabled='true'] .validation-hint-warning,
  :global([data-disabled='true']) .warning {
    color: var(--cui-fg-warning-disabled);
  }

  .validation-hint-invalid {
    color: var(--cui-fg-danger);
  }

  [data-disabled='true'] .validation-hint-invalid,
  :global([data-disabled='true']) .validation-hint-invalid {
    color: var(--cui-fg-danger-disabled);
  }
</style>
