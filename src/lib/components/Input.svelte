<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'prefix'> {
    /**
     * A clear and concise description of the input's purpose.
     */
    label: string;
    /**
     * Visually hide the label. Only use it in rare cases, when the purpose of
     * the field can be inferred from other context.
     */
    hideLabel?: boolean;
    /**
     * Label to indicate that the input is optional. Only displayed when
     * `required` is falsy.
     */
    optionalLabel?: string;
    /**
     * An information, warning or error message, displayed below the input.
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
     * Aligns the text. Default: `left`.
     */
    textAlign?: 'left' | 'right';
    /**
     * Choose from 2 sizes. Default: `m`.
     */
    size?: 's' | 'm';
    /**
     * Rendered before the input, usually an icon. Put the `class` it receives
     * on the root element to position it. Receives the input's `value`.
     */
    prefix?: Snippet<[{ class: string; value: HTMLInputAttributes['value'] }]>;
    /**
     * Rendered after the input, usually an icon or a button. Put the `class`
     * it receives on the root element to position it.
     */
    suffix?: Snippet<[{ class: string }]>;
    /**
     * Disables password manager overlays on fields that might be mistaken for
     * login fields.
     */
    passwordManagerIgnore?: boolean;
  }

  let {
    label,
    hideLabel = false,
    optionalLabel,
    validationHint,
    invalid = false,
    hasWarning = false,
    showValid = false,
    textAlign = 'left',
    size = 'm',
    prefix,
    suffix,
    passwordManagerIgnore,
    value = $bindable(),
    id: customId,
    required,
    disabled,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const id = $derived(customId || `input-${uid}`);
  const validationHintId = `input-${uid}-hint`;

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
</script>

<!--
  @component
  A single-line text field for forms.
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
    {@render prefix?.({ class: 'input-prefix', value })}
    <input
      {id}
      class={[
        'base',
        !disabled && hasWarning && 'warning',
        textAlign === 'right' && 'align-right',
        prefix && 'has-prefix',
        suffix && 'has-suffix'
      ]}
      aria-describedby={ariaDescribedBy}
      aria-invalid={invalid ? 'true' : undefined}
      {required}
      {disabled}
      data-1p-ignore={passwordManagerIgnore}
      data-bwignore={passwordManagerIgnore}
      data-lpignore={passwordManagerIgnore}
      data-op-ignore={passwordManagerIgnore}
      data-protonpass-ignore={passwordManagerIgnore}
      {...rest}
      bind:value
    />
    {@render suffix?.({ class: 'input-suffix' })}
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

  /* Input — from circuit's Input */
  .wrapper {
    position: relative;
  }

  .base {
    box-sizing: border-box;
    width: 100%;
    padding: var(--field-input-padding-block) var(--field-input-padding-inline);
    margin: 0;
    font-size: var(--field-input-font-size);
    line-height: var(--field-input-line-height);
    appearance: none;
    outline: var(--cui-border-width-mega) solid transparent;
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: var(--field-input-border-radius);
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

  .base:placeholder-shown {
    text-overflow: ellipsis;
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

  .align-right {
    text-align: right;
  }

  /* Prefix & suffix: rendered by the consumer's snippets, so only the class
     names reach them */
  .wrapper :global(.input-prefix),
  .wrapper :global(.input-suffix) {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    color: var(--cui-fg-subtle);
    pointer-events: none;
  }

  .wrapper :global(.input-prefix) {
    left: 0;
  }

  .wrapper :global(.input-suffix) {
    right: 0;
    transition: right var(--cui-transitions-default);
  }

  .wrapper :global(button.input-prefix),
  .wrapper :global(button.input-suffix),
  .wrapper :global(.input-prefix button),
  .wrapper :global(.input-suffix button) {
    pointer-events: auto;
  }

  .s .has-prefix {
    padding-left: var(--cui-spacings-tera);
  }

  .s .has-suffix {
    padding-right: var(--cui-spacings-tera);
  }

  .s .wrapper :global(.input-prefix),
  .s .wrapper :global(.input-suffix) {
    width: var(--cui-spacings-tera);
    height: var(--cui-spacings-tera);
    padding: var(--cui-spacings-byte);
  }

  .s .wrapper :global(button.input-prefix),
  .s .wrapper :global(button.input-suffix),
  .s .wrapper :global(.input-prefix button),
  .s .wrapper :global(.input-suffix button) {
    border-radius: var(--cui-border-radius-byte);
  }

  .m .has-prefix {
    padding-left: var(--cui-spacings-exa);
  }

  .m .has-suffix {
    padding-right: var(--cui-spacings-exa);
  }

  .m .wrapper :global(.input-prefix),
  .m .wrapper :global(.input-suffix) {
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-kilo);
  }

  .m .wrapper :global(button.input-prefix),
  .m .wrapper :global(button.input-suffix),
  .m .wrapper :global(.input-prefix button),
  .m .wrapper :global(.input-suffix button) {
    border-radius: var(--cui-border-radius-kilo);
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
