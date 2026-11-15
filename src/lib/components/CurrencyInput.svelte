<script lang="ts" module>
  interface CurrencyFormat {
    symbol: string;
    position: 'prefix' | 'suffix';
    groupDelimiter: string;
    decimalDelimiter: string;
    minimumFractionDigits: number;
    maximumFractionDigits: number;
  }

  // Used in everyday life without decimals, although ISO 4217 defines them.
  const CURRENCIES_WITHOUT_DECIMALS = ['COP', 'HUF'];

  function resolveCurrencyFormat(
    locale: string | string[] | undefined,
    currency: string
  ): CurrencyFormat {
    const numberFormat = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      ...(CURRENCIES_WITHOUT_DECIMALS.includes(currency) && {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    });
    const parts = numberFormat.formatToParts(1001001001.11111);
    const part = (type: Intl.NumberFormatPartTypes) => parts.find((p) => p.type === type)?.value;
    const { minimumFractionDigits = 0, maximumFractionDigits = 0 } = numberFormat.resolvedOptions();
    return {
      symbol: part('currency') ?? currency,
      position: parts[0].type === 'currency' ? 'prefix' : 'suffix',
      groupDelimiter: part('group') ?? '',
      decimalDelimiter: part('decimal') ?? '.',
      minimumFractionDigits,
      maximumFractionDigits
    };
  }

  /**
   * Formats a plain numeric string such as `-1234.5` with the locale's
   * delimiters. Fraction digits beyond the maximum are cut off.
   */
  function formatNumericString(numeric: string, format: CurrencyFormat) {
    if (numeric === '' || numeric === '-') {
      return numeric;
    }
    const isNegative = numeric.startsWith('-');
    const [integer, fraction] = numeric.replace('-', '').split('.');
    const firstSignificant = Math.max(integer.search(/[1-9]/), 0);
    const grouped =
      integer.slice(0, firstSignificant) +
      integer.slice(firstSignificant).replace(/\B(?=(\d{3})+(?!\d))/g, format.groupDelimiter);
    const hasDecimal = fraction !== undefined && format.maximumFractionDigits > 0;
    return (
      (isNegative ? '-' : '') +
      grouped +
      (hasDecimal ? format.decimalDelimiter + fraction.slice(0, format.maximumFractionDigits) : '')
    );
  }

  function toNumericString(value: number | undefined, format: CurrencyFormat) {
    if (value === undefined || Number.isNaN(value)) {
      return '';
    }
    return value.toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: format.maximumFractionDigits
    });
  }

  function toNumber(numeric: string) {
    return /\d/.test(numeric) ? Number(numeric) : undefined;
  }

  /** Drops leading zeros and clears a value without digits, as on blur. */
  function fixLeadingZeros(numeric: string) {
    if (!/\d/.test(numeric)) {
      return '';
    }
    const isNegative = numeric.startsWith('-');
    const [integer, fraction] = numeric.replace('-', '').split('.');
    return (
      (isNegative ? '-' : '') +
      (integer.replace(/^0+/, '') || '0') +
      (fraction ? `.${fraction}` : '')
    );
  }
</script>

<script lang="ts">
  import { flushSync, untrack } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<
    HTMLInputAttributes,
    'size' | 'prefix' | 'type' | 'value' | 'placeholder' | 'inputmode'
  > {
    /**
     * A clear and concise description of the input's purpose.
     */
    label: string;
    /**
     * An ISO 4217 currency code, such as `USD` for the US dollar, `EUR` for
     * the euro or `CNY` for the Chinese yuan.
     */
    currency: string;
    /**
     * One or more IETF BCP 47 locale identifiers, such as `de-DE` or
     * `['GB', 'en-US']`, that decide the symbol, its position and the
     * delimiters. Default: the user's locale.
     */
    formattingLocale?: string | string[];
    /**
     * The amount, bindable. `undefined` while the input is empty.
     */
    value?: number;
    /**
     * A short hint shown inside the empty input. A number is formatted in the
     * currency's format.
     */
    placeholder?: string | number;
    /**
     * Whether a minus sign can be typed. Default: `true`.
     */
    allowNegative?: boolean;
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
     * Choose from 2 sizes. Default: `m`.
     */
    size?: 's' | 'm';
    /**
     * Disables password manager overlays on fields that might be mistaken for
     * login fields.
     */
    passwordManagerIgnore?: boolean;
  }

  let {
    label,
    currency,
    formattingLocale,
    value = $bindable(),
    placeholder,
    allowNegative = true,
    hideLabel = false,
    optionalLabel,
    validationHint,
    invalid = false,
    hasWarning = false,
    showValid = false,
    size = 'm',
    passwordManagerIgnore,
    id: customId,
    required,
    disabled,
    class: className,
    style,
    oninput,
    onblur,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const id = $derived(customId || `currency-input-${uid}`);
  const symbolId = `currency-input-${uid}-symbol`;
  const validationHintId = `currency-input-${uid}-hint`;

  const format = $derived(resolveCurrencyFormat(formattingLocale, currency));
  const placeholderText = $derived(
    typeof placeholder === 'number'
      ? new Intl.NumberFormat(formattingLocale, {
          minimumFractionDigits: format.minimumFractionDigits,
          maximumFractionDigits: format.maximumFractionDigits
        }).format(placeholder)
      : placeholder
  );

  // What the user typed, as a plain numeric string such as `-1234.5`. It keeps
  // what a number can't, like a trailing decimal separator while typing.
  let numeric = $state(untrack(() => toNumericString(value, format)));
  // The last value this input reported. Any other value was set from outside.
  let reportedValue = untrack(() => value);
  const text = $derived(
    formatNumericString(value === reportedValue ? numeric : toNumericString(value, format), format)
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
    [symbolId, describedBy, validationHint && validationHintId].filter(Boolean).join(' ')
  );

  function update(input: HTMLInputElement, nextNumeric: string, caret?: number) {
    // Svelte skips the write when the formatted text didn't change, e.g. after an ignored letter.
    input.value = formatNumericString(nextNumeric, format);
    numeric = nextNumeric;
    reportedValue = toNumber(nextNumeric);
    value = reportedValue;
    // Writing the value moves the caret to the end, so restore it after Svelte has written.
    flushSync();
    if (caret !== undefined) {
      input.setSelectionRange(caret, caret);
    }
  }

  function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
    const { inputType = '', data = null } = event instanceof InputEvent ? event : {};
    const input = event.currentTarget;
    let raw = input.value;
    let caret = input.selectionStart ?? raw.length;
    const isDigit = (char: string) => char >= '0' && char <= '9';

    // Deleting a group delimiter deletes the digit next to it instead.
    const digitsOf = (str: string) => [...str].filter(isDigit).join('');
    if (inputType.startsWith('delete') && digitsOf(raw) === digitsOf(text)) {
      const backward = inputType === 'deleteContentBackward';
      let index = backward ? caret - 1 : caret;
      while (index >= 0 && index < raw.length && !isDigit(raw[index])) {
        index += backward ? -1 : 1;
      }
      if (index >= 0 && index < raw.length) {
        raw = raw.slice(0, index) + raw.slice(index + 1);
        caret = backward ? index : caret;
      }
    }

    // A typed '.' or ',' is a decimal separator, whatever the locale's is. Only the first one counts.
    const typedDecimal =
      inputType === 'insertText' &&
      (data === '.' || data === ',' || data === format.decimalDelimiter)
        ? caret - 1
        : -1;
    const existingDecimal = raw.indexOf(format.decimalDelimiter);
    const decimalIndex =
      typedDecimal === -1 || existingDecimal === -1
        ? Math.max(typedDecimal, existingDecimal)
        : Math.min(typedDecimal, existingDecimal);

    let digits = '';
    let charsBeforeCaret = 0;
    for (let index = 0; index < raw.length; index += 1) {
      const isDecimal = index === decimalIndex && format.maximumFractionDigits > 0;
      if (isDigit(raw[index]) || isDecimal) {
        digits += isDecimal ? '.' : raw[index];
        if (index < caret) charsBeforeCaret += 1;
      }
    }

    // One minus sign makes the amount negative; typing a second one removes both.
    const isNegative = allowNegative && raw.split('-').length === 2;
    const [integer, fraction] = digits.split('.');
    const nextNumeric =
      (isNegative ? '-' : '') +
      integer +
      (fraction === undefined ? '' : `.${fraction.slice(0, format.maximumFractionDigits)}`);
    const nextText = formatNumericString(nextNumeric, format);

    let nextCaret = isNegative ? 1 : 0;
    for (let counted = 0; nextCaret < nextText.length && counted < charsBeforeCaret; nextCaret++) {
      if (isDigit(nextText[nextCaret]) || nextText[nextCaret] === format.decimalDelimiter) {
        counted += 1;
      }
    }

    update(input, nextNumeric, nextCaret);
    oninput?.(event);
  }

  function handleBlur(event: FocusEvent & { currentTarget: HTMLInputElement }) {
    const fixed = fixLeadingZeros(numeric);
    if (fixed !== numeric) {
      update(event.currentTarget, fixed);
    }
    onblur?.(event);
  }
</script>

<!--
  @component
  A field for an amount of money. Looks up the currency symbol, places it and
  formats the amount according to the locale.
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
    <span id={symbolId} class={['currency', format.position]}>{format.symbol}</span>
    <input
      {id}
      class={['base', !disabled && hasWarning && 'warning', `has-${format.position}`]}
      type="text"
      inputmode="decimal"
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
      placeholder={placeholderText}
      value={text}
      oninput={handleInput}
      onblur={handleBlur}
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

  /* Input — inlined from circuit's Input, right-aligned */
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
    text-align: right;
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

  /* Currency symbol — Input's prefix and suffix, with CurrencyInput's centring */
  .currency {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--field-input-font-size);
    line-height: var(--field-input-line-height);
    color: var(--cui-fg-subtle);
    pointer-events: none;
  }

  .currency.prefix {
    left: 0;
  }

  .currency.suffix {
    right: 0;
  }

  .s .currency {
    width: var(--cui-spacings-tera);
    height: var(--cui-spacings-tera);
    padding: var(--cui-spacings-byte);
  }

  .s .has-prefix {
    padding-left: var(--cui-spacings-tera);
  }

  .s .has-suffix {
    padding-right: var(--cui-spacings-tera);
  }

  .m .currency {
    width: var(--cui-spacings-exa);
    height: var(--cui-spacings-exa);
    padding: var(--cui-spacings-kilo);
  }

  .m .has-prefix {
    padding-left: var(--cui-spacings-exa);
  }

  .m .has-suffix {
    padding-right: var(--cui-spacings-exa);
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
