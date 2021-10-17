const timestamp = 1634484267777;
const build = [
  "/wordgames/_app/start-3eb2358f.js",
  "/wordgames/_app/assets/start-464e9d0a.css",
  "/wordgames/_app/pages/__layout.svelte-321c28a4.js",
  "/wordgames/_app/assets/pages/__layout.svelte-c1ae72a3.css",
  "/wordgames/_app/error.svelte-45dc7034.js",
  "/wordgames/_app/pages/index.svelte-0eb0717b.js",
  "/wordgames/_app/pages/lobby.svelte-071484e6.js",
  "/wordgames/_app/pages/game.svelte-fccee52c.js",
  "/wordgames/_app/chunks/vendor-230de008.js",
  "/wordgames/_app/chunks/singletons-e82519e2.js",
  "/wordgames/_app/chunks/paths-28a87002.js",
  "/wordgames/_app/chunks/util-ab4fc287.js",
  "/wordgames/_app/chunks/userId-ebb4d183.js",
  "/wordgames/_app/chunks/easy-d1c5d374.js",
  "/wordgames/_app/chunks/medium-73eb433f.js",
  "/wordgames/_app/chunks/hard-1ca555bc.js"
];
const files = [
  "/wordgames/favicon.png",
  "/wordgames/icon.png",
  "/wordgames/manifest.json",
  "/wordgames/robots.txt",
  "/wordgames/sounds/alarm-clock.mp3",
  "/wordgames/sounds/alarm-clock.wav",
  "/wordgames/sounds/ticking.mp3",
  "/wordgames/sounds/ticking.wav"
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
