<script lang="ts">
  import type { HTMLFieldsetAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLFieldsetAttributes {
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
     * Hides the label visually but keeps it accessible for screen readers.
     * @type {boolean} @default false
     */
    hideLabel?: boolean;
    /**
     * Disables the input field.
     * @type {boolean} @default false
     */
    disabled?: boolean;
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
     * Sets if the input is required, this will be used in forms.
     * @type {boolean}
     */
    required?: boolean;
    optionalLabel?: string;
    invalid?: boolean;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    label,
    id,
    validationHint = '',
    hideLabel = false,
    disabled = false,
    ariaDescribedBy = '',
    required = false,
    invalid = false,
    hasWarning = false,
    showValid = false,
    optionalLabel,
    children,
    ...rest
  }: Props = $props();
</script>

<fieldset
  {id}
  class="fieldset"
  role="radiogroup"
  aria-describedby={ariaDescribedBy}
  aria-orientation="vertical"
  aria-invalid={invalid === true ? 'true' : 'false'}
  aria-required={required === true ? 'true' : 'false'}
  {disabled}
  {...rest}
>
  <legend class="legend">
    <span class="label-text" class:hide-visually={hideLabel}>
      {label}
      {#if !required && optionalLabel}
        <span class="label-text-optional">
          ({optionalLabel})
        </span>
      {/if}
    </span>
  </legend>
  {@render children()}
  {#if validationHint && !(invalid || hasWarning || showValid)}
    <div class="validation-hint" data-disabled={disabled}>
      {validationHint}
    </div>
  {:else if validationHint && !disabled && (invalid || hasWarning || showValid)}
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
</fieldset>

<style>
  .fieldset {
    padding: 0;
    margin: 0;
    border: none;
  }

  .wrapper[disabled],
  .wrapper[data-disabled='true'],
  .fieldset[disabled],
  .fieldset[data-disabled='true'] {
    pointer-events: none;
  }

  .label,
  .legend {
    display: block;
    width: 100%;
  }

  .legend {
    padding: 0;
  }

  .label-text {
    display: block;
    margin-bottom: var(--cui-spacings-bit);
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
  }

  [disabled] .label-text,
  :global([data-disabled='true']) .label-text {
    color: var(--cui-fg-normal-disabled);
  }

  .label-text-optional {
    color: var(--cui-fg-subtle);
  }

  [disabled] .label-text-optional,
  :global([data-disabled='true']) .label-text-optional {
    color: var(--cui-fg-subtle-disabled);
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

  .validation-hint {
    display: flex;
    margin-top: var(--cui-spacings-bit);
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
  }

  [disabled] .validation-hint,
  :global([data-disabled='true']) .validation-hint {
    color: var(--cui-fg-subtle-disabled);
  }

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
  :global([data-disabled='true']) .validation-hint-warning {
    color: var(--cui-fg-warning-disabled);
  }

  .validation-hint-invalid {
    color: var(--cui-fg-danger);
  }

  [disabled] .validation-hint-invalid,
  :global([data-disabled='true']) .validation-hint-invalid {
    color: var(--cui-fg-danger-disabled);
  }

  .validation-hint-icon {
    display: block;
    flex-shrink: 0;
    align-self: flex-start;
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
    margin-top: calc((var(--cui-body-s-line-height) - var(--cui-icon-sizes-kilo)) / 2);
    margin-right: var(--cui-spacings-bit);
  }

  .hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip: rect(0 0 0 0);
  }
</style>
