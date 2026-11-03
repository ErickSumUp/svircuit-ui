<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type'> {
    /**
     * A clear and concise description of the option's purpose.
     */
    label: string;
    /**
     * Further details about the option's purpose.
     */
    description?: string;
    /**
     * The value of the checked radio in the group. Bindable, as with
     * `bind:group` on a native radio.
     */
    group?: HTMLInputAttributes['value'];
  }

  let {
    label,
    description,
    group = $bindable(),
    disabled,
    id: customId,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const id = $derived(customId || `radio-${uid}`);
  const descriptionId = `radio-${uid}-description`;

  const ariaDescribedBy = $derived(
    [describedBy, description && descriptionId].filter(Boolean).join(' ') || undefined
  );
</script>

<!--
  @component
  A radio button with a label and an optional description. Use an
  InputRadioGroup to render a set of options.
-->
<div class={['wrapper', className]} {style} data-disabled={disabled}>
  <input
    {...rest}
    {id}
    type="radio"
    class="base hide-visually"
    aria-describedby={ariaDescribedBy}
    {disabled}
    bind:group
  />
  <label for={id} class="label">
    <span class="label-text">
      {label}
      {#if description}
        <span class="description" aria-hidden="true">{description}</span>
      {/if}
    </span>
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

  /* Radio — inlined from circuit's RadioButtonInput, aligned to the start */
  .label {
    --radio-button-size: 1.25rem;

    position: relative;
    display: inline-block;
    min-height: var(--radio-button-size);
    padding-left: var(--radio-button-size);
    color: var(--cui-fg-normal);
    cursor: pointer;
  }

  .label::before,
  .label::after {
    position: absolute;
    top: calc(var(--cui-body-m-line-height) / 2);
    box-sizing: border-box;
    display: block;
    content: '';
  }

  .label::before {
    left: 0;
    width: var(--radio-button-size);
    height: var(--radio-button-size);
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: 100%;
    box-shadow: none;
    transform: translateY(-50%);
    transition:
      border var(--cui-transitions-default),
      background-color var(--cui-transitions-default);
  }

  .label::after {
    left: calc(var(--radio-button-size) / 4);
    width: calc(var(--radio-button-size) / 2);
    height: calc(var(--radio-button-size) / 2);
    background-color: var(--cui-fg-accent);
    border-radius: 100%;
    opacity: 0;
    transform: translateY(-50%) scale(0, 0);
    transition:
      transform var(--cui-transitions-default),
      opacity var(--cui-transitions-default);
  }

  .base:hover + .label::before {
    border-color: var(--cui-border-normal-hovered);
  }

  .base:focus + .label::before {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
    border-color: var(--cui-border-accent);
  }

  .base:focus:not(:focus-visible) + .label::before {
    outline: var(--cui-border-width-mega) solid transparent;
    border-color: var(--cui-border-normal);
  }

  .base:checked:focus:not(:focus-visible) + .label::before {
    border-color: var(--cui-border-accent);
  }

  .base:checked + .label::before {
    border-color: var(--cui-border-accent);
  }

  .base:checked + .label::after {
    opacity: 1;
    transform: translateY(-50%) scale(1, 1);
  }

  .base:disabled + .label {
    color: var(--cui-fg-normal-disabled);
    pointer-events: none;
  }

  .base:disabled + .label::before {
    background-color: var(--cui-bg-normal-disabled);
    border-color: var(--cui-border-normal-disabled);
  }

  .base:disabled + .label::after {
    background-color: var(--cui-fg-on-strong-disabled);
  }

  .base:disabled:checked + .label::before {
    border-color: var(--cui-border-accent-disabled);
  }

  .base:disabled:checked + .label::after {
    background-color: var(--cui-fg-accent-disabled);
  }

  /* Invalid, from an ancestor such as the group's fieldset */

  :global([aria-invalid='true']) .base:not(:focus) + .label::before {
    background-color: var(--cui-bg-danger);
    border-color: var(--cui-border-danger);
  }

  :global([aria-invalid='true']) .base:not(:focus) + .label::after {
    background-color: var(--cui-fg-danger);
  }

  :global([aria-invalid='true']) .base:hover + .label::before,
  :global([aria-invalid='true']) .base:focus + .label::before {
    border-color: var(--cui-border-danger-hovered);
  }

  :global([aria-invalid='true']) .base:checked + .label::before {
    border-color: var(--cui-border-danger);
  }

  /* Label — inlined from circuit's RadioButton and FieldDescription */
  .label-text {
    display: inline-block;
    padding-left: var(--cui-spacings-byte);
  }

  .description {
    display: block;
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-subtle);
  }

  .wrapper[data-disabled='true'] .description {
    color: var(--cui-fg-subtle-disabled);
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
