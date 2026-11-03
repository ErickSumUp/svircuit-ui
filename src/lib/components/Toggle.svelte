<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'role'> {
    /**
     * Describes the function of the toggle. Should not change depending on
     * the state.
     */
    label: string;
    /**
     * Further explanation of the toggle. Can change depending on the state.
     */
    description?: string;
    /**
     * Whether the toggle is on. Bindable. Default: `false`.
     */
    checked?: boolean;
  }

  let {
    label,
    description,
    checked = $bindable(false),
    disabled,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const switchId = `toggle-${uid}`;
  const labelId = `toggle-${uid}-label`;
  const descriptionId = `toggle-${uid}-description`;

  const ariaDescribedBy = $derived(
    [describedBy, description && descriptionId].filter(Boolean).join(' ') || undefined
  );
</script>

<!--
  @component
  A switch between two mutually exclusive states, on and off, for settings
  that take effect immediately.
-->
<div class={['wrapper', className]} {style} data-disabled={disabled}>
  <span class="base-wrapper">
    <input
      id={switchId}
      aria-labelledby={labelId}
      aria-describedby={ariaDescribedBy}
      {disabled}
      {...rest}
      type="checkbox"
      role="switch"
      class="base"
      bind:checked
    />
    <span class="knob" aria-hidden="true"></span>
  </span>
  <label class="label" id={labelId} for={switchId}>
    {label}
    {#if description}
      <span class="description" aria-hidden="true">{description}</span>
    {/if}
  </label>
  {#if description}
    <span id={descriptionId} class="hide-visually">{description}</span>
  {/if}
</div>

<style>
  /* Wrapper — inlined from circuit's FieldWrapper */
  .wrapper {
    display: flex;
    align-items: flex-start;
  }

  .wrapper[data-disabled='true'] {
    pointer-events: none;
  }

  @media (max-width: 479px) {
    .wrapper {
      flex-direction: row-reverse;
      justify-content: space-between;
    }
  }

  .base-wrapper {
    --toggle-track-width: var(--cui-spacings-peta);
    --toggle-track-height: var(--cui-spacings-giga);
    --toggle-knob-size: var(--cui-spacings-mega);
    --toggle-animation-timing: var(--cui-transitions-default);

    position: relative;
    flex: 0 0 var(--toggle-track-width);
    width: var(--toggle-track-width);
    height: var(--toggle-track-height);
  }

  .base {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow: visible;
    appearance: none;
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: var(--toggle-track-height);
    transition: background-color var(--toggle-animation-timing);
  }

  .base:hover {
    background-color: var(--cui-bg-normal-hovered);
    border: 1px solid var(--cui-border-normal-hovered);
  }

  .base:active {
    background-color: var(--cui-bg-normal-pressed);
    border: 1px solid var(--cui-border-normal-pressed);
  }

  .base:checked {
    background-color: var(--cui-bg-strong);
    border: 1px solid var(--cui-bg-strong);
  }

  .base:checked:hover {
    background-color: var(--cui-bg-strong-hovered);
    border: 1px solid var(--cui-bg-strong-hovered);
  }

  .base:checked:active {
    background-color: var(--cui-bg-strong-pressed);
    border: 1px solid var(--cui-bg-strong-pressed);
  }

  .base:disabled {
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-subtle-disabled);
  }

  .base:checked:disabled {
    background-color: var(--cui-bg-strong-disabled);
    border: 1px solid transparent;
  }

  /* Focus ring — inlined from circuit's focus-visible utility */
  .base:focus {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
  }

  .base:focus:not(:focus-visible) {
    outline-color: transparent;
  }

  .knob {
    position: absolute;
    top: 50%;
    display: block;
    width: var(--toggle-knob-size);
    height: var(--toggle-knob-size);
    pointer-events: none;
    background-color: var(--cui-fg-subtle);
    border-radius: var(--toggle-knob-size);
    transform: translate3d(var(--cui-spacings-bit), -50%, 0);
    transition:
      transform var(--toggle-animation-timing),
      background-color var(--toggle-animation-timing);
  }

  .base:checked ~ .knob {
    background-color: var(--cui-fg-on-strong);
    transform: translate3d(
      calc(var(--toggle-track-width) - var(--toggle-knob-size) - var(--cui-spacings-bit)),
      -50%,
      0
    );
  }

  .base:disabled ~ .knob {
    background-color: var(--cui-bg-subtle-disabled);
  }

  .base:checked:disabled ~ .knob {
    background-color: var(--cui-fg-on-strong);
  }

  .label {
    display: block;
    padding-left: var(--cui-spacings-kilo);
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-m-line-height);
    cursor: pointer;
  }

  @media (max-width: 479px) {
    .label {
      padding-right: var(--cui-spacings-kilo);
      padding-left: 0;
    }
  }

  .wrapper[data-disabled='true'] .label {
    color: var(--cui-fg-normal-disabled);
  }

  /* Description — inlined from circuit's FieldDescription, size `m` */
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
