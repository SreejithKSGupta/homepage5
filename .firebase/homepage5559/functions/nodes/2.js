

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.303cabb0.js","_app/immutable/chunks/scheduler.406c20de.js","_app/immutable/chunks/index.31cb1dae.js","_app/immutable/chunks/dbase.552f1b17.js","_app/immutable/chunks/index.9c65dbe7.js","_app/immutable/chunks/singletons.fb3e966e.js"];
export const stylesheets = ["_app/immutable/assets/2.f5ef2d94.css"];
export const fonts = [];
