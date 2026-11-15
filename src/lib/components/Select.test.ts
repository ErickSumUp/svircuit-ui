import { createRawSnippet } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Select from './Select.svelte';

const options = [
  { label: 'United States', value: 'US' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR', disabled: true }
];
const baseProps = { label: 'Countries', options };

test('should match story case', async () => {
  const { container } = render(Select, {
    ...baseProps,
    id: 'countries',
    placeholder: 'Select an option'
  });

  expect(container).toMatchSnapshot();
});

test('should render a combobox named by its label', async () => {
  render(Select, baseProps);

  const select = screen.getByRole('combobox', { name: 'Countries' });
  expect(select).not.toHaveAttribute('aria-label');
  expect(select).not.toHaveAttribute('name');
  expect(select.id).toBeTruthy();
});

test('should give two selects different ids', async () => {
  render(Select, baseProps);
  render(Select, { ...baseProps, label: 'Other' });

  const [first, second] = screen.getAllByRole('combobox');
  expect(first.id).not.toBe(second.id);
});

test('should render the options', async () => {
  render(Select, baseProps);

  expect(screen.getByRole('option', { name: 'Germany' })).toHaveValue('DE');
  expect(screen.getByRole('option', { name: 'France' })).toBeDisabled();
});

test('should render option children instead of options', async () => {
  const children = createRawSnippet(() => ({ render: () => '<option value="10">10</option>' }));
  render(Select, { label: 'Page size', children });

  expect(screen.getByRole('option', { name: '10' })).toBeInTheDocument();
});

test('should show the placeholder while nothing is selected', async () => {
  render(Select, { ...baseProps, placeholder: 'Select an option' });

  expect(screen.getByRole('option', { name: 'Select an option' })).toHaveValue('');
  expect(screen.getByRole('combobox')).toHaveValue('');
});

test('should keep the placeholder of an optional select, so it can be cleared', async () => {
  render(Select, { ...baseProps, placeholder: 'Select an option', value: 'DE' });

  const select = screen.getByRole('combobox');
  expect(select).toHaveValue('DE');
  await userEvent.selectOptions(select, 'Select an option');
  expect(select).toHaveValue('');
});

test('should remove the placeholder of a required select once a value is selected', async () => {
  const onchange = vi.fn();
  render(Select, { ...baseProps, placeholder: 'Select an option', required: true, onchange });

  expect(screen.getByRole('option', { name: 'Select an option' })).toBeInTheDocument();
  await userEvent.selectOptions(screen.getByRole('combobox'), 'DE');

  expect(onchange).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('combobox')).toHaveValue('DE');
  expect(screen.queryByRole('option', { name: 'Select an option' })).toBeNull();
});

test('should show the optional label when not required', async () => {
  const { rerender } = render(Select, { ...baseProps, optionalLabel: 'optional' });

  expect(screen.getByRole('combobox', { name: 'Countries (optional)' })).toBeInTheDocument();

  await rerender({ ...baseProps, optionalLabel: 'optional', required: true });
  expect(screen.getByRole('combobox', { name: 'Countries' })).toBeRequired();
});

test('should hide the label visually', async () => {
  render(Select, { ...baseProps, hideLabel: true });

  expect(screen.getByText('Countries')).toHaveClass('hide-visually');
});

test('should render the prefix with its class and the value', async () => {
  const prefix = createRawSnippet(
    (props: () => { class: string; value: string | number | undefined }) => ({
      render: () => `<span data-testid="prefix" class="${props().class}">${props().value}</span>`
    })
  );
  render(Select, { ...baseProps, value: 'DE', prefix });

  expect(screen.getByTestId('prefix')).toHaveClass('select-prefix');
  expect(screen.getByTestId('prefix')).toHaveTextContent('DE');
  expect(screen.getByRole('combobox')).toHaveClass('has-prefix');
});

test('should apply the size and put class and style on the wrapper', async () => {
  const { container } = render(Select, {
    ...baseProps,
    size: 's',
    disabled: true,
    class: 'custom',
    style: 'color: red'
  });

  const wrapper = container.querySelector('.custom');
  expect(wrapper).toHaveClass('s');
  expect(wrapper).toHaveAttribute('data-disabled', 'true');
  expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  expect(screen.getByRole('combobox')).toBeDisabled();
});

describe('validation hint', () => {
  test('should describe the select with the hint and a custom aria-describedby', async () => {
    render(Select, {
      ...baseProps,
      validationHint: 'Where you live',
      'aria-describedby': 'external'
    });

    const select = screen.getByRole('combobox');
    expect(select.getAttribute('aria-describedby')).toMatch(/^external \S+$/);
    expect(select).toHaveAccessibleDescription('Where you live');
    expect(select).not.toHaveAttribute('aria-invalid');
  });

  test('should mark the select invalid and announce the hint', async () => {
    render(Select, { ...baseProps, validationHint: 'Required', invalid: true });

    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    const hint = screen.getByText('Required');
    expect(hint).toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeInTheDocument();
  });

  test('should not show the invalid hint when disabled', async () => {
    render(Select, { ...baseProps, validationHint: 'Required', invalid: true, disabled: true });

    const hint = screen.getByText('Required');
    expect(hint).not.toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeNull();
  });
});
