<script lang="ts" module>
  import type { ComponentProps } from 'svelte';
  import type InputRadio from '../components/InputRadio.svelte';

  export type InputRadioGroupOption = Omit<
    ComponentProps<typeof InputRadio>,
    'name' | 'group' | 'value'
  > & {
    value: string | number;
  };
</script>

<script lang="ts">
  import InputRadioComponent from '../components/InputRadio.svelte';
  import type { HTMLFieldsetAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLFieldsetAttributes, 'onchange'> {
    /**
     * The available options. Each needs at least a `label` and a `value`.
     */
    options: InputRadioGroupOption[];
    /**
     * The value of the checked option. Bindable.
     */
    value?: InputRadioGroupOption['value'];
    /**
     * Called when the checked option changes, after `value` is updated.
     */
    onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    /**
     * A name shared by the radios. Default: a generated one.
     */
    name?: string;
    /**
     * A description of the group.
     */
    label: string;
    /**
     * Visually hide the label. Only use it in rare cases, when the purpose of
     * the group can be inferred from other context.
     */
    hideLabel?: boolean;
    /**
     * Label to indicate that the group is optional. Only displayed when
     * `required` is falsy.
     */
    optionalLabel?: string;
    /**
     * Makes the group required.
     */
    required?: boolean;
    /**
     * An information, warning or error message, displayed below the radios.
     */
    validationHint?: string;
    /**
     * Triggers error styles on the radios and the hint.
     */
    invalid?: boolean;
    /**
     * Triggers warning styles on the hint.
     */
    hasWarning?: boolean;
    /**
     * Triggers valid styles on the hint.
     */
    showValid?: boolean;
  }

  let {
    options,
    value = $bindable(),
    onchange,
    name: customName,
    label,
    hideLabel = false,
    optionalLabel,
    required,
    validationHint,
    invalid = false,
    hasWarning = false,
    showValid = false,
    disabled,
    class: className,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const name = $derived(customName || `radio-group-${uid}`);
  const validationHintId = `radio-group-${uid}-hint`;

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
  A group of radio buttons for choosing one option, with a shared label and
  validation hint.
-->
{#if options.length > 0}
  <fieldset
    role="radiogroup"
    aria-describedby={ariaDescribedBy}
    aria-orientation="vertical"
    aria-invalid={invalid ? 'true' : undefined}
    aria-required={required ? 'true' : undefined}
    {name}
    {disabled}
    {...rest}
    class={['fieldset', className]}
  >
    <legend class="legend">
      <span class={['label-text', hideLabel && 'hide-visually']}>
        {label}
        {#if optionalLabel && !required}
          <span class="label-text-optional"> ({optionalLabel})</span>
        {/if}
      </span>
    </legend>
    <div class="base">
      {#each options as option (option.value)}
        <InputRadioComponent
          {...option}
          {name}
          disabled={disabled || option.disabled}
          required={required || option.required}
          {onchange}
          bind:group={value}
        />
      {/each}
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
{/if}

<style>
  /* Fieldset — inlined from circuit's FieldSet, FieldLegend, FieldLabelText
     and FieldValidationHint, size `m` */
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

  .label-text,
  .validation-hint {
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
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

  .base {
    display: flex;
    flex-direction: column;
    gap: var(--cui-spacings-bit);
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
