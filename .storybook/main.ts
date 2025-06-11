import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)',
    '../docs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'
  ],
  addons: [
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-svelte-csf',
    '@storybook/addon-a11y',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {}
};
export default config;
