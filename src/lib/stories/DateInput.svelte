<script lang="ts">
  import { MediaQuery } from 'svelte/reactivity';

  import Button from '$lib/components/Button.svelte';
  import Calendar from '$lib/components/Calendar.svelte';
  import Popover from '$lib/components/Popover.svelte';

  interface DateModifiers {
    disabled?: boolean;
    description?: string;
  }

  interface Props {
    /**
     * A clear and concise description of the field's purpose.
     * Required for accessibility.
     */
    label: string;
    /**
     * The selected date as an ISO 8601 date string (`YYYY-MM-DD`), or an empty
     * string while the date is incomplete. Bindable.
     */
    value?: string;
    /**
     * Called with the selected date as an ISO 8601 date string whenever it
     * changes, or with an empty string while the date is incomplete.
     */
    onchange?: (value: string) => void;
    /**
     * The minimum selectable date, inclusive, as an ISO 8601 date string.
     */
    min?: string;
    /**
     * The maximum selectable date, inclusive, as an ISO 8601 date string.
     */
    max?: string;
    /**
     * The name of the underlying date input, for form submission.
     */
    name?: string;
    /**
     * One or more IETF BCP 47 locale identifiers such as `'de-DE'`. Determines
     * the order of the date segments. Defaults to the user's locale.
     */
    locale?: string | string[];
    /**
     * An integer indicating the first day of the week in the calendar. Can be
     * either `1` (Monday) or `7` (Sunday). Default: `1`.
     */
    firstDayOfWeek?: 1 | 7;
    /**
     * A map of dates and their modifiers, which can be used to disable or add a
     * description to a specific date in the calendar.
     */
    modifiers?: Record<string, DateModifiers>;
    /**
     * An information, warning or error message, displayed below the field.
     */
    validationHint?: string;
    /**
     * Label to indicate that the field is optional. Only displayed when the
     * `required` prop is falsy.
     */
    optionalLabel?: string;
    /**
     * Triggers error styles on the field. Important for accessibility.
     */
    invalid?: boolean;
    /**
     * Triggers warning styles on the field.
     */
    hasWarning?: boolean;
    /**
     * Enables valid styles on the field.
     */
    showValid?: boolean;
    /**
     * Marks the field as required. Hides the button to clear the date.
     */
    required?: boolean;
    /**
     * Disables the field.
     */
    disabled?: boolean;
    /**
     * Makes the field read-only. The date can still be read and copied, but not
     * changed.
     */
    readonly?: boolean;
    /**
     * Visually hide the label. This should only be used in rare cases and only
     * if the purpose of the field can be inferred from other context.
     */
    hideLabel?: boolean;
    /**
     * Where to place the calendar relative to the field. Default: 'bottom-end'.
     */
    placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
    /**
     * A hint to the user agent specifying how to prefill the field.
     */
    autocomplete?: 'bday';
    /**
     * Visually hidden label for the year segment. Default: 'Year'.
     */
    yearInputLabel?: string;
    /**
     * Visually hidden label for the month segment. Default: 'Month'.
     */
    monthInputLabel?: string;
    /**
     * Visually hidden label for the day segment. Default: 'Day'.
     */
    dayInputLabel?: string;
    /**
     * Label for the trailing button that opens the calendar.
     * Default: 'Change date'.
     */
    openCalendarButtonLabel?: string;
    /**
     * Label for the button to apply the selected date and close the calendar.
     * Only shown on narrow viewports. Default: 'Apply'.
     */
    applyDateButtonLabel?: string;
    /**
     * Label for the button to clear the date and close the calendar.
     * Default: 'Clear'.
     */
    clearDateButtonLabel?: string;
    /**
     * Text label for the button to navigate to the previous month.
     * Default: 'Previous month'.
     */
    prevMonthButtonLabel?: string;
    /**
     * Text label for the button to navigate to the next month.
     * Default: 'Next month'.
     */
    nextMonthButtonLabel?: string;
    [key: string]: unknown;
  }

  let {
    label,
    value = $bindable(''),
    onchange,
    min,
    max,
    name,
    locale,
    firstDayOfWeek = 1,
    modifiers,
    validationHint = '',
    optionalLabel = '',
    invalid = false,
    hasWarning = false,
    showValid = false,
    required = false,
    disabled = false,
    readonly = false,
    hideLabel = false,
    placement = 'bottom-end',
    autocomplete,
    yearInputLabel = 'Year',
    monthInputLabel = 'Month',
    dayInputLabel = 'Day',
    openCalendarButtonLabel = 'Change date',
    applyDateButtonLabel = 'Apply',
    clearDateButtonLabel = 'Clear',
    prevMonthButtonLabel = 'Previous month',
    nextMonthButtonLabel = 'Next month',
    ...rest
  }: Props = $props();

  type DateValue = number | '';

  const MIN_YEAR = 1;
  const MAX_YEAR = 9999;
  const MIN_MONTH = 1;
  const MAX_MONTH = 12;
  const MIN_DAY = 1;

  const uid = $props.id();
  const validationHintId = `date-input-hint-${uid}`;

  /* On narrow screens the calendar is a sheet, where picking a date only stages
     it and an explicit Apply commits it. */
  const isMobile = new MediaQuery('max-width: 479px', false);

  function pad(value: number) {
    return String(value).padStart(2, '0');
  }

  function daysInMonth(year: number, month: number) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  function clamp(value: number, minimum: number, maximum: number) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  function todaysDate() {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  function toISO(year: DateValue, month: DateValue, day: DateValue) {
    if (year === '' || month === '' || day === '' || day > daysInMonth(year, month)) {
      return '';
    }
    return `${String(year).padStart(4, '0')}-${pad(month)}-${pad(day)}`;
  }

  function parse(date: string | undefined) {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return { year: '' as DateValue, month: '' as DateValue, day: '' as DateValue };
    }
    const [year, month, day] = date.split('-').map(Number);
    return { year, month, day };
  }

  const today = todaysDate();
  const initial = parse(value);

  let year: DateValue = $state(initial.year);
  let month: DateValue = $state(initial.month);
  let day: DateValue = $state(initial.day);

  /* The staged calendar selection, which is what the calendar highlights. On
     wide screens it is committed as soon as the user picks a date. */
  let selection: string | undefined = $state(value || undefined);
  let open = $state(false);
  let segmentInputs: HTMLInputElement[] = $state([]);

  const date = $derived(toISO(year, month, day));
  const minimum = $derived(parse(min));
  const maximum = $derived(parse(max));

  /* Keep the segments in step when the value is changed from the outside,
     without undoing what the user is currently typing. */
  $effect(() => {
    if (value && value !== date) {
      const parsed = parse(value);
      year = parsed.year;
      month = parsed.month;
      day = parsed.day;
    }
  });

  /**
   * The segments of a date in the current locale, in their locale-specific
   * order and with the literals that separate them.
   */
  const segments = $derived.by(() => {
    // 8 March 2024, an unambiguous date to read the parts of
    const testDate = new Date(Date.UTC(2024, 2, 8));
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    })
      .formatToParts(testDate)
      .map(({ type, value }) => (type === 'literal' ? { type, value } : { type, value: '' }));
  });

  /* The limits of each segment narrow as the date is filled in: the months of
     the minimum year start at its month, and so on. */
  const sameYearLimit = $derived(
    minimum.year !== '' && maximum.year !== '' && minimum.year === maximum.year
  );
  const sameMonthLimit = $derived(sameYearLimit && minimum.month === maximum.month);
  const atMinYear = $derived(minimum.year !== '' && minimum.year === year);
  const atMaxYear = $derived(maximum.year !== '' && maximum.year === year);
  const atMinMonth = $derived(atMinYear && minimum.month === month);
  const atMaxMonth = $derived(atMaxYear && maximum.month === month);

  const limits = $derived({
    year: {
      min: minimum.year === '' ? MIN_YEAR : minimum.year,
      max: maximum.year === '' ? MAX_YEAR : maximum.year,
      fallback: today.year,
      step: 10,
      placeholder: 'yyyy',
      label: yearInputLabel
    },
    month: {
      min: sameYearLimit || atMinYear ? (minimum.month as number) : MIN_MONTH,
      max: sameYearLimit || atMaxYear ? (maximum.month as number) : MAX_MONTH,
      fallback: today.month,
      step: 3,
      placeholder: 'mm',
      label: monthInputLabel
    },
    day: {
      min: sameMonthLimit || atMinMonth ? (minimum.day as number) : MIN_DAY,
      max:
        sameMonthLimit || atMaxMonth
          ? (maximum.day as number)
          : year !== '' && month !== ''
            ? daysInMonth(year, month)
            : 31,
      fallback: today.day,
      step: 7,
      placeholder: 'dd',
      label: dayInputLabel
    }
  });

  const values = $derived({ year, month, day });

  type SegmentType = 'year' | 'month' | 'day';

  function clampValue(previous: DateValue, next: DateValue | undefined, min: number, max: number) {
    const value = next || previous;
    if (next === '' || value === '') {
      return '';
    }
    return clamp(value as number, min, max);
  }

  /**
   * Applies a change to one or more segments, clamping each one to its limits,
   * and publishes the resulting date.
   */
  function update(changes: Partial<Record<SegmentType, DateValue>>) {
    year = clampValue(year, changes.year, limits.year.min, limits.year.max);
    month = clampValue(month, changes.month, limits.month.min, limits.month.max);
    // The day is clamped last, so that it can respect the new month's length.
    const maxDay = year !== '' && month !== '' ? daysInMonth(year, month) : 31;
    day = clampValue(day, changes.day, MIN_DAY, maxDay);

    const nextValue = toISO(year, month, day);

    if (nextValue !== value) {
      value = nextValue;
      onchange?.(nextValue);
    }
  }

  function focusSegment(offset: number) {
    const index = segmentInputs.indexOf(document.activeElement as HTMLInputElement);
    segmentInputs[index + offset]?.focus();
  }

  function focusFirstSegment() {
    segmentInputs[0]?.focus();
  }

  /** Wraps a value around its range, the way a spinbutton does. */
  function shiftInRange(value: number, offset: number, min: number, max: number) {
    const range = max - min + 1;
    return ((((value - min + offset) % range) + range) % range) + min;
  }

  function handleSegmentKeyDown(event: KeyboardEvent, type: SegmentType) {
    const input = event.currentTarget as HTMLInputElement;
    const { selectionStart, selectionEnd } = input;
    const { min, max, step, fallback } = limits[type];

    // Move between segments with the arrow keys, without interfering with the
    // text cursor.
    if (selectionStart === selectionEnd) {
      if (event.key === 'ArrowLeft' && (input.readOnly || selectionStart === 0)) {
        event.preventDefault();
        focusSegment(-1);
        return;
      }
      if (event.key === 'ArrowRight' && (input.readOnly || selectionEnd === input.value.length)) {
        event.preventDefault();
        focusSegment(1);
        return;
      }
    }

    // Move on after clearing a segment.
    if (!input.value) {
      if (event.key === 'Backspace') {
        event.preventDefault();
        focusSegment(-1);
        return;
      }
      if (event.key === 'Delete') {
        event.preventDefault();
        focusSegment(1);
        return;
      }
    }

    if (input.disabled || input.readOnly) {
      return;
    }

    const current = values[type];
    const shift = (offset: number) =>
      current === '' ? fallback : shiftInRange(current, offset, min, max);

    let next: number;

    switch (event.key) {
      case 'ArrowUp':
        next = shift(1);
        break;
      case 'ArrowDown':
        next = shift(-1);
        break;
      case 'PageUp':
        next = shift(step);
        break;
      case 'PageDown':
        next = shift(-step);
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
      default:
        return;
    }

    event.preventDefault();
    update({ [type]: next });
  }

  function handleSegmentInput(event: Event, type: SegmentType) {
    const input = event.currentTarget as HTMLInputElement;
    const raw = input.value.replace(/\D/g, '');
    const { max, placeholder } = limits[type];

    if (!raw || raw === '0') {
      update({ [type]: '' });
      input.value = raw;
      return;
    }

    const parsed = Number.parseInt(raw, 10);
    update({ [type]: parsed });

    // Move on once the segment is complete, or once another digit could only
    // exceed the maximum.
    if (raw.length >= placeholder.length || parsed > Math.floor(max / 10)) {
      focusSegment(1);
    }
  }

  function handleFieldClick(event: MouseEvent) {
    // Clicking a segment focuses it on its own.
    if ((event.target as HTMLElement).getAttribute('role') === 'spinbutton') {
      return;
    }
    focusFirstSegment();
  }

  function handleCalendarSelect(selected: string) {
    selection = selected;

    if (!isMobile.current) {
      update(parse(selected));
      open = false;
    }
  }

  function handleApply() {
    if (selection) {
      update(parse(selection));
    }
    open = false;
  }

  function handleClear() {
    update({ year: '', month: '', day: '' });
    selection = undefined;
    open = false;
  }

  function monthName(month: number) {
    return new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' }).format(
      new Date(Date.UTC(2024, month - 1, 1))
    );
  }

  /** The accessible name of the calendar button includes the current date. */
  const calendarButtonLabel = $derived.by(() => {
    if (!date) {
      return openCalendarButtonLabel;
    }
    const formatted = new Intl.DateTimeFormat(locale, {
      dateStyle: 'long',
      timeZone: 'UTC'
    }).format(new Date(`${date}T00:00:00Z`));
    return `${openCalendarButtonLabel}, ${formatted}`;
  });

  const showsHint = $derived(Boolean(validationHint));
  const isStatusHint = $derived(showsHint && !disabled && (invalid || hasWarning || showValid));

  /* Widths of the hidden sizing elements, so that each segment is exactly as
     wide as its content. */
  let widths: number[] = $state([]);
</script>

<fieldset
  class="container"
  data-disabled={disabled}
  aria-describedby={showsHint ? validationHintId : undefined}
  {disabled}
  {...rest}
>
  <legend class="legend">
    <!-- The legend is not focusable, so clicking it focuses the first segment. -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <span
      class="label-text"
      class:label-hide-visually={hideLabel}
      data-disabled={disabled}
      onclick={focusFirstSegment}
    >
      {label}
      {#if optionalLabel && !required}
        <span class="label-text-optional"> ({optionalLabel})</span>
      {/if}
    </span>
  </legend>

  <div class="wrapper">
    <!-- A native date input carries the value, so that the field works in
         forms and can be autofilled, while the segments above it provide the
         accessible, locale-aware editing experience. -->
    <input
      type="date"
      class="hidden"
      {name}
      {min}
      {max}
      {required}
      {disabled}
      {autocomplete}
      {readonly}
      aria-invalid={invalid}
      aria-hidden="true"
      tabindex="-1"
      {value}
    />

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="segments"
      class:invalid={invalid && !disabled}
      class:warning={hasWarning && !disabled && !invalid}
      class:readonly
      onclick={handleFieldClick}
    >
      {#each segments as segment, index (segment.type + index)}
        {#if segment.type === 'literal'}
          <span class="literal" aria-hidden="true">{segment.value}</span>
        {:else}
          {@const type = segment.type as SegmentType}
          {@const limit = limits[type]}
          {@const current = values[type]}
          {@const segmentIndex = segments
            .slice(0, index)
            .filter((part) => part.type !== 'literal').length}
          <input
            bind:this={segmentInputs[segmentIndex]}
            type="text"
            inputmode="numeric"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            enterkeyhint="next"
            role="spinbutton"
            class="segment"
            style="--segment-width: {widths[segmentIndex] ?? 0}px;"
            aria-label={limit.label}
            aria-valuenow={current === '' ? undefined : current}
            aria-valuemin={limit.min}
            aria-valuemax={limit.max}
            aria-valuetext={type === 'month' && current !== ''
              ? `${current}, ${monthName(current)}`
              : undefined}
            aria-invalid={invalid}
            aria-describedby={index === 0 && showsHint ? validationHintId : undefined}
            placeholder={limit.placeholder}
            value={current === '' ? '' : current}
            {required}
            {disabled}
            {readonly}
            onkeydown={(event) => handleSegmentKeyDown(event, type)}
            oninput={(event) => handleSegmentInput(event, type)}
          />
          <span class="segment-size" aria-hidden="true" bind:clientWidth={widths[segmentIndex]}>
            {current === '' ? limit.placeholder : current}
          </span>
        {/if}
      {/each}
    </div>

    <Popover bind:open {placement} offset={4} sheetOnMobile>
      {#snippet trigger(props)}
        <button
          {...props}
          type="button"
          class="calendar-button"
          disabled={disabled || readonly}
          onclick={() => (selection = date || undefined)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M19 10.7H5v8c0 .454.36.8.777.8h12.446a.79.79 0 0 0 .777-.8zM8.453 15.9a1 1 0 1 1 0 2h-.009a1 1 0 0 1 0-2zm3.556 0a1 1 0 1 1 0 2H12a1 1 0 0 1 0-2zm3.556 0a1 1 0 0 1 0 2h-.01a1 1 0 0 1 0-2zm-7.112-3.6a1 1 0 0 1 0 2h-.009a1 1 0 0 1 0-2zm3.556 0a1 1 0 0 1 0 2H12a1 1 0 1 1 0-2zm3.556 0a1 1 0 0 1 0 2h-.01a1 1 0 1 1 0-2zm-1.01-6.2v-.8h-5.11v.8a1 1 0 0 1-2 0v-.8H5.776A.79.79 0 0 0 5 6.1v2.6h14V6.1a.79.79 0 0 0-.777-.8h-1.667v.8a1 1 0 0 1-2 0M21 18.7c0 1.535-1.232 2.8-2.777 2.8H5.777C4.232 21.5 3 20.235 3 18.7V6.1c0-1.535 1.232-2.8 2.777-2.8h1.667v-.8a1 1 0 0 1 2 0v.8h5.112v-.8a1 1 0 1 1 2 0v.8h1.667C19.768 3.3 21 4.565 21 6.1z"
            />
          </svg>
          <span class="hide-visually">{calendarButtonLabel}</span>
        </button>
      {/snippet}

      {#snippet children()}
        <div class="dialog">
          <!-- The label names the calendar. On wide screens the field itself is
               visible next to it, so the heading is only announced. -->
          <header class="dialog-header">
            <h2 class="dialog-headline">{label}</h2>
          </header>

          {#if open}
            <!-- Mounted on open, so that the calendar always opens on the
                 month of the current date. -->
            <Calendar
              class="calendar"
              {selection}
              onselect={handleCalendarSelect}
              minDate={min}
              maxDate={max}
              {locale}
              {firstDayOfWeek}
              {modifiers}
              {prevMonthButtonLabel}
              {nextMonthButtonLabel}
            />
          {/if}

          {#if !required || isMobile.current}
            <div class="buttons">
              {#if !required}
                <Button variant="tertiary" size="s" onclick={handleClear}>
                  {clearDateButtonLabel}
                </Button>
              {/if}
              {#if isMobile.current}
                <div class="apply">
                  <Button variant="primary" size="s" onclick={handleApply}>
                    {applyDateButtonLabel}
                  </Button>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/snippet}
    </Popover>
  </div>

  {#if showsHint && !isStatusHint}
    <div class="validation-hint" id={validationHintId} data-disabled={disabled}>
      {validationHint}
    </div>
  {/if}
  <span role="status" aria-live="polite">
    {#if isStatusHint}
      <div
        class="validation-hint"
        id={validationHintId}
        class:validation-hint-invalid={invalid}
        class:validation-hint-warning={hasWarning}
        class:validation-hint-valid={showValid}
      >
        <div class="validation-hint-icon">
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {#if invalid}
              <path
                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3 11a1 1 0 0 1-1.41 0L8 9.41 6.41 11A1 1 0 0 1 5 9.59L6.59 8 5 6.41A1 1 0 0 1 5 5a1 1 0 0 1 1.41 0L8 6.59 9.59 5A1 1 0 0 1 11 5a1 1 0 0 1 0 1.41L9.41 8 11 9.59A1 1 0 0 1 11 11z"
                fill="currentColor"
              />
            {:else if hasWarning}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.534 1.5c-1.126-2-3.942-2-5.069 0l-5.069 9C-.73 12.5.678 15 2.931 15h10.138c2.253 0 3.661-2.5 2.534-4.5l-5.069-9zm-3.229 8.687a1.25 1.25 0 1 1 1.39 2.08 1.25 1.25 0 0 1-1.39-2.08zM7.293 4.27A1 1 0 0 1 9 4.977v3a1 1 0 0 1-2 0v-3a1 1 0 0 1 .293-.708z"
                fill="currentColor"
              />
            {:else if showValid}
              <path
                d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.62-4 5a.993.993 0 0 1-.72.38H7a1 1 0 0 1-.71-.29l-2-2a1.004 1.004 0 0 1 1.42-1.42L6.92 9.5l3.3-4.12a1 1 0 1 1 1.56 1.24z"
                fill="currentColor"
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
  /* The field chrome mirrors the Input component, so that a DateInput sits
     alongside other form fields. */
  .container {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  .legend {
    padding: 0;
    font-size: var(--cui-typography-body-m-font-size);
    line-height: var(--cui-typography-body-m-line-height);
  }

  .label-text {
    display: inline-block;
    margin-bottom: var(--cui-spacings-bit);
    cursor: default;
  }

  [data-disabled='true'] .label-text {
    color: var(--cui-fg-normal-disabled);
  }

  .label-text-optional {
    color: var(--cui-fg-subtle);
  }

  [data-disabled='true'] .label-text-optional {
    color: var(--cui-fg-subtle-disabled);
  }

  .label-hide-visually {
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

  .wrapper {
    display: flex;
  }

  .hidden {
    display: none;
  }

  /* Segments */
  .segments {
    position: relative;
    z-index: var(--cui-z-index-input);
    display: flex;
    flex-grow: 1;
    gap: 2px;
    min-width: 170px;
    padding: calc(var(--cui-spacings-kilo) - var(--cui-spacings-bit)) var(--cui-spacings-mega);
    cursor: text;
    background-color: var(--cui-bg-normal);
    border-radius: var(--cui-border-radius-byte) 0 0 var(--cui-border-radius-byte);
    outline: 0;
    box-shadow: 0 0 0 1px var(--cui-border-normal);
    transition: box-shadow var(--cui-transitions-default);
  }

  .segments:hover {
    box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
  }

  .segments:focus-within {
    box-shadow: 0 0 0 2px var(--cui-border-accent);
  }

  .invalid {
    box-shadow: 0 0 0 1px var(--cui-border-danger);
  }

  .invalid:hover {
    box-shadow: 0 0 0 1px var(--cui-border-danger-hovered);
  }

  .invalid:focus-within {
    box-shadow: 0 0 0 2px var(--cui-border-danger);
  }

  .warning {
    box-shadow: 0 0 0 1px var(--cui-border-warning);
  }

  .warning:hover {
    box-shadow: 0 0 0 1px var(--cui-border-warning-hovered);
  }

  .warning:focus-within {
    box-shadow: 0 0 0 2px var(--cui-border-warning);
  }

  .readonly {
    background-color: var(--cui-bg-subtle-disabled);
  }

  [data-disabled='true'] .segments {
    background-color: var(--cui-bg-normal-disabled);
    box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
  }

  .segment {
    width: calc(var(--segment-width) + 1px + 2 * var(--cui-spacings-bit));
    padding: var(--cui-spacings-bit);
    font-size: var(--cui-typography-body-s-font-size);
    font-variant-numeric: tabular-nums;
    line-height: var(--cui-typography-body-s-line-height);
    color: var(--cui-fg-normal);
    appearance: textfield;
    background-color: transparent;
    border: none;
    border-radius: var(--cui-border-radius-byte);
    transition: background-color var(--cui-transitions-default);
  }

  .segment::placeholder {
    color: var(--cui-fg-placeholder);
  }

  .segment:focus {
    background-color: var(--cui-bg-highlight);
    outline: none;
  }

  .segment[aria-invalid='true']:not(:focus):not([disabled])::placeholder {
    color: var(--cui-fg-danger);
  }

  .segment:disabled {
    color: var(--cui-fg-normal-disabled);
  }

  /* An offscreen copy of the segment's content, which is what it is sized by. */
  .segment-size {
    position: absolute;
    font-size: var(--cui-typography-body-s-font-size);
    font-variant-numeric: tabular-nums;
    line-height: var(--cui-typography-body-s-line-height);
    visibility: hidden;
    pointer-events: none;
  }

  .literal {
    padding: var(--cui-spacings-bit) 0;
    font-size: var(--cui-typography-body-s-font-size);
    line-height: var(--cui-typography-body-s-line-height);
  }

  .readonly .literal {
    color: var(--cui-fg-subtle);
  }

  /* Calendar button — inlined rather than composed, because it has to sit flush
     against the segments and share their focus ring. */
  .calendar-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--cui-spacings-kilo);
    color: var(--cui-fg-normal);
    cursor: pointer;
    background-color: var(--cui-bg-normal);
    border: 0;
    border-radius: 0 var(--cui-border-radius-byte) var(--cui-border-radius-byte) 0;
    box-shadow: 0 0 0 1px var(--cui-border-normal);
    transition:
      color var(--cui-transitions-default),
      box-shadow var(--cui-transitions-default);
  }

  .calendar-button:hover {
    color: var(--cui-fg-normal-hovered);
    box-shadow: 0 0 0 1px var(--cui-border-normal-hovered);
  }

  .calendar-button:focus,
  .calendar-button[aria-expanded='true'] {
    z-index: calc(var(--cui-z-index-input) + 1);
    box-shadow: 0 0 0 2px var(--cui-border-accent);
  }

  .calendar-button:disabled {
    color: var(--cui-fg-normal-disabled);
    cursor: not-allowed;
    background-color: var(--cui-bg-normal-disabled);
    box-shadow: 0 0 0 1px var(--cui-border-normal-disabled);
  }

  .calendar-button svg {
    width: var(--cui-icon-sizes-mega);
    height: var(--cui-icon-sizes-mega);
  }

  /* The Popover wraps its trigger in an inline-block element, which has to
     stretch for the button to match the height of the segments. */
  .wrapper :global(.trigger) {
    height: auto;
    align-self: stretch;
  }

  /* The Popover pads its content for the common case; the calendar and its
     buttons bring their own padding instead. */
  .wrapper :global(.content) {
    padding: 0;
  }

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--cui-spacings-giga) var(--cui-spacings-mega) var(--cui-spacings-byte);
  }

  .dialog-headline {
    margin: 0;
    font-size: var(--cui-typography-headline-four-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-typography-headline-four-line-height);
    letter-spacing: -0.03em;
  }

  .dialog :global(.calendar) {
    padding: var(--cui-spacings-mega);
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cui-spacings-kilo);
    justify-content: space-between;
    padding: var(--cui-spacings-mega);
    border-top: var(--cui-border-width-kilo) solid var(--cui-border-divider);
  }

  .apply {
    margin-left: auto;
  }

  /* On wide screens the field is visible right next to the calendar, so its
     heading only needs to be announced. */
  @media (min-width: 480px) {
    .dialog-header {
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
  }

  /* Validation hints */
  .validation-hint {
    display: flex;
    margin-top: var(--cui-spacings-bit);
    font-size: var(--cui-typography-body-m-font-size);
    line-height: var(--cui-typography-body-m-line-height);
    color: var(--cui-fg-subtle);
    transition: color var(--cui-transitions-default);
  }

  [data-disabled='true'] .validation-hint {
    color: var(--cui-fg-subtle-disabled);
    pointer-events: none;
  }

  .validation-hint-invalid {
    color: var(--cui-fg-danger);
  }

  .validation-hint-warning {
    color: var(--cui-fg-warning);
  }

  .validation-hint-valid {
    color: var(--cui-fg-success);
  }

  .validation-hint-icon {
    display: block;
    flex-shrink: 0;
    align-self: flex-start;
    width: var(--cui-icon-sizes-kilo);
    height: var(--cui-icon-sizes-kilo);
    margin-top: calc((var(--cui-typography-body-m-line-height) - var(--cui-icon-sizes-kilo)) / 2);
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
