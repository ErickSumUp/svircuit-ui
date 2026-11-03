import { createRawSnippet } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Input from './Input.svelte';

const baseProps = { label: 'First name' };

test('should match story case', async () => {
  const { container } = render(Input, {
    ...baseProps,
    id: 'first-name',
    placeholder: 'Jane',
    validationHint: 'Maximum 100 characters'
  });

  expect(container).toMatchSnapshot();
});

test('should render a textbox named by its label', async () => {
  render(Input, baseProps);

  const input = screen.getByRole('textbox', { name: 'First name' });
  expect(input).not.toHaveAttribute('aria-label');
  expect(input.id).toBeTruthy();
});

test('should use a custom id', async () => {
  render(Input, { ...baseProps, id: 'custom' });

  expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom');
});

test('should update the value and call oninput', async () => {
  const oninput = vi.fn();
  render(Input, { ...baseProps, value: 'Ja', oninput });

  await userEvent.type(screen.getByRole('textbox'), 'ne');

  expect(oninput).toHaveBeenCalledTimes(2);
  expect(screen.getByRole('textbox')).toHaveValue('Jane');
});

test('should show the optional label when not required', async () => {
  const { rerender } = render(Input, { ...baseProps, optionalLabel: 'optional' });

  expect(screen.getByRole('textbox', { name: 'First name (optional)' })).toBeInTheDocument();

  await rerender({ ...baseProps, optionalLabel: 'optional', required: true });
  expect(screen.getByRole('textbox', { name: 'First name' })).toBeRequired();
});

test('should hide the label visually', async () => {
  render(Input, { ...baseProps, hideLabel: true });

  expect(screen.getByText('First name')).toHaveClass('hide-visually');
});

test('should apply the size, text alignment and readonly', async () => {
  const { container } = render(Input, {
    ...baseProps,
    size: 's',
    textAlign: 'right',
    readonly: true
  });

  expect(container.firstElementChild).toHaveClass('s');
  const input = screen.getByRole('textbox');
  expect(input).toHaveClass('align-right');
  expect(input).toHaveAttribute('readonly');
});

test('should set the password manager attributes', async () => {
  render(Input, { ...baseProps, passwordManagerIgnore: true });

  const input = screen.getByRole('textbox');
  for (const attribute of [
    'data-1p-ignore',
    'data-bwignore',
    'data-lpignore',
    'data-op-ignore',
    'data-protonpass-ignore'
  ]) {
    expect(input).toHaveAttribute(attribute, 'true');
  }
});

test('should render the prefix and suffix with their class and the value', async () => {
  const prefix = createRawSnippet((props: () => { class: string; value: unknown }) => ({
    render: () => `<span data-testid="prefix" class="${props().class}">${props().value}</span>`
  }));
  const suffix = createRawSnippet((props: () => { class: string }) => ({
    render: () => `<span data-testid="suffix" class="${props().class}"></span>`
  }));
  render(Input, { ...baseProps, value: 'EUR', prefix, suffix });

  expect(screen.getByTestId('prefix')).toHaveClass('input-prefix');
  expect(screen.getByTestId('prefix')).toHaveTextContent('EUR');
  expect(screen.getByTestId('suffix')).toHaveClass('input-suffix');
  const input = screen.getByRole('textbox');
  expect(input).toHaveClass('has-prefix');
  expect(input).toHaveClass('has-suffix');
});

test('should be disabled and put class and style on the wrapper', async () => {
  const { container } = render(Input, {
    ...baseProps,
    disabled: true,
    class: 'custom',
    style: 'color: red'
  });

  expect(screen.getByRole('textbox')).toBeDisabled();
  const wrapper = container.querySelector('.custom');
  expect(wrapper).toHaveAttribute('data-disabled', 'true');
  expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' });
});

describe('validation hint', () => {
  test('should describe the input with the hint and a custom aria-describedby', async () => {
    render(Input, {
      ...baseProps,
      validationHint: 'Maximum 100 characters',
      'aria-describedby': 'external'
    });

    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-describedby')).toMatch(/^external \S+$/);
    expect(input).toHaveAccessibleDescription('Maximum 100 characters');
  });

  test('should not set aria-describedby or aria-invalid by default', async () => {
    render(Input, baseProps);

    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  test('should mark the input invalid and announce the hint', async () => {
    render(Input, { ...baseProps, validationHint: 'Required', invalid: true });

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    const hint = screen.getByText('Required');
    expect(hint).toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeInTheDocument();
  });

  test('should follow disabled > invalid > hasWarning > showValid', async () => {
    const { rerender } = render(Input, {
      ...baseProps,
      validationHint: 'Hint',
      hasWarning: true,
      showValid: true
    });

    expect(screen.getByText('Hint')).toHaveClass('warning');
    expect(screen.getByRole('textbox')).toHaveClass('warning');

    await rerender({ ...baseProps, validationHint: 'Hint', hasWarning: false, showValid: true });
    expect(screen.getByText('Hint')).toHaveClass('valid');

    await rerender({ ...baseProps, validationHint: 'Hint', invalid: true, disabled: true });
    const hint = screen.getByText('Hint');
    expect(hint).not.toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeNull();
  });
});
