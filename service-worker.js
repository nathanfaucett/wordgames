const timestamp = 1634401346207;
const build = [
  "/wordgames/_app/start-a08b8e48.js",
  "/wordgames/_app/assets/start-464e9d0a.css",
  "/wordgames/_app/pages/__layout.svelte-8d0b3537.js",
  "/wordgames/_app/assets/pages/__layout.svelte-bb762058.css",
  "/wordgames/_app/error.svelte-be9fd83d.js",
  "/wordgames/_app/pages/index.svelte-bb6795e4.js",
  "/wordgames/_app/pages/lobby.svelte-ebaa0161.js",
  "/wordgames/_app/pages/auth.svelte-87fe6a9f.js",
  "/wordgames/_app/pages/game.svelte-0882460b.js",
  "/wordgames/_app/chunks/vendor-edab756b.js",
  "/wordgames/_app/chunks/singletons-12a22614.js",
  "/wordgames/_app/chunks/paths-28a87002.js",
  "/wordgames/_app/chunks/preload-helper-ac1c8acd.js",
  "/wordgames/_app/chunks/user-87081f1d.js",
  "/wordgames/_app/chunks/util-ba9c2cff.js",
  "/wordgames/_app/chunks/words-ca403351.js",
  "/wordgames/_app/chunks/easy-d1c5d374.js",
  "/wordgames/_app/chunks/medium-73eb433f.js",
  "/wordgames/_app/chunks/hard-1ca555bc.js"
];
const files = [
  "/wordgames/favicon.png",
  "/wordgames/icon.png",
  "/wordgames/manifest.json",
  "/wordgames/robots.txt"
];
const CACHE_NAME = `static-cache-v${timestamp}`;
const FILES_TO_CACHE = [...build, ...files];
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log("[ServiceWorker] Pre-caching offline page");
    return cache.addAll(FILES_TO_CACHE);
  }));
  self.skipWaiting();
});
self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  evt.waitUntil(caches.keys().then((keyList) => Promise.all(keyList.map((key) => {
    if (key !== CACHE_NAME) {
      console.log("[ServiceWorker] Removing old cache", key);
      return caches.delete(key);
    }
  }))));
  self.clients.claim();
});
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  if (evt.request.mode !== "navigate") {
    return;
  }
  evt.respondWith(fetch(evt.request).catch(() => caches.open(CACHE_NAME).then((cache) => cache.match("offline.html"))));
});
