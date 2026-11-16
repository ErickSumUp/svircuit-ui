<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<
    HTMLInputAttributes,
    'size' | 'type' | 'src' | 'onchange' | 'children'
  > {
    /**
     * A clear and concise description of the ImageInput's purpose.
     */
    label: string;
    /**
     * Renders the image, such as an Avatar. It receives the image's `src`,
     * `undefined` while there is none, and `aria-hidden` to hide it from
     * assistive technology.
     */
    image: Snippet<[{ src: string | undefined; 'aria-hidden': 'true' }]>;
    /**
     * Called with the image the user picked, dropped or pasted. A returned
     * promise keeps the loading state until it settles.
     */
    onchange: (file: File) => void | Promise<void>;
    /**
     * Called when the user clears the image.
     */
    onclear: (event: MouseEvent) => void | Promise<void>;
    /**
     * An accessible label for the "clear" button.
     */
    clearButtonLabel: string;
    /**
     * An accessible label to communicate the loading state.
     */
    loadingLabel: string;
    /**
     * The URL of an existing image. Shows the "clear" button instead of the
     * "add" one.
     */
    src?: string;
    /**
     * Triggers error styles. Important for accessibility.
     */
    invalid?: boolean;
    /**
     * An information or error message, displayed below the input.
     */
    validationHint?: string;
    /**
     * Label to indicate that the input is optional. Only displayed when
     * `required` is falsy.
     */
    optionalLabel?: string;
    /**
     * Visually hide the label. Default: `true`.
     */
    hideLabel?: boolean;
  }

  let {
    label,
    image,
    onchange,
    onclear,
    clearButtonLabel,
    loadingLabel,
    src,
    invalid = false,
    validationHint,
    optionalLabel,
    hideLabel = true,
    id: customId,
    required,
    disabled,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const id = $derived(customId || `image-input-${uid}`);
  const validationHintId = `image-input-${uid}-hint`;
  const tooltipId = `image-input-${uid}-tooltip`;
  const ariaDescribedBy = $derived(
    [describedBy, validationHint && validationHintId].filter(Boolean).join(' ') || undefined
  );

  let input: HTMLInputElement;
  let isLoading = $state(false);
  let isDragging = $state(false);
  let previewImage = $state('');
  let isTooltipDismissed = $state(false);

  function setPreview(url: string) {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    previewImage = url;
  }

  function handleFiles(files: FileList | null | undefined) {
    const file = files?.[0];
    if (!file) {
      return;
    }
    isLoading = true;
    setPreview(URL.createObjectURL(file));
    const stopLoading = () => (isLoading = false);
    Promise.resolve(onchange(file)).then(stopLoading, stopLoading);
  }

  // Shows the pasted or dropped image in the input, as if it had been picked.
  function setInputFiles(files: FileList | null | undefined) {
    if (files instanceof FileList && files.length > 0) {
      input.files = files;
    }
  }

  function handleClear(event: MouseEvent) {
    const reset = () => {
      input.value = '';
      setPreview('');
    };
    Promise.resolve(onclear(event)).then(reset, reset);
  }

  function handlePaste(event: ClipboardEvent) {
    const files = event.clipboardData?.files;
    handleFiles(files);
    setInputFiles(files);
  }

  function handleDragging(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    isDragging = true;
  }

  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    isDragging = false;
  }

  function handleDrop(event: DragEvent) {
    handleDragLeave(event);
    const files = event.dataTransfer?.files;
    handleFiles(files);
    setInputFiles(files);
  }
</script>

<!--
  @component
  Lets users upload an image by picking, dropping or pasting it, with a preview
  and a button to clear it.
-->
<div class={['field', className]} {style} data-disabled={disabled}>
  <span class={['label-text', hideLabel && 'hide-visually']} aria-hidden="true">
    {label}
    {#if optionalLabel && !required}
      <span class="label-text-optional"> ({optionalLabel})</span>
    {/if}
  </span>
  <div class="base" onpaste={handlePaste}>
    <input
      {...rest}
      bind:this={input}
      {id}
      class="input hide-visually"
      type="file"
      accept="image/*"
      {required}
      disabled={disabled || isLoading}
      aria-invalid={invalid ? 'true' : undefined}
      aria-describedby={ariaDescribedBy}
      onchange={(event) => handleFiles(event.currentTarget.files)}
      onclick={() => (input.value = '')}
    />
    <label
      for={id}
      class={['label', isLoading && 'loading', isDragging && 'dragging']}
      ondragenter={handleDragging}
      ondragover={handleDragging}
      ondragleave={handleDragLeave}
      ondrop={handleDrop}
    >
      <span class="hide-visually">{label}</span>
      {@render image({ src: src || previewImage || undefined, 'aria-hidden': 'true' })}
    </label>
    {#if src}
      <button
        type="button"
        class="button clear"
        aria-labelledby={tooltipId}
        disabled={isLoading || disabled}
        onclick={handleClear}
        onkeydown={(event) => event.key === 'Escape' && (isTooltipDismissed = true)}
        onblur={() => (isTooltipDismissed = false)}
        onmouseleave={() => (isTooltipDismissed = false)}
      >
        <span class="button-content">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11.393 4.858H4.624v8.238c0 .174.063.33.161.439a.45.45 0 0 0 .33.155h5.787a.45.45 0 0 0 .329-.155.66.66 0 0 0 .162-.439zm-5.21 6.327V7.363c0-.375.3-.68.668-.68s.667.305.667.68v3.822c0 .375-.299.68-.667.68a.674.674 0 0 1-.667-.68m2.316 0V7.363c0-.375.3-.68.667-.68s.666.305.666.68v3.822c0 .375-.298.68-.666.68a.674.674 0 0 1-.667-.68m1.157-8.281a.66.66 0 0 0-.16-.44.45.45 0 0 0-.33-.154H6.851a.45.45 0 0 0-.33.155.66.66 0 0 0-.16.439v.594h3.295zm1.333.594h2.894v1.36h-1.157v8.238c0 .502-.181.993-.517 1.363a1.77 1.77 0 0 1-1.307.591H5.115c-.501 0-.97-.22-1.308-.591a2.03 2.03 0 0 1-.516-1.363V4.858H2.133v-1.36h2.894v-.594c0-.502.18-.993.516-1.363A1.77 1.77 0 0 1 6.851.95h2.315c.501 0 .97.22 1.307.591.336.37.516.86.516 1.363z"
            />
          </svg>
        </span>
      </button>
      <span id={tooltipId} role="tooltip" class={['tooltip', isTooltipDismissed && 'dismissed']}>
        <span class="tooltip-content">{clearButtonLabel}</span>
        <span class="tooltip-arrow"></span>
      </span>
    {:else}
      <button
        type="button"
        class="button add"
        aria-hidden="true"
        tabindex="-1"
        disabled={isLoading || disabled}
      >
        <span class="button-content">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              fill="currentColor"
              d="M15 8c0 .5-.4 1-1 1H9v5c0 .5-.4 1-1 1s-1-.5-1-1V9H2c-.5 0-1-.5-1-1s.5-1 1-1h5V2c0-.5.4-1 1-1s1 .5 1 1v5h5c.6 0 1 .5 1 1"
            />
          </svg>
        </span>
      </button>
    {/if}
    <span class={['spinner', isLoading && 'loading']}>
      <span class="hide-visually">{loadingLabel}</span>
    </span>
  </div>
  {#if validationHint && !invalid}
    <div id={validationHintId} class="validation-hint">{validationHint}</div>
  {/if}
  <span role="status" aria-live="polite">
    {#if validationHint && invalid}
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
  /* Field — inlined from circuit's FieldWrapper, FieldLabelText and
     FieldValidationHint */
  .field[data-disabled='true'] {
    pointer-events: none;
  }

  .label-text {
    display: block;
    margin-bottom: var(--cui-spacings-bit);
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
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
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
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

  /* ImageInput */
  .base {
    position: relative;
    display: inline-block;
    text-align: center;
  }

  .label {
    display: block;
    cursor: pointer;
    transition: filter var(--cui-transitions-default);
  }

  .label > :global(:last-child) {
    transition: box-shadow var(--cui-transitions-default);
  }

  /* Circuit's focus outline is transparent, which leaves keyboard users
     without a visible focus. */
  .input:focus-visible + .label > :global(:last-child),
  .label.dragging > :global(:last-child) {
    outline: var(--cui-border-width-mega) solid var(--cui-border-focus);
    outline-offset: var(--cui-border-width-mega);
  }

  .input[aria-invalid='true'] ~ .label > :global(:last-child) {
    box-shadow: 0 0 0 2px var(--cui-border-danger);
  }

  .input[aria-invalid='true'] ~ .label:hover > :global(:last-child) {
    box-shadow: 0 0 0 2px var(--cui-border-danger-hovered);
  }

  .input[aria-invalid='true'] ~ .label:active > :global(:last-child) {
    box-shadow: 0 0 0 2px var(--cui-border-danger-pressed);
  }

  .label.loading {
    filter: brightness(0.6);
  }

  .label:not(.loading):hover,
  .label.dragging {
    filter: brightness(0.9);
  }

  .label:not(.loading):active {
    filter: brightness(0.8);
  }

  .field[data-disabled='true'] .label {
    opacity: 0.4;
  }

  /* Button — inlined from circuit's IconButton, secondary, size s */
  .button {
    position: absolute;
    right: calc(-1 * var(--cui-spacings-bit));
    bottom: calc(-1 * var(--cui-spacings-bit));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
    margin: 0;
    color: var(--cui-fg-normal);
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: var(--cui-border-width-kilo) solid var(--cui-border-normal);
    border-radius: var(--cui-border-radius-byte);
    transition:
      color var(--cui-transitions-default),
      background-color var(--cui-transitions-default),
      border-color var(--cui-transitions-default);
  }

  .button.add {
    pointer-events: none;
  }

  .button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    min-height: 24px;
  }

  .button-content svg {
    display: block;
  }

  .button.clear {
    color: var(--cui-fg-danger);
  }

  .button.clear:hover {
    color: var(--cui-fg-danger-hovered);
    background-color: var(--cui-bg-danger-hovered);
    border-color: var(--cui-border-danger-hovered);
  }

  .button.clear:active {
    color: var(--cui-fg-danger-pressed);
    background-color: var(--cui-bg-danger-pressed);
    border-color: var(--cui-border-danger-pressed);
  }

  .button.clear:active .button-content {
    transform: translate(0, 1px);
  }

  .button:disabled {
    color: var(--cui-fg-normal-disabled);
    cursor: not-allowed;
    background-color: var(--cui-bg-normal);
    border-color: var(--cui-border-normal-disabled);
  }

  .button.clear:disabled {
    color: var(--cui-fg-danger-disabled);
  }

  .button:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .button:focus:not(:focus-visible) {
    box-shadow: none;
  }

  /* Tooltip — inlined from circuit's Tooltip, placed above the button */
  .tooltip {
    --tooltip-arrow-size: calc(var(--cui-spacings-byte) * 1.414);

    position: absolute;
    right: calc(var(--cui-spacings-tera) / 2 - var(--cui-spacings-bit));
    bottom: calc(var(--cui-spacings-tera) - var(--cui-spacings-bit) + var(--cui-spacings-kilo));
    z-index: var(--cui-z-index-tooltip);
    width: max-content;
    max-width: 360px;
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    transform: translateX(50%);
    transition:
      opacity var(--cui-transitions-default),
      visibility var(--cui-transitions-default);
  }

  /* Appears after a second, so that passing the pointer over the button
     doesn't flash it; disappears at once. */
  .button:hover + .tooltip:not(.dismissed),
  .button:focus-visible + .tooltip:not(.dismissed) {
    visibility: visible;
    opacity: 1;
    transition-delay: 1s;
  }

  .tooltip-content {
    position: relative;
    display: block;
    padding: var(--cui-spacings-byte) var(--cui-spacings-kilo);
    font-size: var(--cui-body-s-font-size);
    font-weight: var(--cui-font-weight-regular);
    line-height: var(--cui-body-s-line-height);
    color: var(--cui-fg-normal);
    text-align: left;
    background-color: var(--cui-bg-elevated);
    border: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-radius: var(--cui-border-radius-byte);
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 8%);
  }

  .tooltip-arrow {
    position: absolute;
    top: calc(100% - (var(--tooltip-arrow-size) / 2));
    left: calc(50% - (var(--tooltip-arrow-size) / 2));
    width: var(--tooltip-arrow-size);
    height: var(--tooltip-arrow-size);
    background-color: var(--cui-bg-elevated);
    border-right: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-bottom: var(--cui-border-width-kilo) solid var(--cui-border-subtle);
    border-bottom-right-radius: 2px;
    transform: rotate(45deg);
  }

  /* Spinner — inlined from circuit's Spinner */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .spinner {
    position: absolute;
    top: calc(50% - 16px);
    left: calc(50% - 16px);
    display: block;
    width: var(--cui-icon-sizes-l);
    height: var(--cui-icon-sizes-l);
    color: var(--cui-fg-on-strong);
    pointer-events: none;
    visibility: hidden;
    border: var(--cui-border-width-mega) solid currentColor;
    border-top-color: transparent;
    border-radius: var(--cui-border-radius-circle);
    opacity: 0;
    transform-origin: 50% 50%;
    animation: spin 1s infinite linear;
    transition:
      opacity var(--cui-transitions-default),
      visibility var(--cui-transitions-default);
  }

  .spinner.loading {
    visibility: inherit;
    opacity: 1;
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

  @media (prefers-reduced-motion: reduce) {
    .tooltip {
      transition-duration: 0s;
    }
  }
</style>
