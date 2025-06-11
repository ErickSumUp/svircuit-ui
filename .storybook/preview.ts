import type { Preview } from '@storybook/sveltekit';

import '../src/lib/styles.css';
import { themes } from 'storybook/theming';

const preview: Preview = {
  parameters: {
    docs: {
      toc: {
        title: 'On this page',
        headingSelector: 'h2, h3'
      },
      theme: themes.light
    },
    options: {
      storySort: {
        order: ['Introduction'],
        includeName: true
      }
    }
  }
};

export default preview;
