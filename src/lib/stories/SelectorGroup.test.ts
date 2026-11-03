import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import SelectorGroup from './SelectorGroup.svelte';

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' }
];
const baseProps = { name: 'fruit', label: 'Choose your favourite fruit', options };

test('should match story case', async () => {
  const { container } = render(SelectorGroup, { ...baseProps, value: 'apple' });

  expect(container).toMatchSnapshot();
});

test('should render a horizontal radiogroup with one radio per option', async () => {
  render(SelectorGroup, baseProps);

  const group = screen.getByRole('radiogroup', { name: 'Choose your favourite fruit' });
  expect(group).toHaveAttribute('aria-orientation', 'horizontal');
  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(3);
  radios.forEach((radio) => expect(radio).toHaveAttribute('name', 'fruit'));
});

test('should generate a shared name', async () => {
  render(SelectorGroup, { ...baseProps, name: undefined });

  const [first, ...others] = screen.getAllByRole('radio');
  const name = first.getAttribute('name');
  expect(name).toBeTruthy();
  others.forEach((radio) => expect(radio).toHaveAttribute('name', name));
});

test('should render nothing without options', async () => {
  const { container } = render(SelectorGroup, { ...baseProps, options: [] });

  expect(container.querySelector('fieldset')).toBeNull();
});

test('should update `value` and call onchange', async () => {
  const onchange = vi.fn();
  render(SelectorGroup, { ...baseProps, value: 'apple', onchange });

  expect(screen.getByRole('radio', { name: 'Apple' })).toBeChecked();
  await userEvent.click(screen.getByText('Mango'));

  expect(onchange).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('radio', { name: 'Mango' })).toBeChecked();
  expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked();
});

describe('multiple', () => {
  test('should render a plain group of checkboxes', async () => {
    render(SelectorGroup, { ...baseProps, multiple: true });

    expect(screen.queryByRole('radiogroup')).toBeNull();
    expect(screen.getByRole('group', { name: 'Choose your favourite fruit' })).not.toHaveAttribute(
      'aria-orientation'
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  test('should check the options in `value` and toggle them', async () => {
    render(SelectorGroup, { ...baseProps, multiple: true, value: ['apple', 'mango'] });

    expect(screen.getByRole('checkbox', { name: 'Apple' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Banana' })).not.toBeChecked();
    await userEvent.click(screen.getByText('Banana'));
    await userEvent.click(screen.getByText('Apple'));

    expect(screen.getByRole('checkbox', { name: 'Banana' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Apple' })).not.toBeChecked();
  });
});

test('should show the optional label when not required', async () => {
  const { rerender } = render(SelectorGroup, { ...baseProps, optionalLabel: 'Optional' });

  expect(
    screen.getByRole('radiogroup', { name: 'Choose your favourite fruit (Optional)' })
  ).toBeVisible();

  await rerender({ ...baseProps, optionalLabel: 'Optional', required: true });

  expect(screen.getByRole('radiogroup', { name: 'Choose your favourite fruit' })).toBeVisible();
  screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeRequired());
});

test('should pass size and stretch', async () => {
  const { container } = render(SelectorGroup, { ...baseProps, size: 'flexible', stretch: true });

  expect(container.querySelector('.base')).toHaveClass('stretch');
  container.querySelectorAll('label').forEach((label) => expect(label).toHaveClass('flexible'));
});

test('should disable every option, or a single one', async () => {
  const { rerender } = render(SelectorGroup, { ...baseProps, disabled: true });

  screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());

  await rerender({
    ...baseProps,
    disabled: false,
    options: [options[0], options[1], { ...options[2], disabled: true }]
  });
  expect(screen.getByRole('radio', { name: 'Mango' })).toBeDisabled();
  expect(screen.getByRole('radio', { name: 'Apple' })).toBeEnabled();
});

describe('validation hint', () => {
  test('should describe the group with the hint and a custom aria-describedby', async () => {
    render(SelectorGroup, {
      ...baseProps,
      validationHint: 'Pick one',
      'aria-describedby': 'external'
    });

    const group = screen.getByRole('radiogroup');
    expect(group.getAttribute('aria-describedby')).toMatch(/^external \S+$/);
    expect(group).toHaveAccessibleDescription('Pick one');
  });

  test('should mark the options invalid and announce the hint', async () => {
    render(SelectorGroup, { ...baseProps, validationHint: 'Pick one', invalid: true });

    screen.getAllByRole('radio').forEach((radio) => expect(radio).toHaveClass('invalid'));
    const hint = screen.getByText('Pick one');
    expect(hint).toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeInTheDocument();
  });

  test('should not show the invalid hint when disabled', async () => {
    render(SelectorGroup, {
      ...baseProps,
      validationHint: 'Pick one',
      invalid: true,
      disabled: true
    });

    const hint = screen.getByText('Pick one');
    expect(hint).not.toHaveClass('invalid');
    expect(hint.closest('[role=status]')).toBeNull();
  });
});
