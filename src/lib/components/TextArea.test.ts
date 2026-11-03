import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import TextArea from './TextArea.svelte';

const baseProps = { label: 'Describe your issue' };

test('should match story case', async () => {
  const { container } = render(TextArea, { ...baseProps, placeholder: 'Be detailed...' });

  expect(container).toMatchSnapshot();
});

test('should render a textarea named by its label', async () => {
  render(TextArea, baseProps);

  expect(screen.getByRole('textbox', { name: 'Describe your issue' }).tagName).toBe('TEXTAREA');
});

test('should use a custom id', async () => {
  render(TextArea, { ...baseProps, id: 'issue' });

  expect(screen.getByLabelText('Describe your issue')).toHaveAttribute('id', 'issue');
});

test('should accept typing', async () => {
  render(TextArea, baseProps);

  await userEvent.type(screen.getByRole('textbox'), 'Hello');

  expect(screen.getByRole('textbox')).toHaveValue('Hello');
});

describe('label', () => {
  test('should show the optional label when not required', async () => {
    const { rerender } = render(TextArea, { ...baseProps, optionalLabel: 'optional' });

    expect(screen.getByRole('textbox', { name: 'Describe your issue (optional)' })).toBeVisible();

    await rerender({ ...baseProps, optionalLabel: 'optional', required: true });

    expect(screen.getByRole('textbox', { name: 'Describe your issue' })).toBeRequired();
  });

  test('should hide the label visually', async () => {
    render(TextArea, { ...baseProps, hideLabel: true });

    expect(screen.getByText('Describe your issue')).toHaveClass('hide-visually');
  });
});

describe('validation', () => {
  test('should describe the textarea with the hint', async () => {
    render(TextArea, { ...baseProps, validationHint: 'Max. 200 characters' });

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Max. 200 characters');
  });

  test('should merge a custom aria-describedby with the hint', async () => {
    const { container } = render(TextArea, {
      ...baseProps,
      validationHint: 'Max. 200 characters',
      'aria-describedby': 'extra'
    });
    const extra = document.createElement('span');
    extra.id = 'extra';
    extra.textContent = 'Extra';
    container.append(extra);

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Extra Max. 200 characters');
  });

  test('should mark an invalid textarea and announce the hint', async () => {
    render(TextArea, { ...baseProps, invalid: true, validationHint: 'Please fill in this field.' });

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('status')).toHaveTextContent('Please fill in this field.');
  });

  test('should style a warning', async () => {
    render(TextArea, { ...baseProps, hasWarning: true, validationHint: 'Recommended' });

    expect(screen.getByRole('textbox')).toHaveClass('warning');
    expect(screen.getByRole('status').querySelector('.validation-hint')).toHaveClass('warning');
  });

  test('should drop the validity styles when disabled', async () => {
    render(TextArea, { ...baseProps, disabled: true, invalid: true, validationHint: 'Error' });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.getByText('Error')).toHaveClass('validation-hint');
  });
});

describe('rows', () => {
  test('should pass a number of rows', async () => {
    render(TextArea, { ...baseProps, rows: 5 });

    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  test('should auto-expand from the minimum rows', async () => {
    render(TextArea, { ...baseProps, rows: 'auto', minRows: 3 });

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('auto-expand');
    expect(textarea).toHaveAttribute('rows', '3');
    expect(textarea.style.getPropertyValue('--textarea-min-rows')).toBe('3');
  });
});

test('should merge a custom class on the wrapper and pass attributes to the textarea', async () => {
  const { container } = render(TextArea, {
    ...baseProps,
    class: 'foo',
    name: 'issue',
    passwordManagerIgnore: true
  });

  expect(container.firstElementChild).toHaveClass('wrapper', 'foo');
  expect(screen.getByRole('textbox')).toHaveAttribute('name', 'issue');
  expect(screen.getByRole('textbox')).toHaveAttribute('data-1p-ignore', 'true');
});
