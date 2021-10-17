import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		paths: process.env.USE_BASE_PATH
			? {
					base: '/wordgames'
			  }
			: {},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#app'
	}
};

export default config;