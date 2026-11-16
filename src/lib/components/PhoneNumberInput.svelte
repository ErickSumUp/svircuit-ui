<script lang="ts" module>
  export type CountryCodeOption = {
    /**
     * The country as a two-letter [ISO 3166 region code](https://www.iso.org/iso-3166-country-codes.html).
     */
    country: string;
    /**
     * The [country calling code](https://en.wikipedia.org/wiki/List_of_country_calling_codes), e.g. `+49`.
     */
    code: string;
    /**
     * Area codes that tell apart countries sharing a calling code, e.g.
     * `['268']` for Antigua & Barbuda, `+1 (268)`.
     */
    areaCodes?: string[];
  };

  export function parsePhoneNumber(
    value: string | undefined,
    options: CountryCodeOption[],
    currentCountry?: string
  ): { countryCode?: string; subscriberNumber?: string } {
    const sanitizedValue = value
      ?.replace(/[^+0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^00/, '+');

    if (!sanitizedValue) {
      return {};
    }
    if (!sanitizedValue.startsWith('+')) {
      return { subscriberNumber: sanitizedValue };
    }

    const noWhitespaceValue = sanitizedValue.replace(/\s/g, '');
    const matchedOptions = [...options]
      // Options with area codes and longer, more specific codes match first.
      .sort((a, b) => {
        if (a.areaCodes && !b.areaCodes) return -1;
        if (!a.areaCodes && b.areaCodes) return 1;
        return b.code.length - a.code.length;
      })
      .filter(({ code, areaCodes }) =>
        areaCodes
          ? areaCodes.some((areaCode) => noWhitespaceValue.startsWith(`${code}${areaCode}`))
          : sanitizedValue.startsWith(code)
      );

    if (matchedOptions.length === 0) {
      return { subscriberNumber: sanitizedValue };
    }

    // A number with only a shared calling code, e.g. `+1`, keeps the selected country.
    const matchedOption =
      matchedOptions.find((option) => option.country === currentCountry) ?? matchedOptions[0];
    const subscriberNumber = sanitizedValue.slice(matchedOption.code.length).trim();

    return subscriberNumber
      ? { countryCode: matchedOption.country, subscriberNumber }
      : { countryCode: matchedOption.country };
  }

  /* Countries where a leading zero is part of the number and is kept in the
     international format, e.g. Italian geographic numbers after +39. */
  const COUNTRIES_WITH_LEADING_ZERO = new Set(['IT']);

  export function normalizePhoneNumber(code: string, subscriberNumber: string, country?: string) {
    let normalized = subscriberNumber.replace(/[^0-9\s]/g, ' ').replace(/\s+/g, ' ');
    if (!country || !COUNTRIES_WITH_LEADING_ZERO.has(country)) {
      normalized = normalized.replace(/^0+/, '');
    }
    return `${code}${normalized}`;
  }

  function getCountryName(country: string, locale: string | string[] | undefined) {
    try {
      return new Intl.DisplayNames(locale, { type: 'region' }).of(country) ?? country;
    } catch {
      return country;
    }
  }
</script>

<script lang="ts">
  import { untrack, type Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<
    HTMLInputAttributes,
    'size' | 'type' | 'value' | 'onchange' | 'placeholder' | 'prefix' | 'children'
  > {
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
     * One or more locales, e.g. `de-DE`, used for the country names. Defaults
     * to the browser's locale.
     */
    locale?: string | string[];
    /**
     * Choose from 2 sizes. Default: `m`.
     */
    size?: 's' | 'm';
    /**
     * The phone number in the [E.164 format](https://en.wikipedia.org/wiki/E.164),
     * e.g. `+17024181234`. Bindable.
     */
    value?: string;
    /**
     * Called with the phone number in the E.164 format whenever the country
     * code or the subscriber number changes.
     */
    onchange?: (value: string) => void;
    countryCode: {
      /**
       * Visually hidden label of the country code select.
       */
      label: string;
      /**
       * The country calling codes to choose from.
       */
      options: CountryCodeOption[];
      /**
       * The country selected initially when `value` has no country code.
       */
      defaultValue?: string;
      invalid?: boolean;
      readonly?: boolean;
      onchange?: (event: Event & { currentTarget: HTMLSelectElement }) => void;
      /**
       * Rendered at the start of the country code, usually the selected
       * country's flag. Receives the selected `country`.
       */
      prefix?: Snippet<[{ country: string | undefined }]>;
    };
    subscriberNumber: {
      /**
       * Visually hidden label of the subscriber number input.
       */
      label: string;
      placeholder?: string;
      invalid?: boolean;
      readonly?: boolean;
      oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
    };
  }

  let {
    label,
    hideLabel = false,
    optionalLabel,
    validationHint,
    invalid = false,
    hasWarning = false,
    showValid = false,
    locale,
    size = 'm',
    value = $bindable(),
    onchange,
    countryCode,
    subscriberNumber,
    readonly,
    required,
    disabled,
    class: className,
    style,
    'aria-describedby': describedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const countryCodeId = `phone-number-input-${uid}-country-code`;
  const subscriberNumberId = `phone-number-input-${uid}-subscriber-number`;
  const validationHintId = `phone-number-input-${uid}-hint`;

  const options = $derived(
    countryCode.options
      .map(({ code, country }) => ({
        value: country,
        label: `${getCountryName(country, locale)} (${code})`
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  );

  const initial = untrack(() => parsePhoneNumber(value, countryCode.options));
  let country = $state(untrack(() => initial.countryCode ?? countryCode.defaultValue ?? ''));
  let subscriber = $state(initial.subscriberNumber ?? '');
  let reportedValue = $state(untrack(() => value));

  // A value set from outside replaces what the user entered.
  const external = $derived(
    value === reportedValue
      ? undefined
      : parsePhoneNumber(
          value,
          countryCode.options,
          untrack(() => country)
        )
  );
  const shownCountry = $derived(external?.countryCode ?? country);
  const shownSubscriber = $derived(external ? (external.subscriberNumber ?? '') : subscriber);
  const shownCode = $derived(
    countryCode.options.find((option) => option.country === shownCountry)?.code
  );

  const isCountryCodeReadonly = $derived(readonly || countryCode.readonly);
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

  function update(nextCountry: string, nextSubscriber: string) {
    country = nextCountry;
    subscriber = nextSubscriber;
    const code = countryCode.options.find((option) => option.country === nextCountry)?.code;
    if (!code) {
      return;
    }
    reportedValue = normalizePhoneNumber(code, nextSubscriber, nextCountry);
    value = reportedValue;
    onchange?.(reportedValue);
  }

  function handleCountryChange(event: Event & { currentTarget: HTMLSelectElement }) {
    countryCode.onchange?.(event);
    update(event.currentTarget.value, shownSubscriber);
  }

  function handleSubscriberInput(event: Event & { currentTarget: HTMLInputElement }) {
    subscriberNumber.oninput?.(event);
    update(shownCountry, event.currentTarget.value);
  }

  function handlePaste(event: ClipboardEvent) {
    if (disabled || readonly || isCountryCodeReadonly) {
      return;
    }
    event.preventDefault();
    const pasted = parsePhoneNumber(
      event.clipboardData?.getData('text/plain'),
      countryCode.options,
      shownCountry
    );
    update(pasted.countryCode ?? shownCountry, pasted.subscriberNumber ?? shownSubscriber);
  }
</script>

<!--
  @component
  A phone number field with a country code select and a subscriber number
  input. It reports the number in the E.164 format.
-->
<fieldset
  class={['fieldset', size, className]}
  {style}
  {disabled}
  aria-describedby={ariaDescribedBy}
>
  <legend class="legend">
    <span class={['label-text', hideLabel && 'hide-visually']}>
      {label}
      {#if optionalLabel && !required}
        <span class="label-text-optional"> ({optionalLabel})</span>
      {/if}
    </span>
  </legend>
  <div class="wrapper">
    <input {...rest} type="hidden" value={value ?? ''} {disabled} />
    <div class="country-code">
      <label class="hide-visually" for={countryCodeId}>{countryCode.label}</label>
      {#if countryCode.prefix}
        <span class="prefix"
          >{@render countryCode.prefix({ country: shownCountry || undefined })}</span
        >
      {/if}
      {#if isCountryCodeReadonly}
        <input
          id={countryCodeId}
          class={['base', countryCode.prefix && 'has-prefix']}
          aria-describedby={ariaDescribedBy}
          aria-invalid={invalid || countryCode.invalid ? 'true' : undefined}
          autocomplete="tel-country-code"
          readonly
          {disabled}
          value={shownCode ?? ''}
        />
      {:else}
        <select
          id={countryCodeId}
          class={['base', 'select', countryCode.prefix && 'has-prefix']}
          aria-describedby={ariaDescribedBy}
          aria-invalid={invalid || countryCode.invalid ? 'true' : undefined}
          autocomplete="tel-country-code"
          {required}
          {disabled}
          value={shownCountry}
          onchange={handleCountryChange}
        >
          {#if !shownCountry}
            <option value="" disabled hidden></option>
          {/if}
          {#each options as option (option.value)}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
        <!-- The select shows the country name in its list; closed, it shows the code like circuit's. -->
        <span class={['code', countryCode.prefix && 'has-prefix']} aria-hidden="true">
          {shownCode}
        </span>
      {/if}
    </div>
    <div class="subscriber-number">
      <label class="hide-visually" for={subscriberNumberId}>{subscriberNumber.label}</label>
      <input
        id={subscriberNumberId}
        class={['base', !disabled && hasWarning && 'warning']}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || subscriberNumber.invalid ? 'true' : undefined}
        autocomplete="tel-national"
        inputmode="tel"
        pattern={'^(?:[0-9]\\s?){0,14}[0-9]$'}
        placeholder={subscriberNumber.placeholder}
        readonly={readonly || subscriberNumber.readonly}
        {required}
        {disabled}
        value={shownSubscriber}
        oninput={handleSubscriberInput}
        onpaste={handlePaste}
      />
    </div>
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
    --phone-number-input-prefix-width: var(--cui-spacings-tera);
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
    --phone-number-input-prefix-width: var(--cui-spacings-exa);
  }

  .m .label-text,
  .m .validation-hint {
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
  }

  .m .validation-hint-icon {
    margin-top: calc((var(--cui-body-s-line-height) - var(--cui-icon-sizes-s)) / 2);
  }

  /* Inputs — from circuit's Input */
  .base {
    box-sizing: border-box;
    width: 100%;
    padding: var(--field-input-padding-block) var(--field-input-padding-inline);
    margin: 0;
    font-size: var(--field-input-font-size);
    line-height: var(--field-input-line-height);
    color: var(--cui-fg-normal);
    appearance: none;
    outline: var(--cui-border-width-mega) solid transparent;
    background-color: var(--cui-bg-normal);
    border: 1px solid var(--cui-border-normal);
    border-radius: var(--field-input-border-radius);
    box-shadow: none;
    transition:
      box-shadow var(--cui-transitions-default),
      border var(--cui-transitions-default);
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

  /* Country code */
  .country-code {
    position: relative;
  }

  .select {
    overflow: hidden;
    color: transparent;
    white-space: nowrap;
    cursor: pointer;
  }

  .select option {
    color: var(--cui-fg-normal);
    background-color: var(--cui-bg-elevated);
  }

  .code,
  .prefix {
    position: absolute;
    top: 50%;
    z-index: 1;
    pointer-events: none;
    transform: translateY(-50%);
  }

  .code {
    right: var(--field-input-padding-inline);
    left: calc(var(--field-input-padding-inline) + 1px);
    overflow: hidden;
    font-size: var(--field-input-font-size);
    line-height: var(--field-input-line-height);
    color: var(--cui-fg-normal);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .select:disabled + .code {
    color: var(--cui-fg-normal-disabled);
  }

  .prefix {
    left: calc(var(--field-input-padding-inline) + 1px);
    display: flex;
  }

  .has-prefix {
    padding-left: calc(var(--field-input-padding-inline) + var(--phone-number-input-prefix-width));
  }

  .code.has-prefix {
    padding-left: var(--phone-number-input-prefix-width);
  }

  /* Subscriber number, above the country code so their shared border looks single */
  .subscriber-number {
    position: relative;
    z-index: 1;
    flex-grow: 1;
  }

  .country-code:hover,
  .country-code:focus-within {
    z-index: 2;
  }

  .wrapper {
    display: flex;
  }

  @media (max-width: 479px) {
    .wrapper {
      flex-direction: column;
    }

    .subscriber-number {
      transform: translateY(-1px);
    }

    .country-code .base {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    .subscriber-number .base {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  @media (min-width: 480px) {
    .country-code {
      flex: 0 0 40%;
      min-width: min(12rem, 50%);
      max-width: 20rem;
    }

    .subscriber-number {
      flex: 1 1 0;
      min-width: 0;
      transform: translateX(-1px);
    }

    .country-code .base {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .subscriber-number .base {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
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
