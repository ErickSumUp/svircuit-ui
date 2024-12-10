<script lang="ts">
  import { type ChangeEventHandler } from 'svelte/elements';
  import { type Snippet } from 'svelte';

  interface Props {
    /**
     * Label for the select element.
     */
    label?: string;
    /**
     * Name of the select form element.
     */
    name?: string;
    /**
     * Whether the select is disabled or not.
     */
    disabled?: boolean;
    /**
     * Whether the select is invalid or not.
     */
    invalid?: boolean;
    /**
     * Value of the select element.
     */
    value?: number | string;
    /**
     * Size of the select element.
     */
    size?: 's' | 'm';
    /**
     * An information or error message, displayed below the select.
     */
    validationHint?: string;
    /**
     * Label to indicate that the select is optional. Only displayed when the `required` prop is falsy.
     */
    optionalLabel?: string;
    /**
     * Aria-describedby attribute for the select element.
     */
    ariaDescribedBy?: string;
    /**
     * Whether the field is required or not.
     */
    required?: boolean;
    /**
     * Whether the label should be hidden visually.
     */
    hideLabel?: boolean;
    /**
     * A unique identifier for the input field. Must be defined.
     */
    id: string;
    onchange?: ChangeEventHandler<HTMLSelectElement>;
    prefix?: Snippet;
    suffix?: Snippet;
    children: Snippet;
  }

  let {
    label = '',
    name = 'select',
    disabled = false,
    invalid = false,
    value = $bindable(''),
    size = 'm',
    validationHint = '',
    optionalLabel = '',
    ariaDescribedBy,
    required = false,
    hideLabel = false,
    id,
    onchange,
    prefix,
    children,
    ...rest
  }: Props = $props();

  let iconSize = $derived(size === 's' ? 16 : 24);
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
    {@render prefix?.()}
    <select
      class="base"
      class:s={size === 's'}
      class:m={size === 'm'}
      class:has-prefix={prefix}
      class:select--invalid={invalid && !disabled}
      class:select--disabled={disabled}
      {id}
      {name}
      {required}
      {disabled}
      aria-label={label}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedBy}
      {onchange}
      bind:value
      {...rest}
    >
      {@render children?.()}
    </select>
    <svg
      class="icon {size}"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 {iconSize} {iconSize}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {#if size === 's'}
        <path
          d="M8 11c-.266 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 3 6a1 1 0 0 1 1-1c.266 0 .52.104.71.29L8 8.58l3.29-3.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .266-.104.52-.29.71l-4 4c-.19.186-.444.29-.71.29z"
          fill="currentColor"
        />
      {:else}
        <path
          d="M12 15c-.265 0-.52-.104-.71-.29l-4-4A1.013 1.013 0 0 1 7 10a1 1 0 0 1 1-1c.266 0 .52.104.71.29L12 12.58l3.29-3.29c.19-.186.445-.29.71-.29a1 1 0 0 1 1 1c0 .265-.104.52-.29.71l-4 4c-.19.186-.445.29-.71.29z"
          fill="currentColor"
        />
      {/if}
    </svg>
  </div>
  {#if validationHint && !invalid}
    <div
      class="validation-hint"
      data-disabled={disabled}
      class:validation-hint-disabled={disabled}
      class:validation-hint-invalid={!disabled && invalid}
    >
      {validationHint}
    </div>
  {/if}
  <span role="status" aria-live="polite">
    {#if validationHint && invalid}
      <div
        class="validation-hint"
        data-disabled={disabled}
        class:validation-hint-disabled={disabled}
        class:validation-hint-invalid={invalid}
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
            <path
              d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3 11a1 1 0 0 1-1.41 0L8 9.41 6.41 11A1 1 0 0 1 5 9.59L6.59 8 5 6.41A1 1 0 0 1 5 5a1 1 0 0 1 1.41 0L8 6.59 9.59 5A1 1 0 0 1 11 5a1 1 0 0 1 0 1.41L9.41 8 11 9.59A1 1 0 0 1 11 11z"
              fill="currentColor"
            />
          </svg>
        </div>
        {validationHint}
      </div>
    {/if}
  </span>
</div>

<style>
  .field-wrapper {
    flex-grow: 1;
  }

  .field-wrapper[data-disabled='true'] {
    pointer-events: none;
  }

  .label {
    display: block;
    font-size: var(--cui-typography-body-m-font-size);
    line-height: var(--cui-typography-body-m-line-height);
  }

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    color: var(--cui-fg-normal);
  }

  .base {
    position: relative;
    z-index: var(--cui-z-index-input);
    width: 100%;
    min-width: max-content;
    margin: 0;
    overflow-x: hidden;
    font-size: var(--cui-typography-body-s-font-size);
    line-height: var(--cui-typography-body-s-line-height);
    color: var(--cui-fg-normal);
    text-overflow: ellipsis;
    white-space: nowrap;
    appearance: none;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: 0;
    border-radius: var(--cui-border-radius-byte);
    outline: none;
    box-shadow: 0 0 0 1px var(--cui-border-normal);
    transition:
      box-shadow var(--cui-transitions-default),
      padding var(--cui-transitions-default);
  }

  .base.s {
    padding: var(--cui-spacings-bit) var(--cui-spacings-exa) var(--cui-spacings-bit)
      var(--cui-spacings-kilo);
  }

  .base.m {
    padding: var(--cui-spacings-kilo) var(--cui-spacings-exa) var(--cui-spacings-kilo)
      var(--cui-spacings-kilo);
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
    color: var(--cui-fg-subtle);
    pointer-events: none;
    width: auto;
    height: auto;
  }

  .icon.s {
    padding: var(--cui-spacings-byte);
    padding-right: var(--cui-spacings-kilo);
  }

  .icon.m {
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega) var(--cui-spacings-kilo)
      var(--cui-spacings-kilo);
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

  .validation-hint {
    display: flex;
    margin-top: var(--cui-spacings-bit);
    font-size: var(--cui-typography-body-m-font-size);
    line-height: var(--cui-typography-body-m-line-height);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
  }

  .validation-hint-disabled {
    color: var(--cui-fg-subtle-disabled);
  }

  .validation-hint-invalid {
    color: var(--cui-fg-danger);
  }

  [data-disabled='true'] .validation-hint {
    color: var(--cui-fg-danger-disabled);
  }

  .validation-hint-icon {
    display: block;
    flex-shrink: 0;
    align-self: flex-start;
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
    margin-top: calc((var(--cui-typography-body-m-line-height) - var(--cui-icon-sizes-kilo)) / 2);
    margin-right: var(--cui-spacings-bit);
  }
</style>
