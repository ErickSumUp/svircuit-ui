import { create, type ThemeVars } from 'storybook/theming';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';

/**
 * Colors are synced with Circuit UI's own Storybook themes
 * (https://github.com/sumup-oss/circuit-ui/blob/main/.storybook/themes.ts).
 */
const brand = {
  brandTitle: 'Svircuit UI',
  brandUrl: 'https://github.com/', //sumup-oss/circuit-ui',
  fontBase:
    '"Inter", "Inter-Fallback", Arial, system-ui, sans-serif, "Segoe UI", Roboto, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
};

export const light = create({
  base: 'light',
  ...brand,
  colorPrimary: '#1e1c1c', // var(--cui-fg-accent)
  colorSecondary: '#1e1c1c', // var(--cui-fg-normal)

  // UI
  appBg: '#fbfbf9', // var(--cui-bg-normal)
  appBorderColor: '#d0cdc3', // var(--cui-border-normal)
  appBorderRadius: 0,
  appContentBg: '#fbfbf9', // var(--cui-bg-normal)
  appHoverBg: '#f1f0e9', // var(--cui-bg-normal-hovered)
  appPreviewBg: '#fbfbf9', // var(--cui-bg-normal)

  // Text colors
  textColor: '#1e1c1c', // var(--cui-fg-normal)
  textMutedColor: '#706464', // var(--cui-fg-subtle)
  textInverseColor: '#fbfbf9', // var(--cui-fg-on-strong)

  // Toolbar default and active colors
  barTextColor: '#706464', // var(--cui-fg-subtle)
  barHoverColor: '#7f7373', // var(--cui-fg-subtle-hovered)
  barSelectedColor: '#8e8282', // var(--cui-fg-subtle-pressed)
  barBg: '#fbfbf9', // var(--cui-bg-normal)

  // Form colors
  buttonBg: '#f5f4ed', // var(--cui-bg-subtle)
  buttonBorder: '#e3e2d6', // var(--cui-border-subtle)
  inputBg: '#fbfbf9', // var(--cui-bg-normal)
  inputBorder: '#d0cdc3', // var(--cui-border-normal)
  inputTextColor: '#1e1c1c', // var(--cui-fg-normal)
  inputBorderRadius: 4 // var(--cui-border-radius-bit)
});

export const dark = create({
  base: 'dark',
  ...brand,
  colorPrimary: '#f0eee7', // var(--cui-fg-accent)
  colorSecondary: '#f0eee7', // var(--cui-fg-normal)

  // UI
  appBg: '#141211', // var(--cui-bg-normal)
  appBorderColor: '#46423d', // var(--cui-border-normal)
  appBorderRadius: 8, // var(--cui-border-radius-byte)
  appContentBg: '#141211', // var(--cui-bg-normal)
  appHoverBg: '#0f0e0c', // var(--cui-bg-normal-hovered)
  appPreviewBg: '#141211', // var(--cui-bg-normal)

  // Text colors
  textColor: '#f0eee7', // var(--cui-fg-normal)
  textMutedColor: '#a9a19d', // var(--cui-fg-subtle)
  textInverseColor: '#1e1c1c', // var(--cui-fg-on-strong)

  // Toolbar default and active colors
  barTextColor: '#a9a19d', // var(--cui-fg-subtle)
  barHoverColor: '#ada8a2', // var(--cui-fg-subtle-hovered)
  barSelectedColor: '#f0eee7', // var(--cui-fg-normal)
  barBg: '#141211', // var(--cui-bg-normal)

  // Form colors
  buttonBg: '#211f1e', // var(--cui-bg-subtle)
  buttonBorder: '#46423d', // var(--cui-border-normal)
  inputBg: '#211f1e', // var(--cui-bg-subtle)
  inputBorder: '#46423d', // var(--cui-border-normal)
  inputTextColor: '#f0eee7', // var(--cui-fg-normal)
  inputBorderRadius: 16 // var(--cui-border-radius-pill)
});

export const themes = { light, dark };

export type ColorScheme = keyof typeof themes;

/**
 * Docs pages read `parameters.docs.theme` on every render (and re-render when
 * globals change), so each value is resolved against the current scheme.
 */
export function createDocsTheme(getColorScheme: () => ColorScheme): ThemeVars {
  const keys = Object.keys(light) as (keyof ThemeVars)[];

  return Object.defineProperties(
    {},
    Object.fromEntries(
      keys.map((key) => [key, { enumerable: true, get: () => themes[getColorScheme()][key] }])
    )
  ) as ThemeVars;
}

type Globals = Record<string, unknown>;
type Listener = (payload: { globals: Globals }) => void;
type Channel = {
  on: (eventName: string, listener: Listener) => void;
  off: (eventName: string, listener: Listener) => void;
};

/**
 * Reads the globals Storybook persists in the URL (`?globals=key:value;…`),
 * so the theme is right on first paint instead of after the first event.
 */
function getUrlGlobals(): Globals {
  const param = new URL(window.location.href).searchParams.get('globals');
  return Object.fromEntries((param ?? '').split(';').map((global) => global.split(':')));
}

/**
 * Calls `callback` with the resolved color scheme whenever the "Theme"
 * toolbar global changes. "system" follows the OS preference.
 */
export function listenToColorScheme(
  channel: Channel,
  initialColorScheme: unknown,
  callback: (colorScheme: ColorScheme) => void
) {
  const query = window.matchMedia('(prefers-color-scheme: dark)');

  const handleMediaChange = () => callback(query.matches ? 'dark' : 'light');

  const applyColorScheme = (colorScheme: unknown) => {
    if (colorScheme === 'light' || colorScheme === 'dark') {
      query.removeEventListener('change', handleMediaChange);
      callback(colorScheme);
    } else {
      query.addEventListener('change', handleMediaChange);
      handleMediaChange();
    }
  };

  const handleGlobals: Listener = ({ globals }) => applyColorScheme(globals.colorScheme);

  applyColorScheme(getUrlGlobals().colorScheme ?? initialColorScheme);

  channel.on(SET_GLOBALS, handleGlobals);
  channel.on(GLOBALS_UPDATED, handleGlobals);

  return () => {
    channel.off(SET_GLOBALS, handleGlobals);
    channel.off(GLOBALS_UPDATED, handleGlobals);
    query.removeEventListener('change', handleMediaChange);
  };
}
