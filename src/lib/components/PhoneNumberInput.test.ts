import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { describe, expect, test, vi } from 'vitest';

import PhoneNumberInput, {
  normalizePhoneNumber,
  parsePhoneNumber,
  type CountryCodeOption
} from './PhoneNumberInput.svelte';
import PhoneNumberInputExample from './PhoneNumberInputExample.test.svelte';

const options: CountryCodeOption[] = [
  { country: 'CA', code: '+1' },
  { country: 'US', code: '+1' },
  { country: 'DE', code: '+49' },
  { country: 'IT', code: '+39' },
  { country: 'AG', code: '+1', areaCodes: ['268'] }
];

const baseProps = {
  label: 'Phone number',
  locale: 'en-GB',
  countryCode: { label: 'Country code', options, defaultValue: 'CA' },
  subscriberNumber: { label: 'Subscriber number' }
};

const getCountryCode = () =>
  screen.getByRole<HTMLSelectElement>('combobox', { name: 'Country code' });
const getSubscriberNumber = () =>
  screen.getByRole<HTMLInputElement>('textbox', { name: 'Subscriber number' });
const getHiddenInput = (container: HTMLElement) =>
  container.querySelector<HTMLInputElement>('input[type="hidden"]');
const getShownCode = (container: HTMLElement) =>
  container.querySelector('.code')?.textContent?.trim();

describe('PhoneNumberInput', () => {
  test('should group the fields under the label', () => {
    render(PhoneNumberInput, baseProps);

    expect(screen.getByRole('group', { name: 'Phone number' })).toBeInTheDocument();
    expect(getCountryCode()).toHaveAttribute('autocomplete', 'tel-country-code');
    expect(getSubscriberNumber()).toHaveAttribute('autocomplete', 'tel-national');
    expect(getSubscriberNumber()).toHaveAttribute('inputmode', 'tel');
  });

  test('should list the countries by name with their codes', () => {
    render(PhoneNumberInput, baseProps);

    const labels = [...getCountryCode().options].map((option) => option.textContent);
    expect(labels).toEqual([
      'Antigua & Barbuda (+1)',
      'Canada (+1)',
      'Germany (+49)',
      'Italy (+39)',
      'United States (+1)'
    ]);
  });

  test('should show the code of the default country', () => {
    const { container } = render(PhoneNumberInput, baseProps);

    expect(getCountryCode()).toHaveValue('CA');
    expect(getShownCode(container)).toBe('+1');
  });

  test('should display an initial value', () => {
    const { container } = render(PhoneNumberInput, { ...baseProps, value: '+4912345678' });

    expect(getHiddenInput(container)).toHaveValue('+4912345678');
    expect(getCountryCode()).toHaveValue('DE');
    expect(getShownCode(container)).toBe('+49');
    expect(getSubscriberNumber()).toHaveValue('12345678');
  });

  test('should pass other attributes to the hidden input', () => {
    const { container } = render(PhoneNumberInput, { ...baseProps, name: 'phone' });

    expect(getHiddenInput(container)).toHaveAttribute('name', 'phone');
  });

  test('should report the phone number in the E.164 format', async () => {
    const onchange = vi.fn();
    render(PhoneNumberInputExample, { onchange });

    await userEvent.type(getSubscriberNumber(), '0202 555 0132');

    expect(document.querySelector('output')).toHaveTextContent('+1202 555 0132');
    expect(onchange).toHaveBeenLastCalledWith('+1202 555 0132');
  });

  test('should report the new country code', async () => {
    const onchange = vi.fn();
    const countryCodeChange = vi.fn();
    const { container } = render(PhoneNumberInput, {
      ...baseProps,
      onchange,
      countryCode: { ...baseProps.countryCode, onchange: countryCodeChange }
    });

    await userEvent.selectOptions(getCountryCode(), 'Germany (+49)');

    expect(getShownCode(container)).toBe('+49');
    expect(getHiddenInput(container)).toHaveValue('+49');
    expect(onchange).toHaveBeenCalledExactlyOnceWith('+49');
    expect(countryCodeChange).toHaveBeenCalledOnce();
  });

  test('should switch between countries with the same country code in a bound value', async () => {
    render(PhoneNumberInputExample);

    await userEvent.selectOptions(getCountryCode(), 'United States (+1)');
    expect(getCountryCode()).toHaveValue('US');

    await userEvent.selectOptions(getCountryCode(), 'Canada (+1)');
    expect(getCountryCode()).toHaveValue('CA');
  });

  test('should show a value set from outside', async () => {
    const { container } = render(PhoneNumberInputExample);

    await userEvent.type(getSubscriberNumber(), '5');
    await userEvent.click(screen.getByRole('button', { name: 'Set' }));

    expect(getCountryCode()).toHaveValue('DE');
    expect(getShownCode(container)).toBe('+49');
    expect(getSubscriberNumber()).toHaveValue('12345678');
  });

  test('should call the subscriber number oninput', async () => {
    const oninput = vi.fn();
    render(PhoneNumberInput, {
      ...baseProps,
      subscriberNumber: { ...baseProps.subscriberNumber, oninput }
    });

    await userEvent.type(getSubscriberNumber(), '1');

    expect(oninput).toHaveBeenCalledOnce();
  });

  test.each(['+4912345678', '004912345678'])(
    'should set the country code and subscriber number when pasting %s',
    async (phoneNumber) => {
      const onchange = vi.fn();
      const { container } = render(PhoneNumberInput, { ...baseProps, onchange });

      await userEvent.click(getSubscriberNumber());
      await userEvent.paste(phoneNumber);

      expect(getCountryCode()).toHaveValue('DE');
      expect(getSubscriberNumber()).toHaveValue('12345678');
      expect(getHiddenInput(container)).toHaveValue('+4912345678');
      expect(onchange).toHaveBeenCalledExactlyOnceWith('+4912345678');
    }
  );

  test('should only set the subscriber number when pasting a number without country code', async () => {
    const { container } = render(PhoneNumberInput, baseProps);

    await userEvent.click(getSubscriberNumber());
    await userEvent.paste('012345678');

    expect(getCountryCode()).toHaveValue('CA');
    expect(getHiddenInput(container)).toHaveValue('+112345678');
  });

  test('should render the prefix with the selected country', async () => {
    const prefix = createRawSnippet((props: () => { country: string | undefined }) => ({
      render: () => `<span data-testid="flag">${props().country}</span>`
    }));
    render(PhoneNumberInput, {
      ...baseProps,
      value: '+4912345678',
      countryCode: { ...baseProps.countryCode, prefix }
    });

    expect(screen.getByTestId('flag')).toHaveTextContent('DE');
    expect(getCountryCode()).toHaveClass('has-prefix');
  });

  describe('states', () => {
    test('should render as disabled', () => {
      render(PhoneNumberInput, { ...baseProps, disabled: true });

      expect(getCountryCode()).toBeDisabled();
      expect(getSubscriberNumber()).toBeDisabled();
    });

    test('should show the country code in a read-only input', () => {
      render(PhoneNumberInput, { ...baseProps, readonly: true, value: '+4912345678' });

      const countryCode = screen.getByRole('textbox', { name: 'Country code' });
      expect(countryCode).toHaveAttribute('readonly');
      expect(countryCode).toHaveValue('+49');
      expect(getSubscriberNumber()).toHaveAttribute('readonly');
    });

    test('should render as required', () => {
      render(PhoneNumberInput, { ...baseProps, required: true });

      expect(getCountryCode()).toBeRequired();
      expect(getSubscriberNumber()).toBeRequired();
    });

    test('should mark the fields as invalid', () => {
      render(PhoneNumberInput, { ...baseProps, invalid: true, validationHint: 'Not valid' });

      expect(getCountryCode()).toHaveAttribute('aria-invalid', 'true');
      expect(getSubscriberNumber()).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText('Not valid')).toHaveClass('invalid');
    });

    test('should mark only the subscriber number as invalid', () => {
      render(PhoneNumberInput, {
        ...baseProps,
        subscriberNumber: { ...baseProps.subscriberNumber, invalid: true }
      });

      expect(getCountryCode()).not.toHaveAttribute('aria-invalid');
      expect(getSubscriberNumber()).toHaveAttribute('aria-invalid', 'true');
    });

    test('should flag a subscriber number that is too long', async () => {
      render(PhoneNumberInput, baseProps);

      await userEvent.type(getSubscriberNumber(), '123 456789');
      expect(getSubscriberNumber()).toBeValid();

      await userEvent.type(getSubscriberNumber(), '1234567891011121314151617');
      expect(getSubscriberNumber()).toBeInvalid();
    });

    test('should describe both fields with the custom description and validation hint', () => {
      render(PhoneNumberInput, {
        ...baseProps,
        'aria-describedby': 'custom',
        validationHint: 'Maximum 15 digits'
      });
      const custom = document.createElement('span');
      custom.id = 'custom';
      custom.textContent = 'Custom description';
      document.body.append(custom);

      expect(getCountryCode()).toHaveAccessibleDescription('Custom description Maximum 15 digits');
      expect(getSubscriberNumber()).toHaveAccessibleDescription(
        'Custom description Maximum 15 digits'
      );
      custom.remove();
    });
  });
});

describe('parsePhoneNumber', () => {
  test('should split a number into the country and subscriber number', () => {
    expect(parsePhoneNumber('+49 123 45678', options)).toEqual({
      countryCode: 'DE',
      subscriberNumber: '123 45678'
    });
  });

  test('should treat a leading 00 as +', () => {
    expect(parsePhoneNumber('0049 12345678', options)).toEqual({
      countryCode: 'DE',
      subscriberNumber: '12345678'
    });
  });

  test('should prefer a matching area code', () => {
    expect(parsePhoneNumber('+1 268 1234567', options).countryCode).toBe('AG');
  });

  test('should keep the current country for a shared calling code', () => {
    expect(parsePhoneNumber('+1', options, 'US')).toEqual({ countryCode: 'US' });
  });

  test('should return only a subscriber number without a country code', () => {
    expect(parsePhoneNumber('0123 456', options)).toEqual({ subscriberNumber: '0123 456' });
    expect(parsePhoneNumber('+999 123', options)).toEqual({ subscriberNumber: '+999 123' });
    expect(parsePhoneNumber('', options)).toEqual({});
  });

  test('should not reorder the options', () => {
    const list = [...options];
    parsePhoneNumber('+49 1', list);
    expect(list).toEqual(options);
  });
});

describe('normalizePhoneNumber', () => {
  test('should strip trunk prefixes and stray characters', () => {
    expect(normalizePhoneNumber('+49', '0151-123 456', 'DE')).toBe('+49151 123 456');
  });

  test('should keep the leading zero of Italian numbers', () => {
    expect(normalizePhoneNumber('+39', '06 1234567', 'IT')).toBe('+3906 1234567');
  });
});
