const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), o = [
  e + "/internal/immutable/entry/app.67fc0ed6.js",
  e + "/internal/immutable/chunks/0.bcc0c1e2.js",
  e + "/internal/immutable/chunks/1.072cecf1.js",
  e + "/internal/immutable/chunks/2.4cb203bf.js",
  e + "/internal/immutable/chunks/3.c5b0e673.js",
  e + "/internal/immutable/chunks/4.fa42c3b8.js",
  e + "/internal/immutable/chunks/_layout.7e4796dc.js",
  e + "/internal/immutable/chunks/_page.5206eea5.js",
  e + "/internal/immutable/chunks/_page.7a3e9c64.js",
  e + "/internal/immutable/chunks/index.8f7fe7b1.js",
  e + "/internal/immutable/chunks/preload-helper.41c905a7.js",
  e + "/internal/immutable/chunks/singletons.61a91846.js",
  e + "/internal/immutable/chunks/userId.0c95ee66.js",
  e + "/internal/immutable/chunks/util.54d134f6.js",
  e + "/internal/immutable/entry/start.7d9224d8.js",
  e + "/internal/immutable/entry/error.svelte.bd830b0c.js",
  e + "/internal/immutable/chunks/easy.9068188d.js",
  e + "/internal/immutable/chunks/hard.a9247d9f.js",
  e + "/internal/immutable/chunks/medium.4a4f834a.js",
  e + "/internal/immutable/assets/_layout.825a6408.css",
  e + "/internal/immutable/entry/_layout.svelte.525d1110.js",
  e + "/internal/immutable/entry/_layout.ts.a21eebba.js",
  e + "/internal/immutable/entry/_page.svelte.44a8d552.js",
  e + "/internal/immutable/entry/game-page.svelte.2d7a4f79.js",
  e + "/internal/immutable/entry/game-page.ts.0960a549.js",
  e + "/internal/immutable/entry/lobby-page.svelte.eea1eac5.js",
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
], i = "1679838217754", c = self, l = `cache${i}`, r = o.concat(u), h = new Set(r);
c.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open(l).then((a) => a.addAll(r)).then(() => {
      c.skipWaiting();
    })
  );
});
c.addEventListener("activate", (t) => {
  t.waitUntil(
    caches.keys().then(async (a) => {
      for (const n of a)
        n !== l && await caches.delete(n);
      c.clients.claim();
    })
  );
});
async function b(t) {
  const a = await caches.open(`offline${i}`);
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
c.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const a = new URL(t.request.url), n = a.hostname === self.location.hostname && a.port !== self.location.port, s = a.host === self.location.host && h.has(a.pathname), m = t.request.cache === "only-if-cached" && !s;
  !n && !m && t.respondWith(
    (async () => s && await caches.match(t.request) || b(t.request))()
  );
});
