

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.e2fc0739.js","_app/immutable/chunks/scheduler.406c20de.js","_app/immutable/chunks/index.31cb1dae.js","_app/immutable/chunks/singletons.fb3e966e.js","_app/immutable/chunks/index.9c65dbe7.js"];
export const stylesheets = [];
export const fonts = [];
