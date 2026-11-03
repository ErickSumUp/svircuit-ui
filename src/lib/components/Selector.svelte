<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'size' | 'value' | 'multiple'> {
    /**
     * A clear and concise description of the option's purpose.
     */
    label: string;
    /**
     * Further details about the option's purpose.
     */
    description?: string;
    /**
     * A 24px icon displayed above the label.
     */
    icon?: Snippet;
    /**
     * The value of the input.
     */
    value: string;
    /**
     * Choose from 3 sizes. Default: `m`.
     */
    size?: 's' | 'm' | 'flexible';
    /**
     * Triggers error styles on the component.
     */
    invalid?: boolean;
    /**
     * Renders a checkbox instead of a radio, so several options can be checked.
     */
    multiple?: boolean;
    /**
     * The value of the checked radio, or the values of the checked checkboxes
     * when `multiple`. Bindable, as with `bind:group` on a native input.
     */
    group?: string | string[];
  }

  let {
    label,
    description,
    icon,
    value,
    size = 'm',
    invalid = false,
    multiple = false,
    group = $bindable(),
    disabled,
    required,
    id: customId,
    class: className,
    style,
    'aria-describedby': describedBy,
    onchange,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const id = $derived(customId || `selector-${uid}`);
  const descriptionId = `selector-${uid}-description`;

  const ariaDescribedBy = $derived(
    [describedBy, description && descriptionId].filter(Boolean).join(' ') || undefined
  );
  const inputClass = $derived(['base', invalid && 'invalid', 'hide-visually']);

  // `bind:group` only collects checkboxes within one component instance, so
  // the array is kept in step by hand.
  function toggle(event: Event & { currentTarget: HTMLInputElement }) {
    const others = Array.isArray(group) ? group.filter((item) => item !== value) : [];
    group = event.currentTarget.checked ? [...others, value] : others;
    onchange?.(event);
  }
</script>

<!--
  @component
  A card-style radio button, or a checkbox when `multiple`. Use a SelectorGroup
  to render a set of options.
-->
<div class={['wrapper', className]} {style} data-disabled={disabled}>
  {#if multiple}
    <input
      {...rest}
      {id}
      type="checkbox"
      class={inputClass}
      aria-describedby={ariaDescribedBy}
      {value}
      {disabled}
      checked={Array.isArray(group) ? group.includes(value) : rest.checked}
      onchange={toggle}
    />
  {:else}
    <input
      {...rest}
      {id}
      type="radio"
      class={inputClass}
      aria-describedby={ariaDescribedBy}
      {value}
      {disabled}
      {required}
      {onchange}
      bind:group
    />
  {/if}
  <label for={id} class={['label', size, description && 'has-description']}>
    {#if icon}
      <span class="icon">{@render icon()}</span>
    {/if}
    {#if description}
      <span class="title">{label}</span>
      <span class="description" aria-hidden="true">{description}</span>
    {:else}
      {label}
    {/if}
  </label>
  {#if description}
    <p id={descriptionId} class="hide-visually">{description}</p>
  {/if}
</div>

<style>
  /* Wrapper — inlined from circuit's FieldWrapper */
  .wrapper[data-disabled='true'] {
    pointer-events: none;
  }

  .base:focus + .label::before {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
  }

  .base:focus:not(:focus-visible) + .label::before {
    outline: var(--cui-border-width-mega) solid transparent;
  }

  /* Checked */

  .base:checked + .label {
    background-color: var(--cui-bg-accent);
  }

  .base:checked + .label::before {
    border: var(--cui-border-width-mega) solid var(--cui-border-accent);
  }

  /* Disabled */

  .base:disabled + .label {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
    background-color: var(--cui-bg-normal-disabled);
  }

  .base:disabled + .label::before {
    border: var(--cui-border-width-kilo) solid var(--cui-border-normal-disabled);
  }

  .base:disabled:checked + .label {
    background-color: var(--cui-bg-accent-disabled);
  }

  .base:disabled:checked + .label::before {
    border: var(--cui-border-width-mega) solid var(--cui-border-accent-disabled);
  }

  /* Invalid */

  .invalid:not(:focus) + .label::before {
    border: var(--cui-border-width-mega) solid var(--cui-border-danger);
  }

  .label {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: var(--cui-border-width-kilo);
    margin-bottom: var(--cui-border-width-kilo);
    color: var(--cui-fg-normal);
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border-radius: var(--cui-border-radius-kilo);
    transition: box-shadow var(--cui-transitions-default);
  }

  .label::before {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    content: '';
    border: var(--cui-border-width-kilo) solid var(--cui-border-normal);
    border-radius: var(--cui-border-radius-kilo);
    transition: border var(--cui-transitions-default);
  }

  .label:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
  }

  .label:hover::before {
    border-color: var(--cui-border-normal-hovered);
  }

  .label:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
  }

  .label:active::before {
    border-color: var(--cui-border-normal-pressed);
  }

  .has-description {
    align-items: flex-start;
    text-align: start;
  }

  /* Sizes */

  .s {
    padding: var(--cui-spacings-byte) var(--cui-spacings-kilo);
  }

  .m {
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
  }

  .flexible {
    padding: var(--cui-spacings-mega) var(--cui-spacings-mega);
  }

  /* Content */

  .title {
    font-weight: var(--cui-font-weight-bold);
  }

  .description {
    white-space: initial;
  }

  .icon {
    display: flex;
    margin-bottom: var(--cui-spacings-bit);
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
