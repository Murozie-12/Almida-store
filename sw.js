/* Almida Store — resilient PWA service worker */
const CACHE = 'almida-pwa-v94-repair-2';
const CORE = ['./', './index.html'];
const ASSETS = ['./manifest.json', './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Cache entry page first; noncritical assets must not block activation.
    await cache.addAll(CORE);
    await Promise.allSettled(ASSETS.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('almida-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.includes('firebase-config') || url.pathname.includes('/__/')) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(async () => (await caches.match(req)) || (await caches.match('./index.html')) || (await caches.match('./'))));
  }
});
