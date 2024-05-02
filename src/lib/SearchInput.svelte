<script lang="ts">
  /**
   * A clear and concise description of the input purpose. Required for accessibility purposes.
   * @type {string}
   */
  export let label: string;
  /**
   * A unique identifier for the input field. Must be provided for accessibility.
   * @type {string} @default
   */
  export let id: string;
  /**
   * Label to indicate that the input is optional. Only displayed when the
   * `required` prop is falsy.
   * @type {string} @default ''
   */
  export let optionalLabel: string = '';
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   * @type {boolean} @default false
   */
  export let hideLabel: boolean = false;

  export let disabled = false;

  export let ariaDescribedBy = '';

  export let required = false;
  export let value: number | string = '';
</script>

<div class="input-wrapper" data-disabled={disabled}>
  <label for={id} class="label" data-disabled={disabled}>
    <span class="label-text" class:label-hide-visually={hideLabel} data-disabled={disabled}>
      {label}
      {#if optionalLabel && !required}
        <span class="label-text-optional"> ({optionalLabel})</span>
      {/if}
    </span>
  </label>
  <div class="wrapper">
    <svg
      class="prefix"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...$$restProps}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 7a5 5 0 1110 0A5 5 0 012 7zm5-7a7 7 0 104.192 12.606l3.1 3.101a1 1 0 001.415-1.414l-3.1-3.1A7 7 0 007 0z"
        fill="currentColor"
      />
    </svg>
    <input
      {id}
      bind:value
      aria-describedby={ariaDescribedBy}
      class="close-button"
      class:has-prefix={true}
      class:has-suffix={$$slots.suffix}
      class:select--disabled={disabled}
      {disabled}
      {required}
      on:change
      aria-label={label}
      {...$$restProps}
    />
    <slot name="suffix" class="suffix" />
  </div>
</div>

<style>
  .input-wrapper[data-disabled='true'] {
    pointer-events: none;
  }

  .label {
    display: block;
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
  }

  .wrapper {
    position: relative;
  }

  .close-button {
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

  .close-button:hover {
    box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
  }

  .close-button:focus {
    box-shadow: 0 0 0 2px var(--cui-border-accent);
  }

  .close-button:active {
    box-shadow: 0 0 0 1px var(--cui-border-accent);
  }

  .close-button::placeholder {
    color: var(--cui-fg-placeholder);
    transition: color var(--cui-transitions-default);
  }

  .close-button:placeholder-shown {
    text-overflow: ellipsis;
  }

  .close-button:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  .close-button::-ms-expand {
    display: none;
  }

  /* Validations */

  .close-button[aria-invalid='true'] {
    box-shadow: 0 0 0 1px var(--cui-border-danger);
  }

  .close-button[aria-invalid='true']:hover {
    box-shadow: 0 0 0 1px var(--cui-border-danger-hovered);
  }

  .close-button[aria-invalid='true']:focus {
    box-shadow: 0 0 0 2px var(--cui-border-danger);
  }

  .close-button[aria-invalid='true']:active {
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

  .close-button-icon {
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

  [data-disabled='true'] .validation-hint {
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

  .wrapper button.prefix,
  .wrapper button.suffix,
  .wrapper .prefix button,
  .wrapper .suffix button {
    pointer-events: auto;
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

  .close-button:disabled,
  .close-button[disabled],
  .close-button[data-disabled='true'],
  .close-button[aria-disabled='true'] {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal-disabled);
    box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
  }

  .close-button[readonly] {
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

  .wrapper button.prefix,
  .wrapper button.suffix,
  .wrapper .prefix button,
  .wrapper .suffix button {
    pointer-events: auto;
  }

  /* Field */
  .validation-hint-valid {
    color: var(--cui-fg-success);
  }

  [disabled] .validation-hint-valid,
  :global([data-disabled='true']) .validation-hint-valid {
    color: var(--cui-fg-success-disabled);
  }

  .validation-hint-warning {
    color: var(--cui-fg-warning);
  }

  [disabled] .validation-hint-warning,
  :global([data-disabled='true']) .warning {
    color: var(--cui-fg-warning-disabled);
  }

  .validation-hint-invalid {
    color: var(--cui-fg-danger);
  }

  [disabled] .validation-hint-invalid,
  :global([data-disabled='true']) .validation-hint-invalid {
    color: var(--cui-fg-danger-disabled);
  }
</style>
