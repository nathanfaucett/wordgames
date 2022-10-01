const i = [
  "/wordgames/internal/immutable/start-98c0c9f6.js",
  "/wordgames/internal/immutable/components/pages/_layout.svelte-23e861a5.js",
  "/wordgames/internal/immutable/assets/_layout-50843def.css",
  "/wordgames/internal/immutable/components/error.svelte-060ce551.js",
  "/wordgames/internal/immutable/components/pages/_page.svelte-6f8e5d75.js",
  "/wordgames/internal/immutable/components/pages/game/_page.svelte-c32e3ff0.js",
  "/wordgames/internal/immutable/components/pages/lobby/_page.svelte-ab853c2b.js",
  "/wordgames/internal/immutable/modules/pages/_layout.ts-ccf77788.js",
  "/wordgames/internal/immutable/chunks/singletons-22490379.js",
  "/wordgames/internal/immutable/chunks/preload-helper-0ffe6af8.js",
  "/wordgames/internal/immutable/chunks/index-321b22c2.js",
  "/wordgames/internal/immutable/chunks/_layout-c2405b24.js",
  "/wordgames/internal/immutable/chunks/util-663ac0af.js",
  "/wordgames/internal/immutable/chunks/userId-5a5ee24e.js",
  "/wordgames/internal/immutable/chunks/0-18f2ad58.js",
  "/wordgames/internal/immutable/chunks/1-574a9362.js",
  "/wordgames/internal/immutable/chunks/2-d10aac58.js",
  "/wordgames/internal/immutable/chunks/3-1a5007d3.js",
  "/wordgames/internal/immutable/chunks/4-1d529a46.js",
  "/wordgames/internal/immutable/chunks/easy-d6952d4b.js",
  "/wordgames/internal/immutable/chunks/medium-27fe57e1.js",
  "/wordgames/internal/immutable/chunks/hard-6fdf5c11.js"
], l = [
  "/wordgames/favicon.png",
  "/wordgames/icon.png",
  "/wordgames/manifest.json",
  "/wordgames/robots.txt",
  "/wordgames/sounds/alarm-clock.mp3",
  "/wordgames/sounds/alarm-clock.wav",
  "/wordgames/sounds/ticking.mp3",
  "/wordgames/sounds/ticking.wav"
], c = "1664630620117", n = self, o = `cache${c}`, r = i.concat(l), d = new Set(r);
n.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(o).then((s) => s.addAll(r)).then(() => {
      n.skipWaiting();
    })
  );
});
n.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const a of s)
        a !== o && await caches.delete(a);
      n.clients.claim();
    })
  );
});
async function u(e) {
  const s = await caches.open(`offline${c}`);
  try {
    const a = await fetch(e);
    return s.put(e, a.clone()), a;
  } catch (a) {
    const t = await s.match(e);
    if (t)
      return t;
    throw a;
  }
}
n.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), a = s.hostname === self.location.hostname && s.port !== self.location.port, t = s.host === self.location.host && d.has(s.pathname), m = e.request.cache === "only-if-cached" && !t;
  !a && !m && e.respondWith(
    (async () => t && await caches.match(e.request) || u(e.request))()
  );
});
