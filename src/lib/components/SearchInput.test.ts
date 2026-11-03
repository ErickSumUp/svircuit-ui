import { render, screen } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import SearchInput from './SearchInput.svelte';

const baseProps = { label: 'Search' };

test('should match story case', async () => {
  const { container } = render(SearchInput, {
    ...baseProps,
    id: 'search',
    value: 'Apple',
    onClear: () => {}
  });

  expect(container).toMatchSnapshot();
});

test('should render a searchbox named by its label', async () => {
  render(SearchInput, baseProps);

  const input = screen.getByRole('searchbox', { name: 'Search' });
  expect(input).toHaveAttribute('type', 'search');
  expect(input).toHaveClass('has-prefix');
});

test('should not render the clear button without a value or onClear', async () => {
  const { rerender } = render(SearchInput, { ...baseProps, onClear: () => {} });

  expect(screen.queryByRole('button')).toBeNull();

  await rerender({ ...baseProps, value: 'Apple', onClear: undefined });
  expect(screen.queryByRole('button')).toBeNull();
});

test('should hide the clear button when disabled or read only', async () => {
  const { rerender } = render(SearchInput, {
    ...baseProps,
    value: 'Apple',
    onClear: () => {},
    disabled: true
  });

  expect(screen.queryByRole('button')).toBeNull();

  await rerender({ ...baseProps, value: 'Apple', onClear: () => {}, readonly: true });
  expect(screen.queryByRole('button')).toBeNull();
});

test('should render a named clear button that does not submit forms', async () => {
  render(SearchInput, { ...baseProps, value: 'Apple', onClear: () => {}, clearLabel: 'Löschen' });

  const button = screen.getByRole('button', { name: 'Löschen' });
  expect(button).toHaveAttribute('type', 'button');
  expect(screen.getByRole('searchbox')).toHaveClass('has-suffix');
});

test('should default the clear label to "Clear"', async () => {
  render(SearchInput, { ...baseProps, value: 'Apple', onClear: () => {} });

  expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
});

test('should call onClear, keep the value and focus the input', async () => {
  const onClear = vi.fn();
  render(SearchInput, { ...baseProps, value: 'Apple', onClear });

  await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

  expect(onClear).toHaveBeenCalledTimes(1);
  const input = screen.getByRole('searchbox');
  expect(input).toHaveValue('Apple');
  expect(input).toHaveFocus();
});

test('should pass the Input props through', async () => {
  const { container } = render(SearchInput, {
    ...baseProps,
    size: 's',
    validationHint: 'Search by name',
    invalid: true,
    'aria-describedby': 'external'
  });

  expect(container.firstElementChild).toHaveClass('s');
  const input = screen.getByRole('searchbox');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input.getAttribute('aria-describedby')).toMatch(/^external \S+$/);
  expect(screen.getByText('Search by name').closest('[role=status]')).toBeInTheDocument();
});
