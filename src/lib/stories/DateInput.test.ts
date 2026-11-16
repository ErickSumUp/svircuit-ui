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
