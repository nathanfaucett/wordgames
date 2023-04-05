const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), o = [
  e + "/internal/immutable/entry/app.bd8ca869.js",
  e + "/internal/immutable/chunks/0.51277eef.js",
  e + "/internal/immutable/chunks/1.2c0f4194.js",
  e + "/internal/immutable/chunks/2.0b3d463f.js",
  e + "/internal/immutable/chunks/3.f994dfcf.js",
  e + "/internal/immutable/chunks/4.5bf99986.js",
  e + "/internal/immutable/chunks/_layout.7e4796dc.js",
  e + "/internal/immutable/chunks/_page.5206eea5.js",
  e + "/internal/immutable/chunks/_page.7a3e9c64.js",
  e + "/internal/immutable/chunks/index.e9f15bb7.js",
  e + "/internal/immutable/chunks/preload-helper.41c905a7.js",
  e + "/internal/immutable/chunks/singletons.cf31626e.js",
  e + "/internal/immutable/chunks/userId.133a977e.js",
  e + "/internal/immutable/chunks/util.a05a6e2b.js",
  e + "/internal/immutable/entry/start.29e33eb3.js",
  e + "/internal/immutable/entry/error.svelte.04911d46.js",
  e + "/internal/immutable/chunks/easy.9068188d.js",
  e + "/internal/immutable/chunks/hard.a9247d9f.js",
  e + "/internal/immutable/chunks/medium.4a4f834a.js",
  e + "/internal/immutable/assets/_layout.5645f4eb.css",
  e + "/internal/immutable/entry/_layout.svelte.afe077d6.js",
  e + "/internal/immutable/entry/_layout.ts.a21eebba.js",
  e + "/internal/immutable/entry/_page.svelte.aa242727.js",
  e + "/internal/immutable/entry/game-page.svelte.3c477cde.js",
  e + "/internal/immutable/entry/game-page.ts.0960a549.js",
  e + "/internal/immutable/entry/lobby-page.svelte.769be575.js",
  e + "/internal/immutable/entry/lobby-page.ts.0960a549.js"
], u = [
  e + "/favicon.png",
  e + "/icon.png",
  e + "/manifest.json",
  e + "/robots.txt",
  e + "/sounds/alarm-clock.mp3",
  e + "/sounds/alarm-clock.wav",
  e + "/sounds/ticking.mp3",
  e + "/sounds/ticking.wav"
], c = "1680655278477", i = self, l = `cache${c}`, r = o.concat(u), h = new Set(r);
i.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open(l).then((a) => a.addAll(r)).then(() => {
      i.skipWaiting();
    })
  );
});
i.addEventListener("activate", (t) => {
  t.waitUntil(
    caches.keys().then(async (a) => {
      for (const n of a)
        n !== l && await caches.delete(n);
      i.clients.claim();
    })
  );
});
async function b(t) {
  const a = await caches.open(`offline${c}`);
  try {
    const n = await fetch(t);
    return a.put(t, n.clone()), n;
  } catch (n) {
    const s = await a.match(t);
    if (s)
      return s;
    throw n;
  }
}
i.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const a = new URL(t.request.url), n = a.hostname === self.location.hostname && a.port !== self.location.port, s = a.host === self.location.host && h.has(a.pathname), m = t.request.cache === "only-if-cached" && !s;
  !n && !m && t.respondWith(
    (async () => s && await caches.match(t.request) || b(t.request))()
  );
});
