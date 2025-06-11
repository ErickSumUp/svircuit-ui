<script lang="ts">
  interface Props {
    /**
     * A unique identifier for the input field. Must be provided for accessibility.
     * @type {string} @default
     */
    id: string;
    /**
     * The name of the input radio field, it is used to tie the radio inputs together.
     */
    name: string;
    /**
     * Value of the input field.
     * @type {string} @default ''
     */
    value: string | number;
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
     * Aria described by, for accessibility.
     * @type {string} @default ''
     */
    ariaDescribedBy?: string;
    /**
     * Disables the input field.
     * @type {boolean} @default false
     */
    disabled?: boolean;
    /**
     * Disables the input field.
     * @type {boolean} @default false
     */
    invalid?: boolean;
    /**
     * Sets if the input is required, this will be used in forms.
     * @type {boolean}
     */
    required?: boolean;
    group: string | number;
    [key: string]: unknown;
  }

  let {
    label,
    description,
    id,
    group = $bindable(),
    disabled = false,
    invalid = false,
    ariaDescribedBy = '',
    required = false,
    value,
    ...rest
  }: Props = $props();
</script>

<div class="wrapper" data-disabled={disabled} aria-invalid={invalid ? 'true' : 'false'}>
  <input
    {id}
    aria-describedby={ariaDescribedBy}
    class="base hide-visually"
    {disabled}
    {required}
    aria-label={label}
    type="radio"
    bind:group
    {value}
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
