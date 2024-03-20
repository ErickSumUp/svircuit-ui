import type { Preview } from '@storybook/svelte';

import '../src/histoire.css';
import { themes } from '@storybook/theming';

const preview: Preview = {
	parameters: {
		docs: {
			toc: {
				title: 'On this page',
				headingSelector: 'h2, h3'
			},
			theme: themes.light
		},
	}
};

export default preview;
