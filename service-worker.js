const timestamp = 1634486934427;
const build = [
  "/wordgames/_app/start-adb38fd2.js",
  "/wordgames/_app/assets/start-464e9d0a.css",
  "/wordgames/_app/pages/__layout.svelte-fc2daf0e.js",
  "/wordgames/_app/assets/pages/__layout.svelte-c1ae72a3.css",
  "/wordgames/_app/error.svelte-032cb28e.js",
  "/wordgames/_app/pages/index.svelte-147d70a9.js",
  "/wordgames/_app/pages/lobby.svelte-a35d5385.js",
  "/wordgames/_app/pages/game.svelte-260d3651.js",
  "/wordgames/_app/chunks/vendor-497916f4.js",
  "/wordgames/_app/chunks/singletons-12a22614.js",
  "/wordgames/_app/chunks/paths-28a87002.js",
  "/wordgames/_app/chunks/preload-helper-ac1c8acd.js",
  "/wordgames/_app/chunks/util-94303f55.js",
  "/wordgames/_app/chunks/userId-81e85698.js",
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
