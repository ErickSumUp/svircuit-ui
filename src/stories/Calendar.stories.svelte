<script lang="ts" module>
  import Calendar from '$lib/components/Calendar.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Calendar',
    component: Calendar,
    parameters: {
      layout: 'centered'
    }
  });

  type Args = ComponentProps<typeof Calendar>;

  function pad(value: number) {
    return String(value).padStart(2, '0');
  }

  /** Today's date, shifted by a number of days or months, as an ISO date string. */
  function shift({ days = 0, months = 0 }: { days?: number; months?: number }) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    date.setDate(date.getDate() + days);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  const baseArgs = {
    locale: 'en-US',
    selection: shift({ days: 3 }),
    minDate: shift({ days: -7 }),
    maxDate: shift({ months: 3 })
  };
</script>

<script lang="ts">
  import Stack from '$lib/components/Stack.svelte';

  type DateRange = { start?: string; end?: string };

  let date: string | undefined = $state();
  let localizedDate: string | undefined = $state();
  let modifiedDate: string | undefined = $state();
  let range: DateRange | undefined = $state();

  /* Turns successive selections into a range: the first one starts it, the
     second one completes it, and the next one starts over. Selecting a date
     before the start moves the start instead. */
  function updateRange(previous: DateRange, selected: string): DateRange {
    if (!previous.start || previous.end || selected < previous.start) {
      return { start: selected, end: undefined };
    }
    return { start: previous.start, end: selected };
  }
</script>

<Story name="Base" args={baseArgs}>
  {#snippet template({ selection, ...args }: Args)}
    <Calendar
      {...args}
      selection={date ?? (selection as string)}
      onselect={(selected) => (date = selected)}
    />
  {/snippet}
</Story>

<Story name="Localized" args={{ ...baseArgs, locale: undefined }}>
  {#snippet template({ selection, ...args }: Args)}
    <Stack>
      {#each ['de-DE', 'bg-BG', 'pt-BR'] as locale (locale)}
        <Calendar
          {...args}
          {locale}
          selection={localizedDate ?? (selection as string)}
          onselect={(selected) => (localizedDate = selected)}
        />
      {/each}
    </Stack>
  {/snippet}
</Story>

<Story
  name="Modifiers"
  args={{
    ...baseArgs,
    modifiers: {
      [shift({ days: -10 })]: { description: 'Booked' },
      [shift({ days: -3 })]: { description: 'Booked' },
      [shift({ days: -2 })]: { disabled: true },
      [shift({ days: 2 })]: { description: 'Booked' },
      [shift({ days: 5 })]: { disabled: true }
    }
  }}
>
  {#snippet template({ selection, ...args }: Args)}
    <Calendar
      {...args}
      selection={modifiedDate ?? (selection as string)}
      onselect={(selected) => (modifiedDate = selected)}
    />
  {/snippet}
</Story>

<Story
  name="Range"
  args={{
    ...baseArgs,
    selection: { start: shift({ days: -3 }), end: shift({ days: 3 }) },
    numberOfMonths: 2
  }}
>
  {#snippet template({ selection, ...args }: Args)}
    <Calendar
      {...args}
      selection={range ?? (selection as DateRange)}
      onselect={(selected) => (range = updateRange(range ?? (selection as DateRange), selected))}
    />
  {/snippet}
</Story>
