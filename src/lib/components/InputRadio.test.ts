import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import InputRadio from './InputRadio.svelte';

const baseProps = { label: 'Apple', value: 'apple', name: 'fruit' };

test('should match story case', async () => {
  const { container } = render(InputRadio, {
    ...baseProps,
    id: 'apple',
    description: 'Keeps the doctor away'
  });

  expect(container).toMatchSnapshot();
});

test('should render a radio named by its label', async () => {
  render(InputRadio, baseProps);

  const radio = screen.getByRole('radio', { name: 'Apple' });
  expect(radio).toHaveAttribute('name', 'fruit');
  expect(radio).toHaveAttribute('value', 'apple');
});

test('should use a custom id', async () => {
  render(InputRadio, { ...baseProps, id: 'custom' });

  expect(screen.getByRole('radio')).toHaveAttribute('id', 'custom');
});

test('should describe the radio with its description and a custom aria-describedby', async () => {
  render(InputRadio, {
    ...baseProps,
    description: 'Keeps the doctor away',
    'aria-describedby': 'external'
  });

  const radio = screen.getByRole('radio', { name: 'Apple' });
  expect(radio).toHaveAccessibleDescription('Keeps the doctor away');
  expect(radio.getAttribute('aria-describedby')).toMatch(/^external \S+$/);
});

test('should not set aria-describedby without a description', async () => {
  render(InputRadio, baseProps);

  expect(screen.getByRole('radio')).not.toHaveAttribute('aria-describedby');
});

test('should be checked when `group` matches its value', async () => {
  render(InputRadio, { ...baseProps, group: 'apple' });

  expect(screen.getByRole('radio')).toBeChecked();
});

test('should call onchange when checked', async () => {
  const onchange = vi.fn();
  render(InputRadio, { ...baseProps, onchange });

  await userEvent.click(screen.getByText('Apple'));

  expect(onchange).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('radio')).toBeChecked();
});

test('should be disabled and put class and style on the wrapper', async () => {
  const { container } = render(InputRadio, {
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
