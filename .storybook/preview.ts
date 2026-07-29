import type { Preview } from '@storybook/sveltekit';

import '../src/lib/styles.css';
import { themes } from 'storybook/theming';
import { withColorScheme } from './decorators/withColorScheme';
import { modes } from './modes';

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
    },
    chromatic: {
      modes: {
        light: modes.light,
        dark: modes.dark
      }
    }
  },
  initialGlobals: {
    colorScheme: 'light'
  },
  globalTypes: {
    colorScheme: {
      name: 'Theme',
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'Match system', icon: 'browser' }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [withColorScheme]
};

export default preview;
