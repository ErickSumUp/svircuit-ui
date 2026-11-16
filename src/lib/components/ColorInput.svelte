<script lang="ts" module>
  export function isValidColor(color: string) {
    return /^#?(?:[0-9A-F]{3}){1,2}$/i.test(color);
  }

  export function isSameColor(colorA: string, colorB: string) {
    return colorA === colorB || normalizeColor(colorA) === normalizeColor(colorB);
  }

  export function normalizeColor(value: string) {
    let color = value.trim().replace('#', '');
    if (color.length === 3) {
      color = color
        .split('')
        .flatMap((char) => [char, char])
        .join('');
    }
    return `#${color}`.toLowerCase();
  }
</script>

<script lang="ts">
  import { untrack } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<
    HTMLInputAttributes,
    'type' | 'size' | 'value' | 'maxlength' | 'pattern'
  > {
    /**
     * A clear and concise description of the color's purpose.
     */
    label: string;
    /**
     * Visually hide the label. Only use it in rare cases, when the purpose of
     * the field can be inferred from other context.
     */
    hideLabel?: boolean;
    /**
     * Label to indicate that the field is optional. Only displayed when
     * `required` is falsy.
     */
    optionalLabel?: string;
    /**
     * An information, warning or error message, displayed below the field.
     */
    validationHint?: string;
    /**
     * Triggers error styles. Important for accessibility.
     */
    invalid?: boolean;
    /**
     * Triggers warning styles.
     */
    hasWarning?: boolean;
    /**
     * Enables valid styles.
     */
    showValid?: boolean;
    /**
     * Choose from 2 sizes. Default: `m`.
     */
    size?: 's' | 'm';
    /**
     * The color as a hex code, such as `#99ffbb`. Bindable. Typing in the text
     * field only updates it once the code is valid.
     */
    value?: string;
  }

  let {
    label,
    hideLabel = false,
    optionalLabel,
    validationHint,
    invalid = false,
    hasWarning = false,
    showValid = false,
    size = 'm',
    value = $bindable(),
    placeholder,
    readonly,
    required,
    disabled,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const labelId = `color-input-${uid}-label`;
  const pickerId = `color-input-${uid}-picker`;
  const validationHintId = `color-input-${uid}-hint`;

  let picker: HTMLInputElement | undefined = $state();
  let text = $state(untrack(() => value?.trim().replace('#', '') ?? ''));
  let reportedValue = $state(untrack(() => value));
  // A value set from outside replaces the typed text, unless it's the same color.
  const shownText = $derived(
    value && value !== reportedValue && !isSameColor(text, value)
      ? value.trim().replace('#', '')
      : text
  );

  const validity = $derived(
    disabled
      ? undefined
      : invalid
        ? 'invalid'
        : hasWarning
          ? 'warning'
          : showValid
            ? 'valid'
            : undefined
  );
  const ariaDescribedBy = $derived(
    [describedBy, validationHint && validationHintId].filter(Boolean).join(' ') || undefined
  );

  function updatePicker(color: string) {
    if (!picker || !isValidColor(color)) {
      return;
    }
    picker.value = normalizeColor(color);
    picker.dispatchEvent(new Event('input', { bubbles: true }));
    picker.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function handlePickerInput(event: Event & { currentTarget: HTMLInputElement }) {
    const color = event.currentTarget.value;
    if (!isSameColor(text, color)) {
      text = color.replace('#', '');
    }
    reportedValue = color;
    value = color;
    rest.oninput?.(event);
  }

  function handleTextInput(event: Event & { currentTarget: HTMLInputElement }) {
    reportedValue = value;
    text = event.currentTarget.value;
    updatePicker(text);
  }

  function handlePaste(event: ClipboardEvent) {
    if (readonly) {
      return;
    }
    const pasted = event.clipboardData?.getData('text/plain').trim();
    if (!pasted || !isValidColor(pasted)) {
      return;
    }
    event.preventDefault();
    reportedValue = value;
    text = pasted.replace('#', '');
    updatePicker(pasted);
  }
</script>

<!--
  @component
  A color field: a native color picker next to a text field for the hex code.
-->
<fieldset class={['fieldset', size, className]} {style} {disabled}>
  <legend id={labelId} class="legend">
    <span class={['label-text', hideLabel && 'hide-visually']}>
      {label}
      {#if optionalLabel && !required}
        <span class="label-text-optional"> ({optionalLabel})</span>
      {/if}
    </span>
  </legend>
  <div class="wrapper">
    <label for={pickerId} class="picker" data-disabled={disabled || readonly}>
      <input
        {...rest}
        bind:this={picker}
        id={pickerId}
        type="color"
        class="color-input"
        aria-labelledby={labelId}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid ? 'true' : undefined}
        disabled={disabled || readonly}
        {required}
        value={value && isValidColor(value) ? normalizeColor(value) : undefined}
        oninput={handlePickerInput}
      />
    </label>
    <span class="symbol">#</span>
    <input
      type="text"
      class={['base', !disabled && hasWarning && 'warning', 'input']}
      aria-labelledby={labelId}
      aria-describedby={ariaDescribedBy}
      aria-invalid={invalid ? 'true' : undefined}
      {required}
      maxlength={6}
      pattern={'[0-9a-f]{3,6}'}
      {readonly}
      {disabled}
      value={shownText}
      placeholder={placeholder?.replace('#', '')}
      oninput={handleTextInput}
      onpaste={handlePaste}
    />
  </div>
  {#if validationHint && !validity}
    <div id={validationHintId} class="validation-hint">{validationHint}</div>
  {/if}
  <span role="status" aria-live="polite">
    {#if validationHint && validity}
      <div id={validationHintId} class={['validation-hint', validity]}>
        <div class="validation-hint-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {#if validity === 'invalid'}
              <path
                fill="currentColor"
                d="M8 1.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5m2.33 4.42a.75.75 0 0 0-1.06 0L8 6.94 6.73 5.67a.75.75 0 1 0-1.06 1.06L6.94 8 5.67 9.27a.75.75 0 1 0 1.06 1.06L8 9.06l1.27 1.27a.75.75 0 0 0 1.06-1.06L9.06 8l1.27-1.27a.75.75 0 0 0 0-1.06"
              />
            {:else if validity === 'warning'}
              <path
                fill="currentColor"
                d="M8 1.75c.354 0 .704.089 1.015.259s.572.417.756.72l5.194 8.546a1.92 1.92 0 0 1 0 2.006 2 2 0 0 1-.755.714 2.1 2.1 0 0 1-1.007.255H2.811a2.1 2.1 0 0 1-1.007-.248 2 2 0 0 1-.764-.713 1.9 1.9 0 0 1-.29-1.006c0-.357.1-.705.285-1.008L6.23 2.73c.183-.303.446-.55.755-.72.311-.17.661-.259 1.015-.259m.007 8.75a.75.75 0 0 0 0 1.5h.006a.75.75 0 0 0 0-1.5zm0-5.078a.75.75 0 0 0-.75.75v3.61h1.5v-3.61a.75.75 0 0 0-.75-.75"
              />
            {:else}
              <path
                fill="currentColor"
                d="M8 1.25a6.75 6.75 0 1 1 0 13.5 6.75 6.75 0 0 1 0-13.5M10.817 6a.856.856 0 0 0-1.21 0L7.474 8.133l-.764-.764A.856.856 0 0 0 5.5 8.58l1.37 1.37a.857.857 0 0 0 1.21 0l2.737-2.739a.856.856 0 0 0 0-1.21"
              />
            {/if}
          </svg>
        </div>
        {validationHint}
      </div>
    {/if}
  </span>
</fieldset>

<style>
  /* Field — inlined from circuit's FieldSet, FieldLegend, FieldLabelText
     and FieldValidationHint */
  .fieldset {
    flex-grow: 1;
    padding: 0;
    margin: 0;
    border: none;
  }

  .fieldset[disabled] {
    pointer-events: none;
  }

  .legend {
    display: block;
    width: 100%;
    padding: 0;
  }

  .label-text {
    display: block;
    margin-bottom: var(--cui-spacings-bit);
  }

  .fieldset[disabled] .label-text {
    color: var(--cui-fg-normal-disabled);
  }

  .label-text-optional {
    color: var(--cui-fg-subtle);
  }

  .fieldset[disabled] .label-text-optional {
    color: var(--cui-fg-subtle-disabled);
  }

  .validation-hint {
    display: flex;
    margin-top: var(--cui-spacings-bit);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
  }

  .fieldset[disabled] .validation-hint {
    color: var(--cui-fg-subtle-disabled);
  }

  .validation-hint.valid {
    color: var(--cui-fg-success);
  }

  .validation-hint.warning {
    color: var(--cui-fg-warning);
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

  /* Text field — inlined from circuit's Input */
  .base {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    appearance: none;
    outline: var(--cui-border-width-mega) solid transparent;
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    box-shadow: none;
    transition:
      box-shadow var(--cui-transitions-default),
      border var(--cui-transitions-default),
      padding var(--cui-transitions-default);
  }

  .base:hover {
    border: 1px solid var(--cui-border-normal-hovered);
  }

  .base:focus {
    border: 1px solid var(--cui-border-accent);
    box-shadow: inset 0 0 0 1px var(--cui-border-accent);
  }

  .base::placeholder {
    color: var(--cui-fg-placeholder);
    transition: color var(--cui-transitions-default);
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

  .base.warning {
    border: 1px solid var(--cui-border-warning);
  }

  .base.warning:hover {
    border: 1px solid var(--cui-border-warning-hovered);
  }

  .base.warning:focus {
    border: 1px solid var(--cui-border-warning);
    box-shadow: inset 0 0 0 1px var(--cui-border-warning);
  }

  .base:disabled {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal-disabled);
    border: 1px solid var(--cui-border-normal-disabled);
  }

  .base[readonly] {
    background-color: var(--cui-bg-subtle-disabled);
  }

  /* Color input — from circuit's ColorInput */
  .wrapper {
    position: relative;
    display: flex;
  }

  .picker {
    position: relative;
    cursor: pointer;
    border: 1px solid var(--cui-border-normal);
    border-top-left-radius: var(--cui-border-radius-byte);
    border-bottom-left-radius: var(--cui-border-radius-byte);
    box-shadow: none;
    transition:
      box-shadow var(--cui-transitions-default),
      border var(--cui-transitions-default);
  }

  .picker:hover {
    z-index: var(--cui-z-index-absolute);
    background: var(--cui-bg-normal-hovered);
    border: 1px solid var(--cui-border-normal-hovered);
  }

  .picker:focus-within {
    z-index: var(--cui-z-index-absolute);
    outline: var(--cui-border-width-mega) solid transparent;
    background: var(--cui-bg-normal-pressed);
    border: 1px solid var(--cui-border-focus);
    box-shadow: inset 0 0 0 1px var(--cui-border-focus);
  }

  .picker[data-disabled='true'] {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal-disabled);
    border: 1px solid var(--cui-border-normal-disabled);
  }

  .color-input {
    padding: 0;
    appearance: none;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 6px;
    box-shadow: 0 0 0 1px var(--cui-border-normal);
  }

  .color-input::-moz-color-swatch {
    border: none;
  }

  .color-input::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 0;
  }

  .color-input::-webkit-color-swatch {
    border: none;
  }

  .symbol {
    position: absolute;
    top: 0;
    z-index: calc(var(--cui-z-index-absolute) + 1);
    display: grid;
    place-items: center center;
    width: var(--cui-spacings-giga);
    font-family: var(--cui-font-stack-mono);
    color: var(--cui-fg-subtle);
  }

  .input {
    position: relative;
    overflow: hidden;
    font-family: var(--cui-font-stack-mono);
    /* Overlaps the picker's border, so the two don't draw a 2px seam */
    transform: translateX(-1px);
  }

  .input:hover,
  .input:focus {
    z-index: var(--cui-z-index-absolute);
  }

  .input::placeholder {
    font-family: var(--cui-font-stack-mono);
  }

  .s .picker {
    width: var(--cui-spacings-tera);
    height: var(--cui-spacings-tera);
  }

  .s .color-input {
    width: var(--cui-spacings-mega);
    height: var(--cui-spacings-mega);
    margin: var(--cui-spacings-byte);
  }

  .s .symbol {
    left: var(--cui-spacings-tera);
    height: var(--cui-spacings-tera);
  }

  .s .input {
    padding: var(--field-input-padding-block) var(--cui-spacings-byte)
      var(--field-input-padding-block) var(--cui-spacings-giga);
    font-size: var(--field-input-font-size);
    line-height: var(--field-input-line-height);
    border-radius: 0 var(--field-input-border-radius) var(--field-input-border-radius) 0;
  }

  .m .picker {
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
  }

  .m .color-input {
    width: var(--cui-spacings-giga);
    height: var(--cui-spacings-giga);
    margin: var(--cui-spacings-kilo);
  }

  .m .symbol {
    left: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
  }

  .m .input {
    padding: var(--field-input-padding-block) var(--cui-spacings-mega)
      var(--field-input-padding-block) var(--cui-spacings-giga);
    font-size: var(--field-input-font-size);
    line-height: var(--field-input-line-height);
    border-radius: 0 var(--field-input-border-radius) var(--field-input-border-radius) 0;
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
