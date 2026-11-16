import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';

import DateInput from './DateInput.svelte';

beforeAll(() => {
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  });
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const baseProps = { label: 'Date of birth', locale: 'en-GB' };

function getSegments() {
  return screen.getAllByRole<HTMLInputElement>('spinbutton');
}

describe('segments', () => {
  test('should order the segments by locale', () => {
    render(DateInput, { ...baseProps, value: '2017-08-28' });

    expect(getSegments().map((segment) => segment.getAttribute('aria-label'))).toEqual([
      'Day',
      'Month',
      'Year'
    ]);
    expect(getSegments().map((segment) => segment.value)).toEqual(['28', '8', '2017']);
  });

  test('should call onchange with the typed date', async () => {
    const onchange = vi.fn();
    render(DateInput, { ...baseProps, onchange });

    await userEvent.type(getSegments()[0], '28082017');

    expect(onchange).toHaveBeenLastCalledWith('2017-08-28');
  });

  test('should show a date set from outside and keep editing it', async () => {
    const onchange = vi.fn();
    const { rerender } = render(DateInput, { ...baseProps, value: '2017-08-28', onchange });

    await rerender({ value: '2020-01-15', onchange });
    expect(getSegments().map((segment) => segment.value)).toEqual(['15', '1', '2020']);

    await userEvent.clear(getSegments()[0]);
    await userEvent.type(getSegments()[0], '20');
    expect(onchange).toHaveBeenLastCalledWith('2020-01-20');
  });

  test('should keep a partly typed date when the value is cleared', async () => {
    render(DateInput, baseProps);

    await userEvent.type(getSegments()[0], '28');

    expect(getSegments()[0]).toHaveValue('28');
  });
});

describe('autocomplete', () => {
  test('should autofill a birthday into the segments', () => {
    render(DateInput, { ...baseProps, autocomplete: 'bday' });

    expect(getSegments().map((segment) => segment.getAttribute('autocomplete'))).toEqual([
      'bday-day',
      'bday-month',
      'bday-year'
    ]);
  });

  test('should not set autocomplete by default', () => {
    render(DateInput, baseProps);

    for (const segment of getSegments()) {
      expect(segment).not.toHaveAttribute('autocomplete');
    }
  });
});
