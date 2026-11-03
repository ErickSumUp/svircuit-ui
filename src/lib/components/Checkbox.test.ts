import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import Checkbox from './Checkbox.svelte';

const baseProps = { label: 'I agree to the terms' };

test('should match story case', async () => {
  const { container } = render(Checkbox, { ...baseProps, name: 'consent', value: 'terms' });

  expect(container).toMatchSnapshot();
});

test('should render a checkbox named by its label', async () => {
  render(Checkbox, { ...baseProps, optionalLabel: 'optional' });

  expect(
    screen.getByRole('checkbox', { name: 'I agree to the terms (optional)' })
  ).toBeInTheDocument();
});

test('should generate an id, or use a custom one', async () => {
  const { rerender } = render(Checkbox, baseProps);

  expect(screen.getByRole('checkbox').id).toMatch(/^checkbox-/);

  await rerender({ ...baseProps, id: 'terms' });

  expect(screen.getByLabelText('I agree to the terms')).toHaveAttribute('id', 'terms');
});

test('should check when the label is clicked', async () => {
  render(Checkbox, baseProps);

  await userEvent.click(screen.getByText('I agree to the terms'));

  expect(screen.getByRole('checkbox')).toBeChecked();
});

test('should always render both symbols, so they can animate', async () => {
  const { container } = render(Checkbox, { ...baseProps, disabled: true, checked: true });

  expect(container.querySelector('[data-symbol="checked"]')).toBeInTheDocument();
  expect(container.querySelector('[data-symbol="indeterminate"]')).toBeInTheDocument();
});

test('should be indeterminate', async () => {
  render(Checkbox, { ...baseProps, indeterminate: true });

  const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
  expect(checkbox.indeterminate).toBe(true);
  expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
});

describe('validation', () => {
  test('should describe the checkbox with the hint', async () => {
    render(Checkbox, { ...baseProps, validationHint: 'Required to continue' });

    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Required to continue');
  });

  test('should merge a custom aria-describedby with the hint', async () => {
    const { container } = render(Checkbox, {
      ...baseProps,
      validationHint: 'Required',
      'aria-describedby': 'extra'
    });
    const extra = document.createElement('span');
    extra.id = 'extra';
    extra.textContent = 'Extra';
    container.append(extra);

    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Extra Required');
  });

  test('should announce an invalid hint', async () => {
    render(Checkbox, { ...baseProps, invalid: true, validationHint: 'Please accept' });

    expect(screen.getByRole('checkbox')).toHaveClass('invalid');
    expect(screen.getByRole('status')).toHaveTextContent('Please accept');
  });

  test('should not announce the hint when disabled', async () => {
    render(Checkbox, { ...baseProps, disabled: true, invalid: true, validationHint: 'Error' });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.getByText('Error')).toHaveClass('validation-hint');
  });
});

test('should merge a custom class on the wrapper and keep attributes off the icons', async () => {
  const { container } = render(Checkbox, { ...baseProps, class: 'foo', name: 'consent' });

  expect(container.firstElementChild).toHaveClass('wrapper', 'foo');
  expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'consent');
  expect(container.querySelector('svg[name]')).toBeNull();
});
