<script lang="ts">
  /**
   * A clear and concise description of the input purpose. Required for accessibility purposes.
   * @type {string}
   */
  export let label: string;
  /**
   * A unique identifier for the input field. Must be provided for accessibility.
   * @type {string} @default
   */
  export let id: string;
  /**
   * Aligns text to the right in the input
   * @type {boolean} @default false
   */
  export let textAlignRight: boolean = false;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   * @type {boolean} @default false
   */
  export let hideLabel: boolean = false;

  export let disabled = false;

  export let ariaDescribedBy = '';
  export let value: number | string = '';

  export let onClearClick = () => {
    value = '';
  };
</script>

<div data-disabled={disabled} aria-disabled={disabled}>
  <label for={id} class="label" data-disabled={disabled}>
    <span class="label-text" class:label-hide-visually={hideLabel} data-disabled={disabled}>
      {label}
    </span>
  </label>
  <div class="wrapper">
    <svg
      class="prefix"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 7a5 5 0 1110 0A5 5 0 012 7zm5-7a7 7 0 104.192 12.606l3.1 3.101a1 1 0 001.415-1.414l-3.1-3.1A7 7 0 007 0z"
        fill="currentColor"
      />
    </svg>
    <input
      {id}
      bind:value
      aria-describedby={ariaDescribedBy}
      class="base"
      class:has-suffix={value}
      class:select--disabled={disabled}
      class:align-right={textAlignRight}
      {disabled}
      on:change
      aria-label={label}
      {...$$restProps}
    />
    {#if value}
      <button class="suffix close-button" on:click={onClearClick}>
        <span class="close-button-content">
          <svg
            class="close-button-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    {/if}
  </div>
</div>

<style>
  .label {
    display: block;
    font-size: var(--cui-typography-body-two-font-size);
    line-height: var(--cui-typography-body-two-line-height);
  }

  .wrapper {
    position: relative;
  }

  .base {
    width: 100%;
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    margin: 0;
    font-size: var(--cui-typography-body-one-font-size);
    line-height: var(--cui-typography-body-one-line-height);
    appearance: none;
    background-color: var(--cui-bg-normal);
    border: 0;
    border-radius: var(--cui-border-radius-byte);
    outline: 0;
    box-shadow: 0 0 0 1px var(--cui-border-normal);
    transition:
      box-shadow var(--cui-transitions-default),
      padding var(--cui-transitions-default);

    padding-left: var(--cui-spacings-exa);
  }

  .base:hover {
    box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
  }

  .base:focus {
    box-shadow: 0 0 0 2px var(--cui-border-accent);
  }

  .base:active {
    box-shadow: 0 0 0 1px var(--cui-border-accent);
  }

  .base::placeholder {
    color: var(--cui-fg-placeholder);
    transition: color var(--cui-transitions-default);
  }

  .base:placeholder-shown {
    text-overflow: ellipsis;
  }

  .base:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  .base::-ms-expand {
    display: none;
  }

  .prefix {
    position: absolute;
    z-index: calc(var(--cui-z-index-input) + 1);
    display: block;
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-mega);
    pointer-events: auto;
  }

  .icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: calc(var(--cui-z-index-input) + 1);
    display: block;
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-mega);
    color: var(--cui-fg-subtle);
    pointer-events: none;
  }

  .label-hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  .label-text {
    display: inline-block;
    margin-bottom: var(--cui-spacings-bit);
  }

  [data-disabled='true'] .label-text {
    color: var(--cui-fg-normal-disabled);
  }

  .wrapper .prefix,
  .wrapper .suffix {
    position: absolute;
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    color: var(--cui-fg-subtle);
    pointer-events: none;
  }

  .wrapper .suffix {
    top: 0;
    right: 0;
    transition: right var(--cui-transitions-default);
  }

  .wrapper {
    position: relative;
  }

  .base:disabled,
  .base[disabled],
  .base[data-disabled='true'],
  .base[aria-disabled='true'] {
    color: var(--cui-fg-normal-disabled);
    background-color: var(--cui-bg-normal-disabled);
    box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
  }

  .base[readonly] {
    background-color: var(--cui-bg-subtle-disabled);
  }

  /* Alignment */

  .align-right {
    text-align: right;
  }

  .has-suffix {
    padding-right: var(--cui-spacings-exa);
  }

  .wrapper .prefix,
  .wrapper .suffix {
    position: absolute;
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-kilo) var(--cui-spacings-mega);
    color: var(--cui-fg-subtle);
    pointer-events: none;
  }

  .wrapper .suffix {
    top: 0;
    right: 0;
    transition: right var(--cui-transitions-default);
  }

  .close-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: max-content;
    margin: 0;
    font-size: var(--cui-typography-body-one-font-size);
    font-weight: var(--cui-font-weight-bold);
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border-width: var(--cui-border-width-kilo);
    transition:
      opacity var(--cui-transitions-default),
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);

    line-height: var(--cui-typography-body-two-line-height);

    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo))
      calc(var(--cui-spacings-kilo) - var(--cui-border-width-kilo));

    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal);

    border: none;
    border-radius: var(--cui-border-radius-byte);
  }

  .close-button:active .close-button-content {
    transform: translate(0, 1px);
  }

  .close-button:hover {
    color: var(--cui-fg-normal-hovered);
    background-color: var(--cui-bg-normal-hovered);
    border-color: var(--cui-border-normal-hovered);
  }

  .close-button:active {
    color: var(--cui-fg-normal-pressed);
    background-color: var(--cui-bg-normal-pressed);
    border-color: var(--cui-border-normal-pressed);
  }

  .close-button:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .close-button:focus::-moz-focus-inner {
    border: 0;
  }

  .close-button:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .close-button-content {
    display: flex;
    gap: var(--content-gap);
    place-content: center;
    align-items: center;
    min-width: 24px;
    min-height: 24px;
    opacity: 1;
    transition: opacity var(--cui-transitions-default);
  }

  .close-button-icon {
    width: var(--leading-icon-size);
    height: var(--leading-icon-size);
  }

  .wrapper button.suffix,
  .wrapper .suffix button {
    pointer-events: auto;
  }
</style>
