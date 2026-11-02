import { render, screen } from '@testing-library/svelte';
import { describe, test, expect } from 'vitest';

import Toggletip from './Toggletip.svelte';
import { exampleSnippet } from './TestText.svelte';

const baseProps = {
  headline: 'What is a chargeback?',
  body: 'A chargeback is a return of money to a payer of a transaction.',
  trigger: exampleSnippet
};

test('should match story case variants', async () => {
  const { container } = render(Toggletip, baseProps);

  expect(container).toMatchSnapshot();
});

describe('action', () => {
  test('should render a link with an href', async () => {
    render(Toggletip, {
      ...baseProps,
      action: { label: 'Learn more', href: '/help', target: '_blank' }
    });

    const link = screen.getByRole('link', { name: 'Learn more', hidden: true });
    expect(link).toHaveAttribute('href', '/help');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  test('should pass a custom rel', async () => {
    render(Toggletip, {
      ...baseProps,
      action: { label: 'Learn more', href: '/help', target: '_blank', rel: 'external' }
    });

    expect(screen.getByRole('link', { name: 'Learn more', hidden: true })).toHaveAttribute(
      'rel',
      'external'
    );
  });

  test('should style a destructive action', async () => {
    render(Toggletip, { ...baseProps, action: { label: 'Delete', destructive: true } });

    expect(screen.getByRole('button', { name: 'Delete', hidden: true })).toHaveClass(
      'action',
      'destructive'
    );
  });

  test('should render a disabled link as a disabled button', async () => {
    render(Toggletip, {
      ...baseProps,
      action: { label: 'Learn more', href: '/help', disabled: true }
    });

    expect(screen.queryByRole('link', { hidden: true })).toBeNull();
    expect(screen.getByRole('button', { name: 'Learn more', hidden: true })).toBeDisabled();
  });
});
