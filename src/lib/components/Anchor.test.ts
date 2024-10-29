import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Anchor from '$lib/components/Anchor.svelte';
import { test, expect } from 'vitest';

test('should match story case', async () => {
  const { container } = render(Anchor, {
    props: { href: 'https://opensource.sumup.com/' }
  });
  expect(container).toMatchSnapshot();
});
