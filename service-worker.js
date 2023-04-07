const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), o = [
  e + "/internal/immutable/entry/app.7ed5b349.js",
  e + "/internal/immutable/chunks/0.baf69e1f.js",
  e + "/internal/immutable/chunks/1.ce883d22.js",
  e + "/internal/immutable/chunks/2.918a119c.js",
  e + "/internal/immutable/chunks/3.5bf811ca.js",
  e + "/internal/immutable/chunks/4.59a0711c.js",
  e + "/internal/immutable/chunks/_layout.7e4796dc.js",
  e + "/internal/immutable/chunks/_page.5206eea5.js",
  e + "/internal/immutable/chunks/_page.7a3e9c64.js",
  e + "/internal/immutable/chunks/index.e9f15bb7.js",
  e + "/internal/immutable/chunks/preload-helper.41c905a7.js",
  e + "/internal/immutable/chunks/singletons.aa0faa8a.js",
  e + "/internal/immutable/chunks/userId.a5c8385a.js",
  e + "/internal/immutable/chunks/util.3aebd846.js",
  e + "/internal/immutable/entry/start.df48aa40.js",
  e + "/internal/immutable/entry/error.svelte.1f0853cf.js",
  e + "/internal/immutable/chunks/easy.9068188d.js",
  e + "/internal/immutable/chunks/hard.a9247d9f.js",
  e + "/internal/immutable/chunks/medium.4a4f834a.js",
  e + "/internal/immutable/assets/_layout.1ecdd4a4.css",
  e + "/internal/immutable/entry/_layout.svelte.c926483f.js",
  e + "/internal/immutable/entry/_layout.ts.a21eebba.js",
  e + "/internal/immutable/entry/_page.svelte.32cd272f.js",
  e + "/internal/immutable/entry/game-page.svelte.3a08ffe0.js",
  e + "/internal/immutable/entry/game-page.ts.0960a549.js",
  e + "/internal/immutable/entry/lobby-page.svelte.09d1f417.js",
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
], c = "1680903574183", i = self, l = `cache${c}`, r = o.concat(u), h = new Set(r);
i.addEventListener("install", (a) => {
  a.waitUntil(
    caches.open(l).then((t) => t.addAll(r)).then(() => {
      i.skipWaiting();
    })
  );
});
i.addEventListener("activate", (a) => {
  a.waitUntil(
    caches.keys().then(async (t) => {
      for (const n of t)
        n !== l && await caches.delete(n);
      i.clients.claim();
    })
  );
});
async function b(a) {
  const t = await caches.open(`offline${c}`);
  try {
    const n = await fetch(a);
    return t.put(a, n.clone()), n;
  } catch (n) {
    const s = await t.match(a);
    if (s)
      return s;
    throw n;
  }
}
i.addEventListener("fetch", (a) => {
  if (a.request.method !== "GET" || a.request.headers.has("range"))
    return;
  const t = new URL(a.request.url), n = t.hostname === self.location.hostname && t.port !== self.location.port, s = t.host === self.location.host && h.has(t.pathname), m = a.request.cache === "only-if-cached" && !s;
  !n && !m && a.respondWith(
    (async () => s && await caches.match(a.request) || b(a.request))()
  );
});
