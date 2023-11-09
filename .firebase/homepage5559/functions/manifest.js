export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Asas.png","favicon.png","favicon.svg","manifest.json","robots.txt","service-worker.js"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.842830ea.js","app":"_app/immutable/entry/app.b1d7db99.js","imports":["_app/immutable/entry/start.842830ea.js","_app/immutable/chunks/scheduler.406c20de.js","_app/immutable/chunks/singletons.fb3e966e.js","_app/immutable/chunks/index.9c65dbe7.js","_app/immutable/entry/app.b1d7db99.js","_app/immutable/chunks/scheduler.406c20de.js","_app/immutable/chunks/index.31cb1dae.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
