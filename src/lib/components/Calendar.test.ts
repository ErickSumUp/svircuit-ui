import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Calendar from './Calendar.svelte';

test('should match story case variants', async () => {
  const { container } = render(Calendar, {
    selection: '2020-03-15',
    locale: 'en-US'
  });

  expect(container).toMatchSnapshot();
});
