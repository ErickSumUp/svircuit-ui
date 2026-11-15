import { fireEvent, render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import ColorInput, { isSameColor, isValidColor, normalizeColor } from './ColorInput.svelte';

const baseProps = { label: 'Color', value: '#99ffbb' };

function getPicker() {
  return screen.getByLabelText('Color', { selector: 'input[type="color"]' }) as HTMLInputElement;
}

function getText() {
  return screen.getByRole('textbox', { name: 'Color' }) as HTMLInputElement;
}

test('should match story case', async () => {
  const { container } = render(ColorInput, baseProps);

  expect(container).toMatchSnapshot();
});

test('should name both inputs by the legend', async () => {
  render(ColorInput, baseProps);

  expect(screen.getByRole('group', { name: 'Color' })).toBeVisible();
  expect(getPicker()).toBeVisible();
  expect(getText()).toBeVisible();
});

test('should put class and style on the fieldset', async () => {
  render(ColorInput, { ...baseProps, class: 'custom', style: 'color: red' });

  const fieldset = screen.getByRole('group');
  expect(fieldset).toHaveClass('custom');
  expect(fieldset).toHaveStyle({ color: 'rgb(255, 0, 0)' });
});

describe('semantics', () => {
  test('should merge a custom aria-describedby with the hint', async () => {
    render(ColorInput, {
      ...baseProps,
      'aria-describedby': 'custom',
      validationHint: 'Pick a color'
    });

    const describedBy = getText().getAttribute('aria-describedby');
    expect(describedBy).toMatch(/^custom color-input-.+-hint$/);
    expect(getPicker()).toHaveAttribute('aria-describedby', describedBy);
    expect(getText()).toHaveAccessibleDescription('Pick a color');
  });

  test('should render as disabled', async () => {
    render(ColorInput, { ...baseProps, disabled: true });

    expect(screen.getByRole('group')).toBeDisabled();
    expect(getPicker()).toBeDisabled();
    expect(getText()).toBeDisabled();
  });

  test('should render as readonly with a disabled picker', async () => {
    render(ColorInput, { ...baseProps, readonly: true });

    expect(getText()).toHaveAttribute('readonly');
    expect(getPicker()).toBeDisabled();
  });

  test('should render as required', async () => {
    render(ColorInput, { ...baseProps, required: true });

    expect(getPicker()).toHaveAttribute('required');
    expect(getText()).toBeRequired();
  });

  test('should mark both inputs as invalid', async () => {
    render(ColorInput, { ...baseProps, invalid: true, validationHint: 'Please enter a color' });

    expect(getPicker()).toHaveAttribute('aria-invalid', 'true');
    expect(getText()).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Please enter a color');
  });

  test('should show the optional label when not required', async () => {
    const { rerender } = render(ColorInput, { ...baseProps, optionalLabel: 'optional' });

    expect(screen.getByRole('group', { name: 'Color (optional)' })).toBeVisible();

    await rerender({ required: true });

    expect(screen.getByRole('group', { name: 'Color' })).toBeVisible();
  });
});

describe('state', () => {
  test('should display the value on both inputs', async () => {
    render(ColorInput, baseProps);

    expect(getPicker()).toHaveValue('#99ffbb');
    expect(getText()).toHaveValue('99ffbb');
  });

  test('should normalize a shorthand value for the picker', async () => {
    render(ColorInput, { ...baseProps, value: '#ABC' });

    expect(getPicker()).toHaveValue('#aabbcc');
    expect(getText()).toHaveValue('ABC');
  });

  test('should strip the # from the placeholder', async () => {
    render(ColorInput, { ...baseProps, value: '', placeholder: '#000000' });

    expect(getText()).toHaveAttribute('placeholder', '000000');
  });

  test('should update the text when the value changes', async () => {
    const { rerender } = render(ColorInput, baseProps);

    await rerender({ value: '#123456' });

    expect(getText()).toHaveValue('123456');
    expect(getPicker()).toHaveValue('#123456');
  });
});

describe('user interactions', () => {
  test('should update the text when the picker changes', async () => {
    const oninput = vi.fn();
    render(ColorInput, { ...baseProps, oninput });

    await fireEvent.input(getPicker(), { target: { value: '#00ff00' } });

    expect(getText()).toHaveValue('00ff00');
    expect(oninput).toHaveBeenCalledOnce();
  });

  test('should update the picker once the typed color is valid', async () => {
    const onchange = vi.fn();
    render(ColorInput, { ...baseProps, onchange });

    await userEvent.clear(getText());
    await userEvent.type(getText(), '00f');

    expect(getPicker()).toHaveValue('#0000ff');
    expect(onchange).toHaveBeenCalledOnce();

    await userEvent.type(getText(), '0');

    expect(getText()).toHaveValue('00f0');
    expect(getPicker()).toHaveValue('#0000ff');
  });

  test('should handle pasting a color with #', async () => {
    render(ColorInput, { ...baseProps, value: '' });

    await userEvent.click(getText());
    await userEvent.paste('#ff00ff');

    expect(getText()).toHaveValue('ff00ff');
    expect(getPicker()).toHaveValue('#ff00ff');
  });

  test('should handle pasting a color without #', async () => {
    render(ColorInput, { ...baseProps, value: '' });

    await userEvent.click(getText());
    await userEvent.paste('ff00ff');

    expect(getText()).toHaveValue('ff00ff');
    expect(getPicker()).toHaveValue('#ff00ff');
  });

  test('should ignore an invalid paste', async () => {
    render(ColorInput, baseProps);

    await userEvent.click(getText());
    await userEvent.paste('#zz');

    expect(getPicker()).toHaveValue('#99ffbb');
  });
});

describe('color helpers', () => {
  test('should validate hex colors', () => {
    expect(isValidColor('#abc')).toBe(true);
    expect(isValidColor('AABBCC')).toBe(true);
    expect(isValidColor('#abcd')).toBe(false);
    expect(isValidColor('#aabbccdd')).toBe(false);
  });

  test('should normalize and compare colors', () => {
    expect(normalizeColor(' ABC ')).toBe('#aabbcc');
    expect(isSameColor('abc', '#AABBCC')).toBe(true);
    expect(isSameColor('abc', '#aabbcd')).toBe(false);
  });
});
