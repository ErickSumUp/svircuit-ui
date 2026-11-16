import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import CurrencyInput from './CurrencyInput.svelte';
import CurrencyInputExample from './CurrencyInputExample.test.svelte';

const baseProps = { label: 'Amount', currency: 'EUR', formattingLocale: 'de-DE' };

function getInput() {
  return screen.getByRole<HTMLInputElement>('textbox');
}

test('should match the snapshot', () => {
  const { container } = render(CurrencyInput, {
    ...baseProps,
    id: 'amount',
    placeholder: 123.45,
    validationHint: 'Excluding VAT'
  });

  expect(container).toMatchSnapshot();
});

describe('formatting', () => {
  test('should format an en-GB amount', async () => {
    render(CurrencyInput, { ...baseProps, currency: 'GBP', formattingLocale: 'en-GB' });

    await userEvent.type(getInput(), '1234.56');

    expect(getInput()).toHaveValue('1,234.56');
  });

  test('should format a de-DE amount', async () => {
    render(CurrencyInput, baseProps);

    await userEvent.type(getInput(), '1234,56');

    expect(getInput()).toHaveValue('1.234,56');
  });

  test('should accept a dot as the decimal separator in de-DE', async () => {
    render(CurrencyInput, baseProps);

    await userEvent.type(getInput(), '1234.5');

    expect(getInput()).toHaveValue('1.234,5');
  });

  test('should keep only the first decimal separator', async () => {
    render(CurrencyInput, baseProps);
    const input = getInput();

    await userEvent.type(input, '1234,5,');
    expect(input).toHaveValue('1.234,5');

    input.setSelectionRange(1, 1);
    await userEvent.keyboard('.');
    expect(input).toHaveValue('1,23');
  });

  test('should cut off digits beyond the currency precision', async () => {
    render(CurrencyInput, baseProps);

    await userEvent.type(getInput(), '1,999');

    expect(getInput()).toHaveValue('1,99');
  });

  test('should drop the decimals of a currency without them', async () => {
    render(CurrencyInput, { ...baseProps, currency: 'JPY', formattingLocale: 'ja-JP' });

    await userEvent.type(getInput(), '1234.5');

    expect(getInput()).toHaveValue('12,345');
  });

  test('should ignore letters', async () => {
    render(CurrencyInput, baseProps);

    await userEvent.type(getInput(), '1a2b3');

    expect(getInput()).toHaveValue('123');
  });

  test('should toggle the minus sign', async () => {
    render(CurrencyInput, baseProps);

    await userEvent.type(getInput(), '-12');
    expect(getInput()).toHaveValue('-12');

    await userEvent.type(getInput(), '-');
    expect(getInput()).toHaveValue('12');
  });

  test('should not allow a minus sign when negatives are disallowed', async () => {
    render(CurrencyInput, { ...baseProps, allowNegative: false });

    await userEvent.type(getInput(), '-12');

    expect(getInput()).toHaveValue('12');
  });

  test('should delete the digit before a group separator', async () => {
    render(CurrencyInput, baseProps);
    const input = getInput();

    await userEvent.type(input, '1234');
    input.setSelectionRange(2, 2);
    await userEvent.keyboard('{Backspace}');

    expect(input).toHaveValue('234');
  });

  test('should drop leading zeros on blur', async () => {
    render(CurrencyInput, baseProps);

    await userEvent.type(getInput(), '007,5');
    await userEvent.tab();

    expect(getInput()).toHaveValue('7,5');
  });

  test('should format a number placeholder', () => {
    render(CurrencyInput, { ...baseProps, placeholder: 1234.5 });

    expect(getInput()).toHaveAttribute('placeholder', '1.234,50');
  });
});

describe('value', () => {
  test('should format an initial value', () => {
    render(CurrencyInput, { ...baseProps, value: 1234.5 });

    expect(getInput()).toHaveValue('1.234,5');
  });

  test('should report the typed amount as a number', async () => {
    render(CurrencyInputExample);

    await userEvent.type(getInput(), '1234,5');
    expect(document.querySelector('output')).toHaveTextContent('1234.5');

    await userEvent.clear(getInput());
    expect(document.querySelector('output')).toHaveTextContent('empty');
  });

  test('should report the amount cut off at the currency precision', async () => {
    render(CurrencyInputExample);

    await userEvent.type(getInput(), '1,999');

    expect(document.querySelector('output')).toHaveTextContent('1.99');
  });

  test('should keep a trailing decimal separator while typing', async () => {
    render(CurrencyInputExample);

    await userEvent.type(getInput(), '12,');

    expect(getInput()).toHaveValue('12,');
    expect(document.querySelector('output')).toHaveTextContent('12');
  });

  test('should show a value set from outside', async () => {
    render(CurrencyInputExample);

    await userEvent.type(getInput(), '5');
    await userEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(getInput()).toHaveValue('99,9');
  });

  test('should keep typing after a value set from outside', async () => {
    render(CurrencyInputExample);

    await userEvent.click(screen.getByRole('button', { name: 'Set' }));
    await userEvent.type(getInput(), '0');

    expect(getInput()).toHaveValue('99,90');
  });

  test('should call oninput', async () => {
    const oninput = vi.fn();
    render(CurrencyInput, { ...baseProps, oninput });

    await userEvent.type(getInput(), '12');

    expect(oninput).toHaveBeenCalledTimes(2);
  });
});

describe('currency symbol', () => {
  test('should place the symbol according to the locale', () => {
    const { container, unmount } = render(CurrencyInput, baseProps);
    expect(container.querySelector('.currency')).toHaveClass('suffix');
    expect(container.querySelector('.currency')).toHaveTextContent('€');
    unmount();

    const { container: british } = render(CurrencyInput, {
      ...baseProps,
      currency: 'GBP',
      formattingLocale: 'en-GB'
    });
    expect(british.querySelector('.currency')).toHaveClass('prefix');
    expect(british.querySelector('.currency')).toHaveTextContent('£');
  });

  test('should describe the input with the symbol', () => {
    render(CurrencyInput, baseProps);

    expect(getInput()).toHaveAccessibleDescription('€');
  });

  test('should merge a custom description and the validation hint', () => {
    render(CurrencyInput, {
      ...baseProps,
      'aria-describedby': 'custom',
      validationHint: 'Excluding VAT'
    });
    const custom = document.createElement('span');
    custom.id = 'custom';
    custom.textContent = 'Custom description';
    document.body.append(custom);

    expect(getInput()).toHaveAccessibleDescription('€ Custom description Excluding VAT');
    custom.remove();
  });
});

describe('field', () => {
  test('should be named by its label', () => {
    render(CurrencyInput, baseProps);

    expect(screen.getByRole('textbox', { name: 'Amount' })).toHaveAttribute('inputmode', 'decimal');
  });

  test('should mark the input as invalid', () => {
    render(CurrencyInput, { ...baseProps, invalid: true, validationHint: 'Too high' });

    expect(getInput()).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Too high')).toHaveClass('invalid');
  });
});
