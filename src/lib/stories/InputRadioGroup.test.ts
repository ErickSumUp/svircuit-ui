import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import InputRadioGroup from './InputRadioGroup.svelte';

const options = [
  { label: 'Apple', value: 'apple', description: 'Keeps the doctor away' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' }
];
const baseProps = { name: 'fruit', label: 'Choose your favourite fruit', options };

test('should match story case', async () => {
  const { container } = render(InputRadioGroup, { ...baseProps, value: 'banana' });

  expect(container).toMatchSnapshot();
});

test('should render a radiogroup named by its legend, with one radio per option', async () => {
  render(InputRadioGroup, baseProps);

  expect(
    screen.getByRole('radiogroup', { name: 'Choose your favourite fruit' })
  ).toBeInTheDocument();
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(3);
  radios.forEach((radio) => expect(radio).toHaveAttribute('name', 'fruit'));
});

test('should generate a shared name', async () => {
  render(InputRadioGroup, { ...baseProps, name: undefined });

  const [first, ...others] = screen.getAllByRole('radio');
  const name = first.getAttribute('name');
  expect(name).toBeTruthy();
  others.forEach((radio) => expect(radio).toHaveAttribute('name', name));
});

test('should render nothing without options', async () => {
  const { container } = render(InputRadioGroup, { ...baseProps, options: [] });

  expect(container.querySelector('fieldset')).toBeNull();
});

test('should check the option matching `value`', async () => {
  render(InputRadioGroup, { ...baseProps, value: 'banana' });

  expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked();
});

test('should update `value` and call onchange', async () => {
  const onchange = vi.fn();
  render(InputRadioGroup, { ...baseProps, value: 'banana', onchange });

  await userEvent.click(screen.getByText('Mango'));

  expect(onchange).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('radio', { name: 'Mango' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Banana' })).not.toBeChecked();
});

test('should show the optional label when not required', async () => {
  const { rerender } = render(InputRadioGroup, { ...baseProps, optionalLabel: 'Optional' });

  expect(
    screen.getByRole('radiogroup', { name: 'Choose your favourite fruit (Optional)' })
  ).toBeVisible();

  await rerender({ ...baseProps, optionalLabel: 'Optional', required: true });

  expect(screen.getByRole('radiogroup', { name: 'Choose your favourite fruit' })).toHaveAttribute(
    'aria-required',
    'true'
  );
  screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeRequired());
});

test('should omit aria-invalid and aria-required when falsy', async () => {
  render(InputRadioGroup, baseProps);

  const group = screen.getByRole('radiogroup');
  expect(group).not.toHaveAttribute('aria-invalid');
  expect(group).not.toHaveAttribute('aria-required');
});

test('should hide the label visually', async () => {
  render(InputRadioGroup, { ...baseProps, hideLabel: true });

  expect(screen.getByText('Choose your favourite fruit')).toHaveClass('hide-visually');
});

test('should disable every option', async () => {
  render(InputRadioGroup, { ...baseProps, disabled: true });

  screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
});

test('should disable a single option', async () => {
  render(InputRadioGroup, {
    ...baseProps,
    options: [options[0], { ...options[1], disabled: true }, options[2]]
  });

  expect(screen.getByRole('radio', { name: 'Banana' })).toBeDisabled();
  expect(screen.getByRole('radio', { name: 'Apple' })).toBeEnabled();
});

describe('validation hint', () => {
  test('should describe the group with the hint and a custom aria-describedby', async () => {
    render(InputRadioGroup, {
      ...baseProps,
      validationHint: 'Pick one',
      'aria-describedby': 'external'
    });

    const group = screen.getByRole('radiogroup');
    expect(group.getAttribute('aria-describedby')).toMatch(/^external \S+$/);
    expect(group).toHaveAccessibleDescription('Pick one');
  });

  test('should mark the group invalid and announce the hint', async () => {
    render(InputRadioGroup, { ...baseProps, validationHint: 'Pick one', invalid: true });

    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-invalid', 'true');
    const hint = screen.getByText('Pick one');
    expect(hint).toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeInTheDocument();
  });

  test('should follow disabled > invalid > hasWarning > showValid', async () => {
    const { rerender } = render(InputRadioGroup, {
      ...baseProps,
      validationHint: 'Hint',
      hasWarning: true,
      showValid: true
    });

    expect(screen.getByText('Hint')).toHaveClass('warning');

    await rerender({ ...baseProps, validationHint: 'Hint', hasWarning: false, showValid: true });
    expect(screen.getByText('Hint')).toHaveClass('valid');

    await rerender({ ...baseProps, validationHint: 'Hint', invalid: true, disabled: true });
    const hint = screen.getByText('Hint');
    expect(hint).not.toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeNull();
  });
});
