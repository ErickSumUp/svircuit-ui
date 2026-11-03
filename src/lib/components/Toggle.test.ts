import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import Toggle from './Toggle.svelte';

const baseProps = { label: 'Short label' };

test('should match story case', async () => {
  const { container } = render(Toggle, { ...baseProps, description: 'More detail' });

  expect(container).toMatchSnapshot();
});

test('should render a switch named by its label', async () => {
  render(Toggle, baseProps);

  const toggle = screen.getByRole('switch', { name: 'Short label' });
  expect(toggle).toHaveAttribute('type', 'checkbox');
  expect(toggle).not.toBeChecked();
});

test('should toggle and call the change handler', async () => {
  const onchange = vi.fn();
  render(Toggle, { ...baseProps, onchange });

  await userEvent.click(screen.getByText('Short label'));

  expect(screen.getByRole('switch')).toBeChecked();
  expect(onchange).toHaveBeenCalledOnce();
});

test('should describe the switch with the description', async () => {
  render(Toggle, { ...baseProps, description: 'More detail' });

  expect(screen.getByRole('switch')).toHaveAccessibleDescription('More detail');
});

test('should merge a custom aria-describedby with the description', async () => {
  const { container } = render(Toggle, {
    ...baseProps,
    description: 'More detail',
    'aria-describedby': 'hint'
  });
  const hint = document.createElement('span');
  hint.id = 'hint';
  hint.textContent = 'Custom hint';
  container.append(hint);

  expect(screen.getByRole('switch')).toHaveAccessibleDescription('Custom hint More detail');
});

test('should be disabled', async () => {
  const { container } = render(Toggle, { ...baseProps, disabled: true, checked: true });

  expect(screen.getByRole('switch')).toBeDisabled();
  expect(screen.getByRole('switch')).toBeChecked();
  expect(container.firstElementChild).toHaveAttribute('data-disabled', 'true');
});

test('should merge a custom class on the wrapper and pass attributes to the input', async () => {
  const { container } = render(Toggle, { ...baseProps, class: 'foo', name: 'notifications' });

  expect(container.firstElementChild).toHaveClass('wrapper', 'foo');
  expect(screen.getByRole('switch')).toHaveAttribute('name', 'notifications');
});
