/// <reference types="@sveltejs/kit" />



self.addEventListener('activate', (event) => {
    async function deleteOldCaches() {
        const cacheKeys = await caches.keys();
        const oldCacheKeys = cacheKeys.filter((key) => key !== CACHE);
        await Promise.all(oldCacheKeys.map((key) => caches.delete(key)));
    }

    event.waitUntil(deleteOldCaches());
});


import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files // everything in `static`
];

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((response) => {
				return response || fetch(event.request);
			})
			.catch(() => {
				if (event.request.destination === 'image') {
					return caches.match('/defsite.svg');
				}
			})
	);
});