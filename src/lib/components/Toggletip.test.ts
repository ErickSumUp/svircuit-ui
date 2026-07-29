import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Toggletip from './Toggletip.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case variants', async () => {
  const { container } = render(Toggletip, {
    headline: 'What is a chargeback?',
    body: 'A chargeback is a return of money to a payer of a transaction.',
    trigger: exampleSnippet
  });

  expect(container).toMatchSnapshot();
});
