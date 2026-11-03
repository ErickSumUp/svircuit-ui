<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type'> {
    /**
     * A clear and concise description of the input's purpose.
     */
    label: string;
    /**
     * Label to indicate that the checkbox is optional.
     */
    optionalLabel?: string;
    /**
     * An information or error message, displayed below the checkbox.
     */
    validationHint?: string;
    /**
     * Marks the input as invalid.
     */
    invalid?: boolean;
    /**
     * Marks the input as indeterminate. This is presentational only, the value
     * of an indeterminate checkbox is not included in form submissions.
     * Bindable.
     */
    indeterminate?: boolean;
    /**
     * Whether the checkbox is checked. Bindable. Default: `false`.
     */
    checked?: boolean;
  }

  let {
    label,
    optionalLabel,
    validationHint,
    invalid = false,
    indeterminate = $bindable(false),
    checked = $bindable(false),
    disabled,
    id: customId,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const id = $derived(customId || `checkbox-${uid}`);
  const validationHintId = `checkbox-${uid}-hint`;

  const isStatusMessage = $derived(!disabled && invalid);
  const ariaDescribedBy = $derived(
    [describedBy, validationHint && validationHintId].filter(Boolean).join(' ') || undefined
  );
</script>

<!--
  @component
  A checkbox with a label and an optional validation hint, for forms.
-->
<div class={['wrapper', className]} {style} data-disabled={disabled}>
  <input
    {...rest}
    {id}
    type="checkbox"
    aria-checked={indeterminate ? 'mixed' : undefined}
    aria-describedby={ariaDescribedBy}
    class={['base', 'hide-visually', invalid && 'invalid']}
    {disabled}
    bind:indeterminate
    bind:checked
  />
  <label for={id} class="label">
    <span class="label-text">
      {label}
      {#if optionalLabel}
        <span class="optional"> ({optionalLabel})</span>
      {/if}
    </span>
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" data-symbol="checked">
      <path
        fill="currentColor"
        d="m6.269 10.254 6.04-6.04A.68.68 0 0 1 12.808 4q.285 0 .499.214a.7.7 0 0 1 .213.508.7.7 0 0 1-.213.507l-6.54 6.557A.68.68 0 0 1 6.27 12a.68.68 0 0 1-.5-.214L2.706 8.722a.66.66 0 0 1-.205-.508.73.73 0 0 1 .223-.508.7.7 0 0 1 .508-.214q.294 0 .508.214z"
      />
    </svg>
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-symbol="indeterminate">
      <rect width="10" height="1.5" x="3" y="7.25" rx="0.75" />
    </svg>
  </label>
  {#if validationHint && !isStatusMessage}
    <div id={validationHintId} class="validation-hint">{validationHint}</div>
  {/if}
  <span role="status" aria-live="polite">
    {#if validationHint && isStatusMessage}
      <div id={validationHintId} class="validation-hint validation-hint-invalid">
        <div class="validation-hint-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 1.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5m2.33 4.42a.75.75 0 0 0-1.06 0L8 6.94 6.73 5.67a.75.75 0 1 0-1.06 1.06L6.94 8 5.67 9.27a.75.75 0 1 0 1.06 1.06L8 9.06l1.27 1.27a.75.75 0 0 0 1.06-1.06L9.06 8l1.27-1.27a.75.75 0 0 0 0-1.06"
            />
          </svg>
        </div>
        {validationHint}
      </div>
    {/if}
  </span>
</div>

<style>
  /* Wrapper — inlined from circuit's FieldWrapper */
  .wrapper[data-disabled='true'] {
    pointer-events: none;
  }

  /* Checkbox — inlined from circuit's CheckboxInput, aligned to the start */
  .label {
    --checkbox-size: 1.25rem;

    position: relative;
    display: inline-block;
    min-height: var(--checkbox-size);
    padding-left: var(--checkbox-size);
    color: var(--cui-fg-normal);
    cursor: pointer;
  }

  .label::before,
  .label svg {
    position: absolute;
    top: calc(var(--cui-body-m-line-height) / 2);
    left: 0;
    box-sizing: border-box;
    display: block;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
  }

  .label::before {
    content: '';
    background-color: var(--cui-bg-normal);
    border: var(--cui-border-width-kilo) solid var(--cui-border-normal);
    border-radius: var(--cui-border-radius-bit);
    box-shadow: none;
    transform: translateY(-50%);
    transition:
      border var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
  }

  .label svg {
    line-height: 0;
    color: var(--cui-fg-on-strong);
    opacity: 0;
    transform: translateY(-50%) scale(0, 0);
    transition:
      transform var(--cui-transitions-default),
      opacity var(--cui-transitions-default);
  }

  .base:hover + .label::before {
    border-color: var(--cui-border-accent-hovered);
  }

  .base:focus + .label::before {
    outline-width: var(--cui-border-width-mega);
    outline-style: solid;
    outline-color: var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
    border-color: var(--cui-border-accent);
  }

  .base:focus:not(:focus-visible) + .label::before {
    outline-color: transparent;
    border-color: var(--cui-border-normal);
  }

  .base:checked:focus:not(:focus-visible) + .label::before,
  .base:indeterminate:focus:not(:focus-visible) + .label::before {
    border-color: var(--cui-border-accent);
  }

  .base:checked:not(:indeterminate) + .label > svg[data-symbol='checked'],
  .base:indeterminate + .label > svg[data-symbol='indeterminate'] {
    opacity: 1;
    transform: translateY(-50%) scale(1, 1);
  }

  .base:checked + .label::before,
  .base:indeterminate + .label::before {
    background-color: var(--cui-bg-strong);
    border-color: var(--cui-border-accent);
  }

  .base:checked:disabled + .label::before,
  .base:indeterminate:disabled + .label::before {
    background-color: var(--cui-bg-strong-disabled);
    border-color: var(--cui-border-accent-disabled);
  }

  /* Invalid */

  .invalid + .label::before {
    background-color: var(--cui-bg-danger);
    border-color: var(--cui-border-danger);
  }

  .invalid:hover + .label::before,
  .invalid:focus + .label::before {
    border-color: var(--cui-border-danger-hovered);
  }

  .invalid:checked + .label::before,
  .invalid:indeterminate + .label::before {
    background-color: var(--cui-bg-danger-strong);
    border-color: var(--cui-border-danger);
  }

  .invalid:checked:disabled + .label::before,
  .invalid:indeterminate:disabled + .label::before {
    background-color: var(--cui-bg-danger-strong-disabled);
    border-color: var(--cui-border-danger-disabled);
  }

  /* Disabled */

  .base:disabled + .label {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
  }

  .base:disabled + .label::before {
    background-color: var(--cui-bg-normal-disabled);
    border-color: var(--cui-border-normal-disabled);
  }

  .base:disabled:checked + .label::before {
    background-color: var(--cui-bg-strong-disabled);
    border-color: var(--cui-border-accent-disabled);
  }

  /* Label — inlined from circuit's Checkbox */
  .label-text {
    display: inline-block;
    padding-left: var(--cui-spacings-byte);
  }

  .optional {
    color: var(--cui-fg-subtle);
  }

  /* Validation hint — inlined from circuit's FieldValidationHint, size `m` */
  .validation-hint {
    display: flex;
    margin-top: var(--cui-spacings-bit);
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
  }

  .wrapper[data-disabled='true'] .validation-hint {
    color: var(--cui-fg-subtle-disabled);
  }

  .validation-hint-invalid {
    color: var(--cui-fg-danger);
  }

  .validation-hint-icon {
    display: block;
    flex-shrink: 0;
    align-self: flex-start;
    width: var(--cui-icon-sizes-s);
    height: var(--cui-icon-sizes-s);
    margin-top: calc((var(--cui-body-s-line-height) - var(--cui-icon-sizes-s)) / 2);
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
    clip-path: rect(0 0 0 0);
  }
</style>
