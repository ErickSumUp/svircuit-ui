<script lang="ts">
  import { untrack } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface DateModifiers {
    /**
     * Prevent the date from being selected.
     */
    disabled?: boolean;
    /**
     * An additional description of the date for screen readers, such as
     * 'Booked'. Marks the date with a dot.
     */
    description?: string;
  }

  interface DateRange {
    start?: string;
    end?: string;
  }

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onselect'> {
    /**
     * The currently selected date, or range of dates, as ISO 8601 date strings
     * (`YYYY-MM-DD`).
     */
    selection?: string | DateRange;
    /**
     * Called when the user selects a date, with the date as an ISO 8601 date
     * string (`YYYY-MM-DD`).
     */
    onselect?: (date: string) => void;
    /**
     * Called with the visible months on the initial render and whenever the user
     * navigates to different months, as `YYYY-MM` strings.
     */
    onmonthschange?: (months: string[]) => void;
    /**
     * The minimum selectable date, inclusive, as an ISO 8601 date string.
     */
    minDate?: string;
    /**
     * The maximum selectable date, inclusive, as an ISO 8601 date string.
     */
    maxDate?: string;
    /**
     * One or more IETF BCP 47 locale identifiers such as `'de-DE'` or
     * `['GB', 'en-US']`. Defaults to the user's locale.
     */
    locale?: string | string[];
    /**
     * An integer indicating the first day of the week. Can be either `1`
     * (Monday) or `7` (Sunday). Default: `1`.
     */
    firstDayOfWeek?: 1 | 7;
    /**
     * A map of dates and their modifiers, which can be used to disable or add a
     * description to a specific date. The date key must be in the ISO 8601
     * format (`YYYY-MM-DD`).
     *
     * @example
     * {
     *   '2020-03-15': { disabled: true },
     *   '2020-03-20': { description: 'Booked' },
     * }
     */
    modifiers?: Record<string, DateModifiers>;
    /**
     * The number of months to display at a time. Default: `1`.
     */
    numberOfMonths?: number;
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
    selection,
    onselect,
    onmonthschange,
    minDate,
    maxDate,
    locale,
    firstDayOfWeek = 1,
    modifiers,
    numberOfMonths = 1,
    prevMonthButtonLabel = 'Previous month',
    nextMonthButtonLabel = 'Next month',
    ...rest
  }: Props = $props();

  const DAYS_IN_WEEK = 7;

  /* Dates are ISO 8601 strings (`YYYY-MM-DD`) and months are `YYYY-MM`, which
     replaces circuit-ui's Temporal objects and its polyfill. Both sort
     lexicographically, so comparing them is a plain string comparison, and the
     arithmetic below runs in UTC so that it is never affected by daylight
     saving time. */

  function pad(value: number) {
    return String(value).padStart(2, '0');
  }

  function toDate(date: string) {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day ?? 1));
  }

  function toISO(date: Date) {
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  }

  function daysInMonth(year: number, month: number) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  function addDays(date: string, amount: number) {
    const value = toDate(date);
    value.setUTCDate(value.getUTCDate() + amount);
    return toISO(value);
  }

  function addMonths(date: string, amount: number) {
    const [year, month, day] = date.split('-').map(Number);
    const total = year * 12 + (month - 1) + amount;
    const nextYear = Math.floor(total / 12);
    const nextMonth = (total % 12) + 1;
    // A day that doesn't exist in the target month is clamped to its last day,
    // so that 31 January plus one month is 28 February.
    const nextDay = Math.min(day, daysInMonth(nextYear, nextMonth));
    return `${nextYear}-${pad(nextMonth)}-${pad(nextDay)}`;
  }

  function monthOf(date: string) {
    return date.slice(0, 7);
  }

  function lastDayOfMonth(date: string) {
    const [year, month] = date.split('-').map(Number);
    return `${monthOf(date)}-${pad(daysInMonth(year, month))}`;
  }

  function addMonthsToMonth(month: string, amount: number) {
    return monthOf(addMonths(`${month}-01`, amount));
  }

  /** The ISO weekday, from 1 (Monday) to 7 (Sunday). */
  function weekdayOf(date: string) {
    return toDate(date).getUTCDay() || 7;
  }

  function firstDateOfWeek(date: string) {
    return addDays(date, -((weekdayOf(date) - firstDayOfWeek + DAYS_IN_WEEK) % DAYS_IN_WEEK));
  }

  function lastDateOfWeek(date: string) {
    return addDays(
      date,
      (firstDayOfWeek + DAYS_IN_WEEK - 1 - weekdayOf(date) + DAYS_IN_WEEK) % DAYS_IN_WEEK
    );
  }

  function clampDate(date: string) {
    if (minDate && date < minDate) {
      return minDate;
    }
    if (maxDate && date > maxDate) {
      return maxDate;
    }
    return date;
  }

  function todaysDate() {
    const now = new Date();
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  }

  const today = todaysDate();

  /* The calendar opens on the selection, and navigates independently from it
     afterwards, so the selection is read once rather than tracked. */
  const initialDate = untrack(() =>
    clampDate((typeof selection === 'string' ? selection : selection?.start) ?? today)
  );

  let calendar: HTMLDivElement;
  let focusedDate = $state(initialDate);
  let hoveredDate: string | null = $state(null);
  /* Only the first visible month is kept, so that changing `numberOfMonths`
     needs no bookkeeping of its own. */
  let firstMonth = $state(monthOf(initialDate));

  const months = $derived(
    Array.from({ length: numberOfMonths }, (_, index) => addMonthsToMonth(firstMonth, index))
  );

  const isPrevMonthDisabled = $derived(Boolean(minDate) && months[0] <= monthOf(minDate as string));
  const isNextMonthDisabled = $derived(
    Boolean(maxDate) && months[months.length - 1] >= monthOf(maxDate as string)
  );

  const weekdays = $derived(
    Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
      // 1973 started with a Monday
      const date = toDate(`1973-01-${pad(index + firstDayOfWeek)}`);
      return {
        narrow: new Intl.DateTimeFormat(locale, { weekday: 'narrow', timeZone: 'UTC' }).format(
          date
        ),
        long: new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(date)
      };
    })
  );

  function getMonthHeadline(month: string) {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC'
    }).format(toDate(`${month}-01`));
  }

  /** The weeks of a month, including the days of the adjacent months that
      complete the first and last week. */
  function getViewOfMonth(month: string) {
    const [year, monthNumber] = month.split('-').map(Number);
    const start = firstDateOfWeek(`${month}-01`);
    const end = lastDateOfWeek(`${month}-${pad(daysInMonth(year, monthNumber))}`);

    const weeks: string[][] = [];
    let current = start;

    while (current <= end) {
      const week: string[] = [];
      for (let index = 0; index < DAYS_IN_WEEK; index += 1) {
        week.push(current);
        current = addDays(current, 1);
      }
      weeks.push(week);
    }

    return weeks;
  }

  function isDateActive(date: string) {
    if (!selection) {
      return false;
    }
    if (typeof selection === 'string') {
      return date === selection;
    }
    if (selection.start && selection.end) {
      return date >= selection.start && date <= selection.end;
    }
    return date === selection.start;
  }

  function isDateDisabled(date: string) {
    return Boolean(
      modifiers?.[date]?.disabled || (minDate && date < minDate) || (maxDate && date > maxDate)
    );
  }

  /** Which part of a selected range a date represents, which is what draws the
      bar connecting the range. */
  function getSelectionType(date: string) {
    if (!selection) {
      return null;
    }
    if (typeof selection === 'string') {
      return date === selection ? 'selected' : null;
    }
    if (!selection.start && !selection.end) {
      return null;
    }
    const start = selection.start as string;

    if (selection.end || (hoveredDate && hoveredDate > start)) {
      const later = (selection.end ?? hoveredDate) as string;

      if (date === start && date === later) {
        return 'selected';
      }
      if (date === start) {
        return 'range-start';
      }
      if (date === later) {
        return 'range-end';
      }
      if (date > start && date < later) {
        return 'range-middle';
      }
    }

    return date === start ? 'selected' : null;
  }

  function isDateInMonthRange(date: string) {
    if (minDate && monthOf(date) < monthOf(minDate)) {
      return false;
    }
    if (maxDate && monthOf(date) > monthOf(maxDate)) {
      return false;
    }
    return true;
  }

  function shiftMonths(amount: number) {
    firstMonth = addMonthsToMonth(firstMonth, amount);

    // The focused date follows along only when it is scrolled out of view.
    if (!months.includes(monthOf(focusedDate))) {
      focusedDate = addMonths(focusedDate, amount);
    }
  }

  function focusDate(date: string) {
    focusedDate = date;

    // Scroll the visible months to the newly focused date, if needed.
    const month = monthOf(date);
    if (month < months[0]) {
      firstMonth = month;
    } else if (month > months[months.length - 1]) {
      firstMonth = addMonthsToMonth(month, -(numberOfMonths - 1));
    }

    // Focus the day on the next frame, once the grid has been rerendered. The
    // calendar may be gone by then, if selecting a date dismissed it.
    requestAnimationFrame(() => {
      calendar?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus();
    });
  }

  function handleKeyDown(event: KeyboardEvent) {
    let nextFocusedDate: string;

    switch (event.key) {
      case 'ArrowRight':
        nextFocusedDate = addDays(focusedDate, 1);
        break;
      case 'ArrowLeft':
        nextFocusedDate = addDays(focusedDate, -1);
        break;
      case 'ArrowDown':
        nextFocusedDate = addDays(focusedDate, DAYS_IN_WEEK);
        break;
      case 'ArrowUp':
        nextFocusedDate = addDays(focusedDate, -DAYS_IN_WEEK);
        break;
      case 'PageUp':
        nextFocusedDate = addMonths(focusedDate, event.shiftKey ? -12 : -1);
        break;
      case 'PageDown':
        nextFocusedDate = addMonths(focusedDate, event.shiftKey ? 12 : 1);
        break;
      case 'Home':
        nextFocusedDate = firstDateOfWeek(focusedDate);
        break;
      case 'End':
        nextFocusedDate = lastDateOfWeek(focusedDate);
        break;
      default:
        return;
    }

    event.preventDefault();

    if (isDateInMonthRange(nextFocusedDate)) {
      focusDate(nextFocusedDate);
    }
  }

  function handleDayClick(event: MouseEvent, date: string) {
    if (isDateDisabled(date)) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      onselect?.(date);
    }

    focusDate(date);
  }

  /* Swiping sideways moves to the previous or next month. */
  const MIN_SWIPE_DISTANCE = 50;

  let touchStart: { clientX: number; clientY: number } | null = null;
  let touchEnd: { clientX: number; clientY: number } | null = null;

  function handleTouchStart(event: TouchEvent) {
    // Some browsers re-use touch objects between events, so it's best to copy
    // the properties we care about, rather than referencing the entire object.
    const { clientX, clientY } = event.targetTouches[0];
    touchStart = { clientX, clientY };
    touchEnd = null;
  }

  function handleTouchMove(event: TouchEvent) {
    const { clientX, clientY } = event.targetTouches[0];
    touchEnd = { clientX, clientY };
  }

  function handleTouchEnd() {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distanceX = touchStart.clientX - touchEnd.clientX;
    const distanceY = touchStart.clientY - touchEnd.clientY;

    if (Math.abs(distanceX) < Math.abs(distanceY) || Math.abs(distanceX) < MIN_SWIPE_DISTANCE) {
      return;
    }

    if (distanceX < 0 && !isPrevMonthDisabled) {
      shiftMonths(-1);
    }
    if (distanceX > 0 && !isNextMonthDisabled) {
      shiftMonths(1);
    }
  }

  const uid = $props.id();

  $effect(() => {
    onmonthschange?.(months);
  });
</script>

<div bind:this={calendar} role="group" {...rest}>
  <div class="header">
    <div class="prev">
      <button
        class="nav-button focus-visible"
        type="button"
        disabled={isPrevMonthDisabled}
        onclick={() => shiftMonths(-1)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M7.47 1.47a.75.75 0 1 1 1.06 1.06L3.81 7.25h10.94v1.5H3.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06z"
          />
        </svg>
        <span class="hide-visually">{prevMonthButtonLabel}</span>
      </button>
    </div>
    <div class="next">
      <button
        class="nav-button focus-visible"
        type="button"
        disabled={isNextMonthDisabled}
        onclick={() => shiftMonths(1)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M7.47 1.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H1.25v-1.5h10.94L7.47 2.53a.75.75 0 0 1 0-1.06"
          />
        </svg>
        <span class="hide-visually">{nextMonthButtonLabel}</span>
      </button>
    </div>
  </div>
  <div class="months">
    {#each months as month (month)}
      <div
        class="month"
        style="--calendar-days-in-week: {DAYS_IN_WEEK};"
        role="group"
        aria-labelledby="calendar-{uid}-{month}"
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
      >
        <h2 id="calendar-{uid}-{month}" class="headline" aria-live="polite" aria-atomic="true">
          {getMonthHeadline(month)}
        </h2>
        <table role="grid" class="grid">
          <thead>
            <tr>
              {#each weekdays as weekday (weekday.long)}
                <th scope="col">
                  <span class="hide-visually">{weekday.long}</span>
                  <span class="weekday" aria-hidden="true">{weekday.narrow}</span>
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each getViewOfMonth(month) as week (week[0])}
              <tr>
                {#each week as date (date)}
                  {#if monthOf(date) !== month}
                    <td></td>
                  {:else}
                    {@const selectionType = getSelectionType(date)}
                    {@const disabled = isDateDisabled(date)}
                    {@const description = modifiers?.[date]?.description}
                    {@const descriptionId = `calendar-${uid}-${date}`}
                    <td>
                      <button
                        class="day focus-visible"
                        class:selected={selectionType === 'selected'}
                        class:range-start={selectionType === 'range-start'}
                        class:range-middle={selectionType === 'range-middle'}
                        class:range-end={selectionType === 'range-end'}
                        class:first-day={date.endsWith('-01')}
                        class:last-day={date === lastDayOfMonth(date)}
                        type="button"
                        data-date={date}
                        tabindex={date === focusedDate ? 0 : -1}
                        aria-current={date === today ? 'date' : undefined}
                        aria-pressed={isDateActive(date) ? 'true' : undefined}
                        aria-disabled={disabled ? 'true' : undefined}
                        aria-describedby={description ? descriptionId : undefined}
                        onclick={(event) => handleDayClick(event, date)}
                        onmouseenter={() => {
                          if (!disabled) {
                            hoveredDate = date;
                          }
                        }}
                        onmouseleave={() => (hoveredDate = null)}
                        onkeydown={handleKeyDown}
                      >
                        {Number(date.slice(8))}
                      </button>
                      {#if description}
                        <span id={descriptionId} class="hide-visually">{description}</span>
                      {/if}
                    </td>
                  {/if}
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Inlined from circuit-ui's Calendar */
  .header {
    position: relative;
    width: 100%;
  }

  .prev,
  .next {
    position: absolute;
    top: 0;
    z-index: 1;
  }

  .prev {
    left: 0;
  }

  .next {
    right: 0;
  }

  /* Navigation buttons — inlined from the Button component, tertiary icon
     buttons in the small size */
  .nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--cui-spacings-bit) - var(--cui-border-width-kilo));
    color: var(--cui-fg-accent);
    cursor: pointer;
    background: none;
    border: var(--cui-border-width-kilo) solid transparent;
    border-radius: var(--cui-border-radius-byte);
    transition: color var(--cui-transitions-default);
  }

  .nav-button:hover {
    color: var(--cui-fg-accent-hovered);
  }

  .nav-button:active {
    color: var(--cui-fg-accent-pressed);
  }

  .nav-button:disabled {
    color: var(--cui-fg-normal-disabled);
    cursor: not-allowed;
  }

  .months {
    display: flex;
    isolation: isolate;
  }

  .month:not(:last-child) {
    margin-right: var(--cui-spacings-giga);
  }

  .month {
    --calendar-day-min-width: 48px;
    --calendar-day-max-width: 64px;
    --calendar-day-padding: var(--cui-spacings-bit);
  }

  @media (max-width: 360px) {
    .month {
      --calendar-day-min-width: 32px;
      --calendar-day-padding: 1px;
    }
  }

  /* Headline — inlined from the Headline component, in its smallest size */
  .headline {
    min-width: calc(var(--calendar-days-in-week, 7) * var(--calendar-day-min-width));
    max-width: calc(var(--calendar-days-in-week, 7) * var(--calendar-day-max-width));
    margin-top: var(--cui-spacings-bit);
    margin-bottom: var(--cui-spacings-mega);
    font-size: var(--cui-typography-headline-four-font-size);
    font-weight: var(--cui-font-weight-bold);
    line-height: var(--cui-typography-headline-four-line-height);
    color: var(--cui-fg-normal);
    text-align: center;
    letter-spacing: -0.03em;
  }

  .grid {
    width: 100%;
    min-width: calc(var(--calendar-days-in-week, 7) * var(--calendar-day-min-width));
    max-width: calc(var(--calendar-days-in-week, 7) * var(--calendar-day-max-width));
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .grid th,
  .grid td {
    position: relative;
    padding: var(--calendar-day-padding);
    vertical-align: middle;
    text-align: center;
  }

  .grid th {
    padding-bottom: calc(var(--calendar-day-padding) + var(--cui-spacings-byte));
  }

  .weekday {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    font-size: var(--cui-body-m-font-size);
    font-weight: var(--cui-font-weight-semibold);
    line-height: var(--cui-body-m-line-height);
  }

  .day {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    padding: 0;
    font-size: var(--cui-body-m-font-size);
    font-variant-numeric: tabular-nums;
    line-height: var(--cui-body-m-line-height);
    color: var(--cui-fg-normal);
    touch-action: manipulation;
    cursor: pointer;
    background: none;
    border: 1px solid transparent;
    border-radius: var(--cui-border-radius-circle);
  }

  .day[aria-current='date'] {
    border-color: var(--cui-border-normal);
  }

  .day:hover {
    background: var(--cui-bg-normal-hovered);
    border-color: var(--cui-border-strong-hovered);
  }

  .day:active {
    background: var(--cui-bg-normal-pressed);
    border-color: var(--cui-border-strong-pressed);
  }

  /* Selected */
  .selected,
  [aria-pressed='true'].range-start,
  [aria-pressed='true'].range-end {
    font-weight: var(--cui-font-weight-bold);
    color: var(--cui-fg-on-strong);
    background: var(--cui-bg-strong);
  }

  .selected:hover,
  [aria-pressed='true'].range-start:hover,
  [aria-pressed='true'].range-end:hover {
    background: var(--cui-bg-strong-hovered);
  }

  .selected:active,
  .range-start:active,
  .range-end:active {
    background: var(--cui-bg-strong-pressed);
  }

  .range-start::before,
  .range-middle::before,
  .range-end::before {
    position: absolute;
    top: var(--calendar-day-padding);
    z-index: -1;
    display: block;
    height: calc(100% - 2 * var(--calendar-day-padding));
    content: '';
    background: var(--cui-bg-accent);
  }

  .range-start::before {
    right: 0;
    width: calc(100% / 2);
  }

  .range-middle::before {
    right: 0;
    left: 0;
    width: 100%;
  }

  .range-end::before {
    left: 0;
    width: calc(100% / 2);
  }

  td:not(:last-of-type) .range-start.first-day::before,
  td:not(:last-of-type) .range-middle.first-day::before,
  td:not(:last-of-type) .range-end.first-day::before {
    background: linear-gradient(to left, var(--cui-bg-accent) 75%, transparent);
  }

  td:not(:last-of-type) .range-start.last-day::before,
  td:not(:last-of-type) .range-middle.last-day::before,
  td:not(:last-of-type) .range-end.last-day::before {
    background: linear-gradient(to right, var(--cui-bg-accent) 75%, transparent);
  }

  /* Disabled */
  .day[aria-disabled='true'] {
    color: var(--cui-fg-normal-disabled);
    cursor: not-allowed;
  }

  .day[aria-disabled='true']:hover,
  .day[aria-disabled='true']:active {
    background: var(--cui-bg-normal-disabled);
    border: none;
  }

  .day[aria-current='date'][aria-disabled='true'] {
    border-color: var(--cui-border-normal-disabled);
  }

  .day[aria-disabled='true'].selected,
  .day[aria-disabled='true'].range-start,
  .day[aria-disabled='true'].range-end {
    color: var(--cui-fg-on-strong-disabled);
    background: var(--cui-bg-strong-disabled);
  }

  .day[aria-disabled='true'].range-start::before,
  .day[aria-disabled='true'].range-middle::before,
  .day[aria-disabled='true'].range-end::before {
    background: var(--cui-bg-accent-disabled);
  }

  /* Description */
  .day[aria-describedby]::after {
    position: absolute;
    left: calc(50% - var(--calendar-day-padding) / 2);
    display: block;
    width: var(--cui-spacings-bit);
    height: var(--cui-spacings-bit);
    content: '';
    background-color: currentColor;
    border-radius: var(--cui-border-radius-circle);
  }

  .focus-visible:focus {
    outline: 0;
    box-shadow:
      0 0 0 2px var(--cui-bg-normal),
      0 0 0 4px var(--cui-border-focus);
  }

  .focus-visible:focus:not(:focus-visible) {
    box-shadow: none;
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
