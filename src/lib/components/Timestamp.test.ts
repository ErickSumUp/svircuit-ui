import { render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import Timestamp from './Timestamp.svelte';

const baseProps = {
  datetime: '2020-01-01T00:00+01:00[Europe/Berlin]',
  formattingLocale: 'en-US'
};

test('should merge a custom class name with the default one', async () => {
  render(Timestamp, { ...baseProps, class: 'foo' });

  expect(screen.getByRole('time')).toHaveClass('base', 'foo');
});

test('should have a valid `datetime` attribute', async () => {
  render(Timestamp, baseProps);

  expect(screen.getByRole('time')).toHaveAttribute('datetime', '2020-01-01T00:00+01:00');
});

test('should describe the full date time in the title', async () => {
  render(Timestamp, baseProps);

  expect(screen.getByRole('time')).toHaveAttribute('title', 'Jan 1, 2020, 12:00 AM GMT+1');
});

describe('absolute variant', () => {
  test.each([
    ['narrow', false, '1/1/20'],
    ['short', false, 'Jan 1, 2020'],
    ['long', false, 'January 1, 2020'],
    ['narrow', true, '1/1/20, 12:00 AM'],
    ['short', true, 'Jan 1, 2020, 12:00 AM'],
    ['long', true, 'January 1, 2020 at 12:00 AM']
  ] as const)(
    'should display a %s date (with time: %s)',
    async (formatStyle, includeTime, label) => {
      render(Timestamp, { ...baseProps, variant: 'absolute', formatStyle, includeTime });

      expect(screen.getByRole('time')).toHaveTextContent(label);
    }
  );

  test('should display the date in its own time zone', async () => {
    render(Timestamp, {
      ...baseProps,
      datetime: '2020-01-01T23:30-05:00[America/New_York]',
      variant: 'absolute'
    });

    expect(screen.getByRole('time')).toHaveTextContent('January 1, 2020');
  });
});

describe('relative variant', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2020-01-01T01:00+01:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test.each([
    ['narrow', '1h ago'],
    ['short', '1 hr. ago'],
    ['long', '1 hour ago']
  ] as const)('should display a %s relative time', async (formatStyle, label) => {
    render(Timestamp, { ...baseProps, variant: 'relative', formatStyle });

    expect(screen.getByRole('time')).toHaveTextContent(label);
  });

  test('should update the time after an interval', async () => {
    render(Timestamp, {
      ...baseProps,
      datetime: '2020-01-01T01:01+01:00[Europe/Berlin]',
      variant: 'relative',
      formatStyle: 'narrow'
    });

    const element = screen.getByRole('time');
    expect(element).toHaveTextContent('in 1m');

    vi.advanceTimersByTime(10 * 1000);
    await tick();

    expect(element).toHaveTextContent('in 50s');
  });

  test('should display an absolute value beyond a month with the auto variant', async () => {
    render(Timestamp, { ...baseProps, datetime: '2019-11-01T00:00+01:00[Europe/Berlin]' });

    expect(screen.getByRole('time')).toHaveTextContent('November 1, 2019');
  });

  test('should display a relative value within a month with the auto variant', async () => {
    render(Timestamp, { ...baseProps, datetime: '2019-12-25T01:00+01:00[Europe/Berlin]' });

    expect(screen.getByRole('time')).toHaveTextContent('1 week ago');
  });
});
