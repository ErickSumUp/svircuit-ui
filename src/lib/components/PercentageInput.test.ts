import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import PercentageInput from './PercentageInput.svelte';
import PercentageInputExample from './PercentageInputExample.test.svelte';

const baseProps = { label: 'Discount', formattingLocale: 'de-DE' };

function getInput() {
  return screen.getByRole<HTMLInputElement>('textbox');
}

test('should match the snapshot', () => {
  const { container } = render(PercentageInput, {
    ...baseProps,
    id: 'discount',
    validationHint: 'Applied to the total'
  });

  expect(container).toMatchSnapshot();
});

describe('formatting', () => {
  test('should format an en-GB number', async () => {
    render(PercentageInput, { ...baseProps, formattingLocale: 'en-GB' });

    await userEvent.type(getInput(), '1234');

    expect(getInput()).toHaveValue('1,234');
  });

  test('should format a de-DE number', async () => {
    render(PercentageInput, baseProps);

    await userEvent.type(getInput(), '1234');

    expect(getInput()).toHaveValue('1.234');
  });

  test('should format a number with decimals', async () => {
    render(PercentageInput, { ...baseProps, decimalScale: 2 });

    await userEvent.type(getInput(), '1234,56');

    expect(getInput()).toHaveValue('1.234,56');
  });

  test('should not allow decimals by default', async () => {
    render(PercentageInput, baseProps);

    await userEvent.type(getInput(), '12,5');

    expect(getInput()).toHaveValue('125');
  });

  test('should keep only the first decimal separator', async () => {
    render(PercentageInput, { ...baseProps, decimalScale: 2, fixedDecimalScale: true });
    const input = getInput();

    await userEvent.type(input, '12,5,');
    expect(input).toHaveValue('12,50');

    input.setSelectionRange(1, 1);
    await userEvent.keyboard('.');
    expect(input).toHaveValue('1,25');
  });

  test('should cut off decimals beyond the scale', async () => {
    render(PercentageInput, { ...baseProps, decimalScale: 1 });

    await userEvent.type(getInput(), '1.55');

    expect(getInput()).toHaveValue('1,5');
  });

  test('should pad the decimals with a fixed scale', async () => {
    render(PercentageInput, { ...baseProps, decimalScale: 2, fixedDecimalScale: true });

    await userEvent.type(getInput(), '12');

    expect(getInput()).toHaveValue('12,00');
  });

  test('should step over the decimal separator with a fixed scale', async () => {
    render(PercentageInput, { ...baseProps, decimalScale: 2, fixedDecimalScale: true });
    const input = getInput();

    await userEvent.type(input, '12');
    input.setSelectionRange(3, 3);
    await userEvent.keyboard('{Backspace}');

    expect(input).toHaveValue('12,00');
    expect(input.selectionStart).toBe(2);
  });

  test('should toggle the minus sign', async () => {
    render(PercentageInput, baseProps);

    await userEvent.type(getInput(), '-12');
    expect(getInput()).toHaveValue('-12');

    await userEvent.type(getInput(), '-');
    expect(getInput()).toHaveValue('12');
  });

  test('should not allow a minus sign when negatives are disallowed', async () => {
    render(PercentageInput, { ...baseProps, allowNegative: false });

    await userEvent.type(getInput(), '-12');

    expect(getInput()).toHaveValue('12');
  });

  test('should drop leading zeros on blur', async () => {
    render(PercentageInput, baseProps);

    await userEvent.type(getInput(), '007');
    await userEvent.tab();

    expect(getInput()).toHaveValue('7');
  });

  test('should show 0 as the default placeholder', () => {
    render(PercentageInput, baseProps);

    expect(getInput()).toHaveAttribute('placeholder', '0');
  });

  test('should format a number placeholder with the scale', () => {
    render(PercentageInput, { ...baseProps, placeholder: 12.5, decimalScale: 2 });

    expect(getInput()).toHaveAttribute('placeholder', '12,50');
  });
});

describe('value', () => {
  test('should format an initial value', () => {
    render(PercentageInput, { ...baseProps, value: 1234 });

    expect(getInput()).toHaveValue('1.234');
  });

  test('should report the typed number', async () => {
    render(PercentageInputExample);

    await userEvent.type(getInput(), '12,55');
    expect(document.querySelector('output')).toHaveTextContent('12.5');

    await userEvent.clear(getInput());
    expect(document.querySelector('output')).toHaveTextContent('empty');
  });

  test('should show a value set from outside', async () => {
    render(PercentageInputExample);

    await userEvent.type(getInput(), '5');
    await userEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(getInput()).toHaveValue('12,5');
  });

  test('should call oninput', async () => {
    const oninput = vi.fn();
    render(PercentageInput, { ...baseProps, oninput });

    await userEvent.type(getInput(), '12');

    expect(oninput).toHaveBeenCalledTimes(2);
  });
});

describe('field', () => {
  test('should be named by its label and described by the percent sign', () => {
    render(PercentageInput, baseProps);

    const input = screen.getByRole('textbox', { name: 'Discount' });
    expect(input).toHaveAttribute('inputmode', 'decimal');
    expect(input).toHaveAccessibleDescription('%');
  });

  test('should merge a custom description and the validation hint', () => {
    render(PercentageInput, {
      ...baseProps,
      'aria-describedby': 'custom',
      validationHint: 'Applied to the total'
    });
    const custom = document.createElement('span');
    custom.id = 'custom';
    custom.textContent = 'Custom description';
    document.body.append(custom);

    expect(getInput()).toHaveAccessibleDescription('% Custom description Applied to the total');
    custom.remove();
  });

  test('should mark the input as invalid', () => {
    render(PercentageInput, { ...baseProps, invalid: true, validationHint: 'Too high' });

    expect(getInput()).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Too high')).toHaveClass('invalid');
  });
});
