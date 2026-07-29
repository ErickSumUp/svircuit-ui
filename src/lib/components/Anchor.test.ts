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

test('should render a button when there is a click handler but no href', async () => {
  const { container } = render(Anchor, {
    props: { onclick: () => {}, children: exampleSnippet }
  });

  expect(container.querySelector('button')).toHaveAttribute('type', 'button');
});

test('should render a span when the text leads nowhere', async () => {
  const { container } = render(Anchor, { props: { children: exampleSnippet } });

  expect(container.querySelector('span')).not.toHaveClass('base');
});

test('should describe an external link with the external label', async () => {
  const { container } = render(Anchor, {
    props: {
      href: 'https://opensource.sumup.com/',
      target: '_blank',
      externalLabel: 'opens in a new tab',
      children: exampleSnippet
    }
  });

  const link = container.querySelector('a') as HTMLAnchorElement;
  const label = container.querySelector(`#${link.getAttribute('aria-describedby')}`);

  expect(label).toHaveTextContent('opens in a new tab');
});
