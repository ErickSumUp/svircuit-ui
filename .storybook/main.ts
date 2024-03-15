import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)',
		'../docs/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	}
};
export default config;
