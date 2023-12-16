/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files  // everything in `static`
];

self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

// self.addEventListener('activate', (event) => {
// 	// Remove previous cached data from disk
// 	async function deleteOldCaches() {
// 		for (const key of await caches.keys()) {
// 			if (key !== CACHE) await caches.delete(key);
// 		}
// 	}

// 	event.waitUntil(deleteOldCaches());
// });

// self.addEventListener('fetch', (event) => {
// 	// ignore POST requests etc
// 	if (event.request.method !== 'GET') return;

// 	async function respond() {
// 		const url = new URL(event.request.url);
// 		const cache = await caches.open(CACHE);

// 		if (ASSETS.includes(url.pathname)) {
// 			const response = await cache.match(url.pathname);

// 			if (response) {
// 				return response;
// 			}
// 		}

// 		try {
// 			const response = await fetch(event.request);

// 			if (!(response instanceof Response)) {
// 				throw new Error('invalid response from fetch');
// 			}

// 			if (response.status === 200) {
// 				cache.put(event.request, response.clone());
// 			}

// 			return response;
// 		} catch (err) {
// 			const response = await cache.match(event.request);

// 			if (response) {
// 				return response;
// 			}
// 			throw err;
// 		}
// 	}

// 	event.respondWith(respond());
// });