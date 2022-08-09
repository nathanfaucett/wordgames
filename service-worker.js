const l = [
  "/wordgames/internal/immutable/start-191007ff.js",
  "/wordgames/internal/immutable/pages/__layout.svelte-3cdd55db.js",
  "/wordgames/internal/immutable/assets/__layout-abec3685.css",
  "/wordgames/internal/immutable/error.svelte-8201d305.js",
  "/wordgames/internal/immutable/pages/game.svelte-a85c1ccc.js",
  "/wordgames/internal/immutable/pages/index.svelte-ada279ab.js",
  "/wordgames/internal/immutable/pages/lobby.svelte-5e666eba.js",
  "/wordgames/internal/immutable/chunks/index-275a10fd.js",
  "/wordgames/internal/immutable/chunks/singletons-80e721ca.js",
  "/wordgames/internal/immutable/chunks/preload-helper-362d4722.js",
  "/wordgames/internal/immutable/chunks/util-dfedccda.js",
  "/wordgames/internal/immutable/chunks/userId-791e378d.js",
  "/wordgames/internal/immutable/chunks/easy-d6952d4b.js",
  "/wordgames/internal/immutable/chunks/medium-27fe57e1.js",
  "/wordgames/internal/immutable/chunks/hard-6fdf5c11.js"
], m = [
  "/wordgames/favicon.png",
  "/wordgames/icon.png",
  "/wordgames/manifest.json",
  "/wordgames/robots.txt",
  "/wordgames/sounds/alarm-clock.mp3",
  "/wordgames/sounds/alarm-clock.wav",
  "/wordgames/sounds/ticking.mp3",
  "/wordgames/sounds/ticking.wav"
], c = "1660086360397", n = self, o = `cache${c}`, r = l.concat(m), d = new Set(r);
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
  const s = new URL(e.request.url), a = s.hostname === self.location.hostname && s.port !== self.location.port, t = s.host === self.location.host && d.has(s.pathname), i = e.request.cache === "only-if-cached" && !t;
  !a && !i && e.respondWith(
    (async () => t && await caches.match(e.request) || u(e.request))()
  );
});
