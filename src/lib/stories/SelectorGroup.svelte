<script lang="ts" module>
  import type { ComponentProps } from 'svelte';
  import type Selector from '../components/Selector.svelte';

  export type SelectorGroupOption = Omit<
    ComponentProps<typeof Selector>,
    'name' | 'group' | 'multiple' | 'size'
  >;
</script>

<script lang="ts">
  import SelectorComponent from '../components/Selector.svelte';
  import type { HTMLFieldsetAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLFieldsetAttributes, 'onchange'> {
    /**
     * The available options. Each needs at least a `label` and a `value`.
     */
    options: SelectorGroupOption[];
    /**
     * The value of the checked option, or the values of the checked options
     * when `multiple`. Bindable.
     */
    value?: string | string[];
    /**
     * Called when an option is checked or unchecked, after `value` is updated.
     */
    onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    /**
     * A name shared by the options. Default: a generated one.
     */
    name?: string;
    /**
     * A description of the group.
     */
    label: string;
    /**
     * Allows checking several options. The options become checkboxes.
     */
    multiple?: boolean;
    /**
     * Choose from 3 sizes. Default: `m`.
     */
    size?: 's' | 'm' | 'flexible';
    /**
     * Stretches the options to fill the group's width.
     */
    stretch?: boolean;
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
     * An information or error message, displayed below the options.
     */
    validationHint?: string;
    /**
     * Triggers error styles on the options and the hint.
     */
    invalid?: boolean;
  }

  let {
    options,
    value = $bindable(),
    onchange,
    name: customName,
    label,
    multiple = false,
    size,
    stretch = false,
    hideLabel = false,
    optionalLabel,
    required,
    validationHint,
    invalid = false,
    disabled,
    class: className,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const name = $derived(customName || `selector-group-${uid}`);
  const validationHintId = `selector-group-${uid}-hint`;

  const showInvalid = $derived(invalid && !disabled);
  const ariaDescribedBy = $derived(
    [describedBy, validationHint && validationHintId].filter(Boolean).join(' ') || undefined
  );
</script>

<!--
  @component
  A group of card-style options for choosing one, or several when `multiple`,
  with a shared label and validation hint.
-->
{#if options.length > 0}
  <fieldset
    aria-describedby={ariaDescribedBy}
    role={multiple ? undefined : 'radiogroup'}
    aria-orientation={multiple ? undefined : 'horizontal'}
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
    <div class={['base', stretch && 'stretch']}>
      {#each options as option (option.value)}
        <SelectorComponent
          {...option}
          {name}
          {multiple}
          {size}
          disabled={disabled || option.disabled}
          required={required || option.required}
          invalid={invalid || option.invalid}
          {onchange}
          bind:group={value}
        />
      {/each}
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

  /* Options — from circuit's SelectorGroup */
  .base {
    display: inline-flex;
    flex-direction: row;
    align-items: flex-start;
    width: auto;
  }

  .base > :global(:not(:last-child)) {
    margin-right: var(--cui-spacings-mega);
  }

  .base > :global(*) {
    flex: 1;
    align-self: stretch;
    width: 100%;
  }

  .stretch {
    display: flex;
    align-items: stretch;
    width: 100%;
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
