import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import CheckboxGroup from './CheckboxGroup.svelte';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' }
];
const baseProps = { name: 'fruits', label: 'Choose your favourite fruit', options };

test('should match story case', async () => {
  const { container } = render(CheckboxGroup, { ...baseProps, value: ['mango'] });

  expect(container).toMatchSnapshot();
});

test('should render a fieldset named by its legend, with one checkbox per option', async () => {
  render(CheckboxGroup, baseProps);

  expect(screen.getByRole('group', { name: 'Choose your favourite fruit' })).toBeInTheDocument();
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(3);
  checkboxes.forEach((checkbox) => expect(checkbox).toHaveAttribute('name', 'fruits'));
});

test('should render nothing without options', async () => {
  const { container } = render(CheckboxGroup, { ...baseProps, options: [] });

  expect(container.querySelector('fieldset')).toBeNull();
});

test('should check the options in `value`', async () => {
  render(CheckboxGroup, { ...baseProps, value: ['banana'] });

  expect(screen.getByRole('checkbox', { name: 'Banana' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Apple' })).not.toBeChecked();
});

test('should update `value` and call onchange', async () => {
  const onchange = vi.fn();
  render(CheckboxGroup, { ...baseProps, value: ['mango'], onchange });

  await userEvent.click(screen.getByRole('checkbox', { name: 'Apple' }));
  await userEvent.click(screen.getByRole('checkbox', { name: 'Mango' }));

  expect(onchange).toHaveBeenCalledTimes(2);
  expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: 'Mango' })).not.toBeChecked();
});

test('should show the optional label when not required', async () => {
  const { rerender } = render(CheckboxGroup, { ...baseProps, optionalLabel: 'Optional' });

  expect(
    screen.getByRole('group', { name: 'Choose your favourite fruit (Optional)' })
  ).toBeVisible();

  await rerender({ ...baseProps, optionalLabel: 'Optional', required: true });

  expect(screen.getByRole('group', { name: 'Choose your favourite fruit' })).toBeVisible();
});

test('should disable all options, or a single one', async () => {
  const { rerender } = render(CheckboxGroup, { ...baseProps, disabled: true });

  screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).toBeDisabled());

  await rerender({
    ...baseProps,
    disabled: false,
    options: [...options.slice(0, 2), { label: 'Mango', value: 'mango', disabled: true }]
  });

  expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeEnabled();
  expect(screen.getByRole('checkbox', { name: 'Mango' })).toBeDisabled();
});

describe('validation', () => {
  test('should describe the fieldset with the hint', async () => {
    render(CheckboxGroup, { ...baseProps, validationHint: 'Pick at least one' });

    expect(screen.getByRole('group')).toHaveAccessibleDescription('Pick at least one');
  });

  test('should mark every checkbox invalid and announce the hint', async () => {
    render(CheckboxGroup, { ...baseProps, invalid: true, validationHint: 'Please choose' });

    screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).toHaveClass('invalid'));
    expect(screen.getByText('Please choose').closest('[role="status"]')).toBeInTheDocument();
  });

  test.each([
    ['hasWarning', 'warning'],
    ['showValid', 'valid']
  ])('should style the hint with %s', async (prop, className) => {
    const { container } = render(CheckboxGroup, {
      ...baseProps,
      [prop]: true,
      validationHint: 'Hint'
    });

    expect(container.querySelector('[role="status"] .validation-hint')).toHaveClass(className);
  });
});

test('should merge a custom class and pass attributes to the fieldset', async () => {
  render(CheckboxGroup, { ...baseProps, class: 'foo', id: 'bar' });

  expect(screen.getByRole('group')).toHaveClass('fieldset', 'foo');
  expect(screen.getByRole('group')).toHaveAttribute('id', 'bar');
});
