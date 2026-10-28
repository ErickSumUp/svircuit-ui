import { render, screen, waitFor } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import Calendar from './Calendar.svelte';

const baseProps = { selection: '2020-03-15', locale: 'en-US' };

function getDayElement(day: number) {
  return screen.getByRole('button', { name: String(day) });
}

function getPrevButton() {
  return screen.getByRole('button', { name: /previous month/i });
}

function getNextButton() {
  return screen.getByRole('button', { name: /next month/i });
}

beforeEach(() => {
  // Only `Date` is faked, so that the focus scheduled with
  // `requestAnimationFrame` still runs.
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2020, 2, 12));
});

afterEach(() => {
  vi.useRealTimers();
});

test('should match story case variants', async () => {
  const { container } = render(Calendar, baseProps);

  expect(container).toMatchSnapshot();
});

test('should merge a custom class name with the default ones', async () => {
  render(Calendar, { ...baseProps, class: 'foo' });

  expect(screen.getAllByRole('group')[0]).toHaveClass('foo');
});

test('should show the current month and year', async () => {
  render(Calendar, baseProps);

  expect(screen.getByText('March 2020')).toBeInTheDocument();
});

test('should mark today as the current date', async () => {
  const { container } = render(Calendar, baseProps);

  const currentDates = container.querySelectorAll('[aria-current="date"]');
  expect(currentDates).toHaveLength(1);
  expect(currentDates[0]).toBe(getDayElement(12));
});

describe('navigation', () => {
  test('should navigate to the previous month', async () => {
    const onmonthschange = vi.fn();
    render(Calendar, { ...baseProps, onmonthschange });

    await userEvent.click(getPrevButton());

    expect(screen.getByText('February 2020')).toBeInTheDocument();
    expect(onmonthschange).toHaveBeenCalledTimes(2);
    expect(onmonthschange).toHaveBeenLastCalledWith(['2020-02']);
  });

  test('should navigate to the next month', async () => {
    const onmonthschange = vi.fn();
    render(Calendar, { ...baseProps, onmonthschange });

    await userEvent.click(getNextButton());

    expect(screen.getByText('April 2020')).toBeInTheDocument();
    expect(onmonthschange).toHaveBeenCalledTimes(2);
    expect(onmonthschange).toHaveBeenLastCalledWith(['2020-04']);
  });

  test('should tab to the focused date', async () => {
    render(Calendar, baseProps);

    await userEvent.tab();
    expect(document.activeElement).toBe(getPrevButton());
    await userEvent.tab();
    expect(document.activeElement).toBe(getNextButton());
    await userEvent.tab();
    expect(document.activeElement).toBe(getDayElement(15));
  });

  test('should navigate the date grid using the arrow keys', async () => {
    render(Calendar, baseProps);
    getDayElement(15).focus();

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(16)));
    await userEvent.keyboard('{ArrowUp}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(9)));
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(8)));
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(15)));
  });

  test('should navigate the date grid using the page keys', async () => {
    render(Calendar, baseProps);
    getDayElement(15).focus();

    await userEvent.keyboard('{PageUp}');
    await waitFor(() => expect(screen.getByText('February 2020')).toBeInTheDocument());
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(15)));
    await userEvent.keyboard('{Shift>}{PageUp}{/Shift}');
    await waitFor(() => expect(screen.getByText('February 2019')).toBeInTheDocument());
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(15)));
    await userEvent.keyboard('{PageDown}');
    await waitFor(() => expect(screen.getByText('March 2019')).toBeInTheDocument());
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(15)));
    await userEvent.keyboard('{Shift>}{PageDown}{/Shift}');
    await waitFor(() => expect(screen.getByText('March 2020')).toBeInTheDocument());
  });

  test('should navigate the date grid using the home and end keys', async () => {
    render(Calendar, baseProps);
    getDayElement(15).focus();

    await userEvent.keyboard('{Home}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(9)));
    await userEvent.keyboard('{End}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(15)));
  });

  test('should start the week on Sunday', async () => {
    render(Calendar, { ...baseProps, firstDayOfWeek: 7 });
    getDayElement(15).focus();

    await userEvent.keyboard('{Home}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(15)));
    await userEvent.keyboard('{End}');
    await waitFor(() => expect(document.activeElement).toBe(getDayElement(21)));
  });
});

describe('selection', () => {
  test('should mark the selected date', async () => {
    const { container } = render(Calendar, baseProps);

    const selectedDays = container.querySelectorAll('[aria-pressed="true"]');
    expect(selectedDays).toHaveLength(1);
    expect(selectedDays[0]).toBe(getDayElement(15));
  });

  test('should mark the selected date range', async () => {
    const { container } = render(Calendar, {
      ...baseProps,
      selection: { start: '2020-03-15', end: '2020-03-25' }
    });

    expect(container.querySelectorAll('[aria-pressed="true"]')).toHaveLength(11);
    for (let day = 15; day <= 25; day += 1) {
      expect(getDayElement(day)).toHaveAttribute('aria-pressed', 'true');
    }
  });

  test('should call the onselect callback when clicking a date', async () => {
    const onselect = vi.fn();
    render(Calendar, { ...baseProps, onselect });

    await userEvent.click(getDayElement(21));

    expect(onselect).toHaveBeenCalledTimes(1);
    expect(onselect).toHaveBeenCalledWith('2020-03-21');
  });

  test('should call the onselect callback when pressing a date', async () => {
    const onselect = vi.fn();
    render(Calendar, { ...baseProps, onselect });
    getDayElement(21).focus();

    await userEvent.keyboard('{Enter}');

    expect(onselect).toHaveBeenCalledTimes(1);
    expect(onselect).toHaveBeenCalledWith('2020-03-21');
  });
});

describe('disabled dates', () => {
  test('should disable the previous month button when the preceding month is before the minimum date', async () => {
    render(Calendar, { ...baseProps, minDate: '2020-03-05' });

    const prevButton = getPrevButton();
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(prevButton);
    expect(screen.getByText('March 2020')).toBeInTheDocument();
  });

  test('should disable the next month button when the following month is after the maximum date', async () => {
    render(Calendar, { ...baseProps, maxDate: '2020-03-25' });

    const nextButton = getNextButton();
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(nextButton);
    expect(screen.getByText('March 2020')).toBeInTheDocument();
  });

  test('should keep a month button focusable once it becomes disabled', async () => {
    render(Calendar, { ...baseProps, minDate: '2020-02-10' });

    const prevButton = getPrevButton();
    await userEvent.click(prevButton);

    expect(screen.getByText('February 2020')).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(prevButton).not.toBeDisabled();
    expect(document.activeElement).toBe(prevButton);
  });

  test('should disable the dates before the minimum date', async () => {
    const onselect = vi.fn();
    render(Calendar, { ...baseProps, minDate: '2020-03-10', onselect });

    expect(getDayElement(10)).not.toHaveAttribute('aria-disabled');
    expect(getDayElement(9)).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(getDayElement(9));
    expect(onselect).not.toHaveBeenCalled();
  });

  test('should disable the dates after the maximum date', async () => {
    const onselect = vi.fn();
    render(Calendar, { ...baseProps, maxDate: '2020-03-20', onselect });

    expect(getDayElement(20)).not.toHaveAttribute('aria-disabled');
    expect(getDayElement(21)).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(getDayElement(21));
    expect(onselect).not.toHaveBeenCalled();
  });

  test('should not let a click on a disabled date reach the listeners above it', async () => {
    const onclick = vi.fn();
    const { container } = render(Calendar, { ...baseProps, maxDate: '2020-03-20' });
    container.addEventListener('click', onclick);

    await userEvent.click(getDayElement(21));

    expect(onclick).not.toHaveBeenCalled();
  });

  test('should disable specific dates using modifiers', async () => {
    render(Calendar, { ...baseProps, modifiers: { '2020-03-21': { disabled: true } } });

    expect(getDayElement(21)).toHaveAttribute('aria-disabled', 'true');
  });
});

test('should add a description to specific dates using modifiers', async () => {
  render(Calendar, { ...baseProps, modifiers: { '2020-03-21': { description: 'Booked' } } });

  expect(getDayElement(21)).toHaveAccessibleDescription('Booked');
});
