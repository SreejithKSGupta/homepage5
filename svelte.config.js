import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
			adapter: adapter({
				minify: false,
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: true,
				strict: true,
				prerender: {
					crawl: true,
					enabled: false,
					force: false,
					pages: ['*'],
				},

			})
	}

};
export default config;