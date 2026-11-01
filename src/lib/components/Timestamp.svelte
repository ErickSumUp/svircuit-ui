<script lang="ts" module>
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;

  /** Largest first. `interval` is how often a relative label is refreshed. */
  const UNITS: { name: Intl.RelativeTimeFormatUnit; duration: number; interval: number }[] = [
    { name: 'year', duration: 365 * DAY, interval: 5 * MINUTE },
    { name: 'month', duration: MONTH, interval: 5 * MINUTE },
    { name: 'week', duration: 7 * DAY, interval: 5 * MINUTE },
    { name: 'day', duration: DAY, interval: 5 * MINUTE },
    { name: 'hour', duration: HOUR, interval: MINUTE },
    { name: 'minute', duration: MINUTE, interval: 5 * SECOND },
    { name: 'second', duration: SECOND, interval: SECOND }
  ];

  const DATE_STYLES = { long: 'long', short: 'medium', narrow: 'short' } as const;

  /** Splits `2020-01-01T00:00+01:00[Europe/Berlin]` into the instant and the time zone. */
  function parse(datetime: string) {
    const [, instant, timeZone] = datetime.match(/^([^[]+)(?:\[(.+)\])?$/) ?? [];
    return { instant, timeZone, date: new Date(instant) };
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import type { HTMLTimeAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLTimeAttributes, 'datetime'> {
    /**
     * A datetime in the ISO-8601 format with an offset, optionally followed by
     * an IANA time zone identifier in brackets, e.g.
     * `2020-01-01T00:00+01:00[Europe/Berlin]`. Without a time zone, absolute
     * values are shown in the user's time zone.
     */
    datetime: string;
    /**
     * Whether to include the time when displaying the datetime as an absolute
     * value. Default: `false`.
     */
    includeTime?: boolean;
    /**
     * The verbosity of the displayed value. Longer formats are easier to read
     * for humans. Default: `long`.
     */
    formatStyle?: 'long' | 'short' | 'narrow';
    /**
     * Display the datetime as a relative or absolute value. `auto` displays a
     * relative value within a month of the datetime and an absolute value
     * otherwise. Default: `auto`.
     */
    variant?: 'auto' | 'relative' | 'absolute';
    /**
     * One or more IETF BCP 47 locale identifiers such as `'de-DE'` or
     * `['de-CH', 'en-US']`. Defaults to the user's locale.
     */
    formattingLocale?: string | string[];
  }

  let {
    datetime,
    includeTime = false,
    formatStyle = 'long',
    variant = 'auto',
    formattingLocale,
    class: className,
    ...rest
  }: Props = $props();

  const parsed = $derived(parse(datetime));

  /* Unset until mounted, so the server renders the absolute value and the
     relative one doesn't mismatch during hydration. */
  let now = $state<number>();

  const relative = $derived.by(() => {
    if (now === undefined || variant === 'absolute') return null;
    const difference = parsed.date.getTime() - now;
    if (variant === 'auto' && Math.abs(difference) > MONTH) return null;
    const unit = UNITS.find((u) => Math.abs(difference) >= u.duration) ?? UNITS[UNITS.length - 1];
    const value = Math.sign(difference) * Math.round(Math.abs(difference) / unit.duration);
    const format = new Intl.RelativeTimeFormat(formattingLocale, { style: formatStyle });
    return { label: format.format(value, unit.name), interval: unit.interval };
  });

  const absoluteLabel = $derived(
    new Intl.DateTimeFormat(formattingLocale, {
      dateStyle: DATE_STYLES[formatStyle],
      timeStyle: includeTime ? 'short' : undefined,
      timeZone: parsed.timeZone
    }).format(parsed.date)
  );

  const title = $derived(
    parsed.date.toLocaleString(formattingLocale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
      timeZone: parsed.timeZone
    })
  );

  onMount(() => {
    now = Date.now();
  });

  $effect(() => {
    if (!relative) return;
    const timer = setInterval(() => (now = Date.now()), relative.interval);
    return () => clearInterval(timer);
  });
</script>

<!--
  @component
  Displays a human readable date time, relative ("2 hours ago") or absolute
  ("January 1, 2020").
-->
<time {...rest} class={['base', className]} datetime={parsed.instant} {title}>
  {relative?.label ?? absoluteLabel}
</time>

<style>
  .base {
    font-variant-numeric: tabular-nums;
  }
</style>
