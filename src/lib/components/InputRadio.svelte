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
     * A longer description of the input purpose. Displayed below the input.
     * @type {string} @default ''
     */
    description?: string;
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
    maxLength?: number;
    type?: HTMLInputTypeAttribute | undefined | null;
    placeholder?: string;
    readonly?: boolean;
    prefix?: Snippet;
    suffix?: Snippet;
    [key: string]: unknown;
  }

  let {
    label,
    description,
    id,
    validationHint = '',
    checked = false,
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

<div class="wrapper" data-disabled={false}>
  <input
    {id}
    bind:value
    aria-describedby={ariaDescribedBy}
    class="base hide-visually"
    {checked}
    {disabled}
    {required}
    aria-label={label}
    type="radio"
    {placeholder}
    {readonly}
    {...rest}
  />
  <label for={id} class="label"
    >{label}
    {#if description}
      <span class="description" aria-hidden="true">{description}</span>
    {/if}
  </label>
  {#if description}
    <p class="hide-visually">
      {description}
    </p>
  {/if}
</div>

<style>
  .wrapper[disabled],
  .wrapper[data-disabled='true'] {
    pointer-events: none;
  }

  .description {
    display: block;
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-subtle);
  }

  [disabled] .description,
  :global([data-disabled='true']) .description {
    color: var(--cui-fg-subtle-disabled);
  }

  .label {
    position: relative;
    display: inline-block;
    padding-left: 26px;
    color: var(--cui-fg-normal);
    cursor: pointer;
  }

  .label::before {
    position: absolute;
    top: calc(var(--cui-body-m-line-height) / 2);
    left: 0;
    box-sizing: border-box;
    display: block;
    width: 18px;
    height: 18px;
    content: '';
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: 100%;
    box-shadow: none;
    transition:
      border var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
    transform: translateY(-50%);
  }

  .label::after {
    position: absolute;
    top: calc(var(--cui-body-m-line-height) / 2);
    left: var(--cui-spacings-bit);
    box-sizing: border-box;
    display: block;
    width: 10px;
    height: 10px;
    content: '';
    background-color: var(--cui-fg-accent);
    border-radius: 100%;
    opacity: 0;
    transition:
      transform var(--cui-transitions-default),
      opacity var(--cui-transitions-default);
    transform: translateY(-50%) scale(0, 0);
  }

  .hide-visually {
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

  .base:hover + label::before {
    border-color: var(--cui-border-normal-hovered);
  }

  .base:focus + label::before {
    border-color: var(--cui-border-accent);
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .base:focus:not(:focus-visible) + label::before {
    border-color: var(--cui-border-normal);
    box-shadow: none;
  }

  .base:checked:focus:not(:focus-visible) + label::before {
    border-color: var(--cui-border-accent);
  }

  .base:checked + label::before {
    border-color: var(--cui-border-accent);
  }

  .base:checked + label::after {
    opacity: 1;
    transform: translateY(-50%) scale(1, 1);
  }

  .base:disabled + label,
  .base[disabled] + label {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
  }

  .base:disabled + label::before,
  .base[disabled] + label::before {
    background-color: var(--cui-bg-normal-disabled);
    border-color: var(--cui-border-normal-disabled);
  }

  .base:disabled + label::after,
  .base[disabled] + label::after {
    background-color: var(--cui-fg-on-strong-disabled);
  }

  .base:disabled:checked + label::before,
  .base[disabled]:checked + label::before {
    border-color: var(--cui-border-accent-disabled);
  }

  .base:disabled:checked + label::after,
  .base[disabled]:checked + label::after {
    background-color: var(--cui-fg-accent-disabled);
  }

  /* Invalid */

  [aria-invalid='true'] .base:not(:focus) + .label::before {
    background-color: var(--cui-bg-danger);
    border-color: var(--cui-border-danger);
  }

  [aria-invalid='true'] .base:not(:focus) + .label::after {
    background-color: var(--cui-fg-danger);
  }

  [aria-invalid='true'] .base:hover + .label::before,
  [aria-invalid='true'] .base:focus + .label::before {
    border-color: var(--cui-border-danger-hovered);
  }

  [aria-invalid='true'] .base:checked + .label::before {
    border-color: var(--cui-border-danger);
  }
</style>
