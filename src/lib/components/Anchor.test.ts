import { render } from '@testing-library/svelte';
import { test, expect } from 'vitest';

import Anchor from './Anchor.svelte';
import { exampleSnippet } from './TestText.svelte';

test('should match story case', async () => {
  const { container } = render(Anchor, {
    props: {
      href: 'https://opensource.sumup.com/',
      children: exampleSnippet
    }
  });

  expect(container).toMatchSnapshot();
});
