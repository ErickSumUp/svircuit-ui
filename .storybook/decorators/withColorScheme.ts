import type { Decorator } from '@storybook/sveltekit';

/**
 * Applies the `colorScheme` global (set via the "Theme" toolbar item in
 * `preview.ts`) to the preview iframe's `<html>` element.
 *
 * The library's own dark mode (`src/lib/styles.css`) is pure CSS: it reads
 * `[data-color-scheme]` and falls back to `@media (prefers-color-scheme)`
 * when the attribute is absent. This decorator's only job is to toggle that
 * attribute for Storybook — no theming library needed, `svircuit-ui` never
 * ships this file.
 */
function applyColorScheme(colorScheme: string) {
  const { documentElement } = document;

  if (colorScheme === 'light' || colorScheme === 'dark') {
    documentElement.dataset.colorScheme = colorScheme;
  } else {
    // "system": remove the override and let the OS preference decide, via
    // the `@media (prefers-color-scheme: dark)` rule in styles.css.
    delete documentElement.dataset.colorScheme;
  }
}

export const withColorScheme: Decorator = (Story, context) => {
  applyColorScheme(context.globals.colorScheme as string);
  return Story();
};
