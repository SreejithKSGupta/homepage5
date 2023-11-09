const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  e + "/_app/immutable/entry/app.b1d7db99.js",
  e + "/_app/immutable/assets/0.c8a3538e.css",
  e + "/_app/immutable/nodes/0.af4ef376.js",
  e + "/_app/immutable/nodes/1.e2fc0739.js",
  e + "/_app/immutable/assets/2.f5ef2d94.css",
  e + "/_app/immutable/nodes/2.303cabb0.js",
  e + "/_app/immutable/assets/sett.6cc06075.webp",
  e + "/_app/immutable/assets/editsite.ba63200c.webp",
  e + "/_app/immutable/assets/add.616c8436.webp",
  e + "/_app/immutable/chunks/dbase.552f1b17.js",
  e + "/_app/immutable/assets/defuser.b13bda04.webp",
  e + "/_app/immutable/assets/wallw.0d7d0518.webp",
  e + "/_app/immutable/chunks/index.31cb1dae.js",
  e + "/_app/immutable/chunks/index.9c65dbe7.js",
  e + "/_app/immutable/chunks/scheduler.406c20de.js",
  e + "/_app/immutable/chunks/singletons.fb3e966e.js",
  e + "/_app/immutable/entry/start.842830ea.js"
], u = [
  e + "/Asas.png",
  e + "/favicon.png",
  e + "/favicon.svg",
  e + "/manifest.json",
  e + "/robots.txt"
], m = "1699542255442", i = `cache-${m}`, p = [
  ...l,
  // the app itself
  ...u
  // everything in `static`
];
self.addEventListener("install", (a) => {
  async function t() {
    await (await caches.open(i)).addAll(p);
  }
  a.waitUntil(t());
});
self.addEventListener("activate", (a) => {
  async function t() {
    for (const s of await caches.keys())
      s !== i && await caches.delete(s);
  }
  a.waitUntil(t());
});
self.addEventListener("fetch", (a) => {
  if (a.request.method !== "GET")
    return;
  async function t() {
    const s = new URL(a.request.url), c = await caches.open(i);
    if (p.includes(s.pathname))
      return c.match(s.pathname);
    try {
      const n = await fetch(a.request);
      return n.status === 200 && c.put(a.request, n.clone()), n;
    } catch {
      return c.match(a.request);
    }
  }
  a.respondWith(t());
});
