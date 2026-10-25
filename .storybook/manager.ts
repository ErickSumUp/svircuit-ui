import { addons } from 'storybook/manager-api';
import { themes, listenToColorScheme, type ColorScheme } from './themes';

addons.setConfig({
  theme: themes.light
});

/**
 * Switch the Storybook UI theme based on the "Theme" toolbar global or the
 * system preference.
 */
addons.register('color-scheme', (api) => {
  const setColorScheme = (colorScheme: ColorScheme) => {
    api.setOptions({ theme: themes[colorScheme] });
    document.documentElement.dataset.colorScheme = colorScheme;
  };

  listenToColorScheme(api, undefined, setColorScheme);
});
