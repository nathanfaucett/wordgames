const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), o = [
  e + "/internal/immutable/entry/app.f21925f7.js",
  e + "/internal/immutable/chunks/0.baf69e1f.js",
  e + "/internal/immutable/chunks/1.dda7d542.js",
  e + "/internal/immutable/chunks/2.5d2e4f99.js",
  e + "/internal/immutable/chunks/3.e455aaef.js",
  e + "/internal/immutable/chunks/4.b6474ef2.js",
  e + "/internal/immutable/chunks/_layout.7e4796dc.js",
  e + "/internal/immutable/chunks/_page.5206eea5.js",
  e + "/internal/immutable/chunks/_page.7a3e9c64.js",
  e + "/internal/immutable/chunks/index.e9f15bb7.js",
  e + "/internal/immutable/chunks/preload-helper.41c905a7.js",
  e + "/internal/immutable/chunks/singletons.cbb839a7.js",
  e + "/internal/immutable/chunks/userId.aee05d52.js",
  e + "/internal/immutable/chunks/util.0eda97c8.js",
  e + "/internal/immutable/entry/start.3a2ddca6.js",
  e + "/internal/immutable/entry/error.svelte.dfa32e1d.js",
  e + "/internal/immutable/chunks/easy.9068188d.js",
  e + "/internal/immutable/chunks/hard.a9247d9f.js",
  e + "/internal/immutable/chunks/medium.4a4f834a.js",
  e + "/internal/immutable/assets/_layout.1ecdd4a4.css",
  e + "/internal/immutable/entry/_layout.svelte.c926483f.js",
  e + "/internal/immutable/entry/_layout.ts.a21eebba.js",
  e + "/internal/immutable/entry/_page.svelte.6497a7cb.js",
  e + "/internal/immutable/entry/game-page.svelte.7dcfe50d.js",
  e + "/internal/immutable/entry/game-page.ts.0960a549.js",
  e + "/internal/immutable/entry/lobby-page.svelte.45274b96.js",
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
], c = "1680692721507", i = self, l = `cache${c}`, r = o.concat(u), h = new Set(r);
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
