<script lang="ts" module>
  export type SelectOption = {
    value: string | number;
    label: string;
    disabled?: boolean;
  };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLSelectAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLSelectAttributes, 'size' | 'prefix'> {
    /**
     * A clear and concise description of the select's purpose.
     */
    label: string;
    /**
     * Visually hide the label. Only use it in rare cases, when the purpose of
     * the field can be inferred from other context.
     */
    hideLabel?: boolean;
    /**
     * Label to indicate that the select is optional. Only displayed when
     * `required` is falsy.
     */
    optionalLabel?: string;
    /**
     * The options to choose from. Alternatively, pass `<option>` elements as
     * children.
     */
    options?: SelectOption[];
    /**
     * The text of the empty option. It stays in the list so an optional
     * selection can be cleared; when `required`, it is removed once an option
     * is selected.
     */
    placeholder?: string;
    /**
     * An information or error message, displayed below the select.
     */
    validationHint?: string;
    /**
     * Triggers error styles. Important for accessibility.
     */
    invalid?: boolean;
    /**
     * Choose from 2 sizes. Default: `m`.
     */
    size?: 's' | 'm';
    /**
     * Rendered before the select, usually an icon. Put the `class` it
     * receives on the root element to position it. Receives the select's
     * `value`.
     */
    prefix?: Snippet<[{ class: string; value: string | number | undefined }]>;
    /**
     * The value of the selected option. Bindable.
     */
    value?: string | number;
    children?: Snippet;
  }

  let {
    label,
    hideLabel = false,
    optionalLabel,
    options,
    placeholder,
    validationHint,
    invalid = false,
    size = 'm',
    prefix,
    value = $bindable(),
    children,
    id: customId,
    required,
    disabled,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const id = $derived(customId || `select-${uid}`);
  const validationHintId = `select-${uid}-hint`;

  const showInvalid = $derived(invalid && !disabled);
  const ariaDescribedBy = $derived(
    [describedBy, validationHint && validationHintId].filter(Boolean).join(' ') || undefined
  );
</script>

<!--
  @component
  A native select for choosing one option from a list.
-->
<div class={['field', size, className]} {style} data-disabled={disabled}>
  <label class="label" for={id}>
    <span class={['label-text', hideLabel && 'hide-visually']}>
      {label}
      {#if optionalLabel && !required}
        <span class="label-text-optional"> ({optionalLabel})</span>
      {/if}
    </span>
  </label>
  <div class="wrapper">
    {@render prefix?.({ class: 'select-prefix', value })}
    <select
      {id}
      class={['base', prefix && 'has-prefix']}
      aria-describedby={ariaDescribedBy}
      aria-invalid={invalid ? 'true' : undefined}
      {required}
      {disabled}
      {...rest}
      bind:value
    >
      {#if !required || !value}
        <option value="">{placeholder}</option>
      {/if}
      {#if children}
        {@render children()}
      {:else if options}
        {#each options as option (option.value)}
          <option value={option.value} disabled={option.disabled}>{option.label}</option>
        {/each}
      {/if}
    </select>
    {#if size === 's'}
      <svg class="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M11.528 6.528a.667.667 0 0 1 .944.944l-4 4a.667.667 0 0 1-.944 0l-4-4a.667.667 0 0 1 .944-.944L8 10.057z"
        />
      </svg>
    {:else}
      <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.293 8.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L12 13.586z"
        />
      </svg>
    {/if}
  </div>
  {#if validationHint && !showInvalid}
    <div id={validationHintId} class="validation-hint">{validationHint}</div>
  {/if}
  <span role="status" aria-live="polite">
    {#if validationHint && showInvalid}
      <div id={validationHintId} class="validation-hint invalid">
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
  /* Field — inlined from circuit's FieldWrapper, FieldLabel, FieldLabelText
     and FieldValidationHint */
  .field[data-disabled='true'] {
    pointer-events: none;
  }

  .label {
    display: block;
    width: 100%;
  }

  .label-text {
    display: block;
    margin-bottom: var(--cui-spacings-bit);
  }

  .field[data-disabled='true'] .label-text {
    color: var(--cui-fg-normal-disabled);
  }

  .label-text-optional {
    color: var(--cui-fg-subtle);
  }

  .field[data-disabled='true'] .label-text-optional {
    color: var(--cui-fg-subtle-disabled);
  }

  .validation-hint {
    display: flex;
    margin-top: var(--cui-spacings-bit);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
  }

  .field[data-disabled='true'] .validation-hint {
    color: var(--cui-fg-subtle-disabled);
  }

  .validation-hint.invalid {
    color: var(--cui-fg-danger);
  }

  .validation-hint-icon {
    display: block;
    flex-shrink: 0;
    align-self: flex-start;
    width: var(--cui-icon-sizes-s);
    height: var(--cui-icon-sizes-s);
    margin-right: var(--cui-spacings-bit);
  }

  .s {
    --field-input-padding-block: calc(
      calc(var(--cui-spacings-kilo) / 2) - var(--cui-border-width-kilo)
    );
    --field-input-padding-inline: var(--cui-spacings-byte);
    --field-input-font-size: var(--cui-body-s-font-size);
    --field-input-line-height: var(--cui-body-s-line-height);
    --field-input-border-radius: var(--cui-border-radius-byte);
  }

  .s .label-text,
  .s .validation-hint {
    font-size: var(--cui-compact-s-font-size);
    line-height: var(--cui-compact-s-line-height);
  }

  .s .validation-hint-icon {
    margin-top: calc((var(--cui-compact-s-line-height) - var(--cui-icon-sizes-s)) / 2);
  }

  .m {
    --field-input-padding-block: var(--cui-spacings-kilo);
    --field-input-padding-inline: var(--cui-spacings-mega);
    --field-input-font-size: var(--cui-body-m-font-size);
    --field-input-line-height: var(--cui-body-m-line-height);
    --field-input-border-radius: var(--cui-border-radius-kilo);
  }

  .m .label-text,
  .m .validation-hint {
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
  }

  .m .validation-hint-icon {
    margin-top: calc((var(--cui-body-s-line-height) - var(--cui-icon-sizes-s)) / 2);
  }

  /* Select — from circuit's Select */
  .wrapper {
    position: relative;
    display: block;
    color: var(--cui-fg-normal);
  }

  .base {
    position: relative;
    z-index: var(--cui-z-index-input);
    box-sizing: border-box;
    width: 100%;
    padding: var(--field-input-padding-block) var(--cui-spacings-exa)
      var(--field-input-padding-block) var(--cui-spacings-mega);
    margin: 0;
    overflow-x: hidden;
    font-size: var(--field-input-font-size);
    line-height: var(--field-input-line-height);
    color: var(--cui-fg-normal);
    text-overflow: ellipsis;
    white-space: nowrap;
    appearance: none;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: var(--field-input-border-radius);
    box-shadow: none;
    transition:
      box-shadow var(--cui-transitions-default),
      border var(--cui-transitions-default),
      padding var(--cui-transitions-default);
  }

  .s .base {
    padding: var(--field-input-padding-block) var(--cui-spacings-tera)
      var(--field-input-padding-block) var(--cui-spacings-kilo);
  }

  .base:hover {
    border: 1px solid var(--cui-border-normal-hovered);
  }

  .base:focus {
    outline: var(--cui-border-width-mega) solid transparent;
    border: 1px solid var(--cui-border-accent);
    box-shadow: inset 0 0 0 1px var(--cui-border-accent);
  }

  .base[aria-invalid='true'] {
    border: 1px solid var(--cui-border-danger);
  }

  .base[aria-invalid='true']:hover {
    border: 1px solid var(--cui-border-danger-hovered);
  }

  .base[aria-invalid='true']:focus {
    border: 1px solid var(--cui-border-danger);
    box-shadow: inset 0 0 0 1px var(--cui-border-danger);
  }

  .base:disabled {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal-disabled);
    border: 1px solid var(--cui-border-normal-disabled);
  }

  /* Prefix: rendered by the consumer's snippet, so only the class name
     reaches it */
  .wrapper :global(.select-prefix) {
    position: absolute;
    top: 50%;
    z-index: calc(var(--cui-z-index-input) + 1);
    box-sizing: border-box;
    pointer-events: none;
    transform: translateY(-50%);
  }

  .wrapper :global(button.select-prefix),
  .wrapper :global(.select-prefix button) {
    pointer-events: auto;
  }

  .s .has-prefix {
    padding-left: var(--cui-spacings-tera);
  }

  .s .wrapper :global(.select-prefix) {
    width: var(--cui-spacings-tera);
    height: var(--cui-spacings-tera);
    padding: var(--cui-spacings-byte);
  }

  .m .has-prefix {
    padding-left: var(--cui-spacings-exa);
  }

  .m .wrapper :global(.select-prefix) {
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-mega);
  }

  /* Chevron */
  .icon {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: calc(var(--cui-z-index-input) + 3);
    box-sizing: border-box;
    display: block;
    color: var(--cui-fg-subtle);
    pointer-events: none;
    transform: translateY(-50%);
  }

  .base:active ~ .icon {
    transform: translateY(-50%) rotate(180deg);
  }

  .base:disabled ~ .icon {
    color: var(--cui-fg-subtle-disabled);
  }

  .s .icon {
    width: var(--cui-icon-sizes-l);
    height: var(--cui-icon-sizes-l);
    padding: var(--cui-spacings-byte);
  }

  .m .icon {
    width: var(--cui-icon-sizes-xl);
    height: var(--cui-icon-sizes-xl);
    padding: var(--cui-spacings-kilo);
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
