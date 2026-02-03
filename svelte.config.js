import adapter from 'svelte-adapter-nekoweb';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const nwApiKey = process.env.NEKOWEB_API;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			apiKey: nwApiKey,
			// cookie: 'nekoweb cookie here (optional, but recommended)',
			// folder: 'build',
			// Default adapter-static options are below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;