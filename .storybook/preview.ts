import type { Preview } from '@storybook/sveltekit';
import { addons } from 'storybook/preview-api';

import '../src/lib/styles.css';
import { applyColorScheme, withColorScheme } from './decorators/withColorScheme';
import { modes } from './modes';
import { createDocsTheme, listenToColorScheme, type ColorScheme } from './themes';

let colorScheme: ColorScheme = 'light';

listenToColorScheme(addons.getChannel(), 'light', (resolved) => {
  colorScheme = resolved;
  // Pages without stories (e.g. MDX) never run the `withColorScheme` decorator.
  applyColorScheme(resolved);
});

const preview: Preview = {
  parameters: {
    docs: {
      toc: {
        title: 'On this page',
        headingSelector: 'h2, h3'
      },
      theme: createDocsTheme(() => colorScheme)
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
