import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
    
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: true,
				strict: true,
				prerender: {
					crawl: true,
					enabled: true,
					force: false,
					pages: ['*'],
				},

			})
	}

};
export default config;