import { createRawSnippet } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import Selector from './Selector.svelte';

const baseProps = { label: 'Apple', value: 'apple', name: 'fruit' };

test('should match story case', async () => {
  const { container } = render(Selector, {
    ...baseProps,
    id: 'apple',
    description: 'Braeburn, Granny Smith, or Jonagold'
  });

  expect(container).toMatchSnapshot();
});

test('should render a radio named by its label', async () => {
  render(Selector, baseProps);

  const radio = screen.getByRole('radio', { name: 'Apple' });
  expect(radio).toHaveAttribute('name', 'fruit');
  expect(radio).toHaveAttribute('value', 'apple');
});

test('should render a checkbox when multiple', async () => {
  render(Selector, { ...baseProps, multiple: true, required: true });

  const checkbox = screen.getByRole('checkbox', { name: 'Apple' });
  expect(checkbox).not.toBeRequired();
});

test('should toggle a multiple selector without a bound group', async () => {
  render(Selector, { ...baseProps, multiple: true });

  await userEvent.click(screen.getByText('Apple'));
  expect(screen.getByRole('checkbox')).toBeChecked();
  await userEvent.click(screen.getByText('Apple'));
  expect(screen.getByRole('checkbox')).not.toBeChecked();
});

test('should be checked when `group` matches its value', async () => {
  const { rerender } = render(Selector, { ...baseProps, group: 'apple' });

  expect(screen.getByRole('radio')).toBeChecked();

  await rerender({ ...baseProps, multiple: true, group: ['mango', 'apple'] });
  expect(screen.getByRole('checkbox')).toBeChecked();
});

test('should describe the input with its description and a custom aria-describedby', async () => {
  render(Selector, {
    ...baseProps,
    description: 'Braeburn, Granny Smith, or Jonagold',
    'aria-describedby': 'external'
  });

  const radio = screen.getByRole('radio', { name: 'Apple' });
  expect(radio).toHaveAccessibleDescription('Braeburn, Granny Smith, or Jonagold');
  expect(radio.getAttribute('aria-describedby')).toMatch(/^external \S+$/);
  expect(screen.getByText('Apple')).toHaveClass('title');
});

test('should render the icon', async () => {
  const icon = createRawSnippet(() => ({ render: () => '<svg data-testid="icon"></svg>' }));
  render(Selector, { ...baseProps, icon });

  expect(screen.getByTestId('icon')).toBeInTheDocument();
});

test('should apply the size and invalid classes', async () => {
  const { container } = render(Selector, { ...baseProps, size: 's', invalid: true });

  expect(container.querySelector('label')).toHaveClass('s');
  expect(screen.getByRole('radio')).toHaveClass('invalid');
});

test('should call onchange when checked', async () => {
  const onchange = vi.fn();
  render(Selector, { ...baseProps, onchange });

  await userEvent.click(screen.getByText('Apple'));

  expect(onchange).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('radio')).toBeChecked();
});

test('should be disabled and put class and style on the wrapper', async () => {
  const { container } = render(Selector, {
    ...baseProps,
    disabled: true,
    class: 'custom',
    style: 'color: red'
  });

  expect(screen.getByRole('radio')).toBeDisabled();
  const wrapper = container.querySelector('.custom');
  expect(wrapper).toHaveAttribute('data-disabled', 'true');
  expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' });
});
