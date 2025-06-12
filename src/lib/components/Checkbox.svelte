<script lang="ts">
  import Alert from '$lib/icons/Alert.svelte';
  import type { Action } from 'svelte/action';

  interface Props {
    id: string;
    /**
     * A clear and concise description of the input's purpose.
     */
    label?: string;
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
     */
    indeterminate?: boolean;
    disabled?: boolean;
    checked?: boolean;
    [key: string]: unknown;
  }

  let {
    id,
    label,
    optionalLabel,
    validationHint,
    invalid = false,
    indeterminate = $bindable(false),
    checked = $bindable(false),
    disabled = false,
    ...rest
  }: Props = $props();

  let hasMessage = $derived(Boolean(validationHint));
  let isStatusMessage = $derived(invalid);

  let align = 'center';
</script>

<div class="wrapper" data-disabled={disabled} {disabled}>
  <input
    {id}
    type="checkbox"
    aria-checked={indeterminate ? 'mixed' : undefined}
    class="base hide-visually"
    bind:indeterminate
    bind:checked
    class:invalid
    {disabled}
    {...rest}
  />
  <label for={id} class="label" class:center={align === 'center'} class:start={align === 'start'}>
    <span class="label-text">
      {label}
      {#if optionalLabel}
        <span class="optional"> ({optionalLabel})</span>
      {/if}
    </span>
    {#if indeterminate}
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        data-symbol="indeterminate"
      >
        <rect width="10" height="2" x="3" y="7" rx="1" />
      </svg>
    {:else if !disabled && !indeterminate && checked}
      <svg
        width={16}
        height={16}
        viewBox="0 0 {16}  {16}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        data-symbol="checked"
        {...rest}
      >
        <path
          d="M5.992 14.5a.992.992 0 0 1-.707-.293l-5-5A1 1 0 0 1 1.7 7.794L5.909 12l8.308-10.125a1.001 1.001 0 1 1 1.563 1.251l-9.006 11a1 1 0 0 1-.726.375l-.056-.001z"
          fill="currentColor"
        />
      </svg>
    {/if}
  </label>
  {#if hasMessage && !isStatusMessage}
    <div class="validation-hint" class:invalid={!disabled && invalid}>
      {validationHint}
    </div>
  {/if}
  <span role="status" aria-live="polite">
    {#if hasMessage && isStatusMessage}
      <div class="validation-hint" class:invalid={!disabled && invalid}>
        {#if !disabled}
          <div class="validation-hint-icon">
            <Alert aria-hidden="true" size="16" />
          </div>
        {/if}
        {validationHint}
      </div>
    {/if}
  </span>
</div>

<style>
  /* Wrapper */
  .wrapper[disabled],
  .wrapper[data-disabled='true'] {
    pointer-events: none;
  }

  .label {
    --checkbox-size: 20px;

    position: relative;
    display: inline-block;
    min-height: var(--cui-body-m-line-height);
    padding-left: var(--checkbox-size);
    color: var(--cui-fg-normal);
    cursor: pointer;
  }

  .label::before,
  .label svg {
    position: absolute;
    left: 0;
    box-sizing: border-box;
    display: block;
    width: var(--checkbox-size);
    height: var(--checkbox-size);
  }

  .label.center::before,
  .label.center svg {
    top: 50%;
  }

  .label.start::before,
  .label.start svg {
    top: calc(var(--cui-body-m-line-height) / 2);
  }

  .label::before {
    content: '';
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: 3px;
    box-shadow: none;
    transform: translateY(-50%);
    transition:
      border var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
  }

  .label svg {
    padding: 2px;
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
    outline: 0;
    border-color: var(--cui-border-accent);
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .base:focus:not(:focus-visible) + .label::before {
    border-color: var(--cui-border-normal);
    box-shadow: none;
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
    background-color: var(--cui-bg-accent-strong);
    border-color: var(--cui-border-accent);
  }

  .base:checked:disabled + .label::before,
  .base:checked[disabled] + .label::before,
  .base:indeterminate:disabled + .label::before,
  .base:indeterminate[disabled] + .label::before {
    background-color: var(--cui-bg-accent-strong-disabled);
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
  .invalid:indeterminate:disabled + .label::before,
  .invalid:checked[disabled] + .label::before,
  .invalid:indeterminate[disabled] + .label::before {
    background-color: var(--cui-bg-danger-strong-disabled);
    border-color: var(--cui-border-danger-disabled);
  }

  /* Disabled */

  .base:disabled + .label,
  .base[disabled] + .label {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
  }

  .base:disabled + .label::before,
  .base[disabled] + .label::before {
    background-color: var(--cui-bg-normal-disabled);
    border-color: var(--cui-border-normal-disabled);
  }

  .base:disabled:checked + .label::before,
  .base[disabled]:checked + .label::before {
    background-color: var(--cui-bg-accent-strong-disabled);
    border-color: var(--cui-border-accent-disabled);
  }

  /* hide visually */
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

  /* label */
  .label-text {
    display: inline-block;
    padding-left: var(--cui-spacings-byte);
  }

  .optional {
    color: var(--cui-fg-subtle);
  }

  /* validation hint */
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

  .invalid {
    color: var(--cui-fg-danger);
  }

  [disabled] .invalid,
  :global([data-disabled='true']) .invalid {
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
</style>
