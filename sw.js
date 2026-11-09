/* Almida Store V9.4 PWA — cache static shell only, network-first for pages. */
const CACHE = 'almida-pwa-v94-rooticon-20261109';
const SHELL = ['./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(k => (k.startsWith('almida-') && k !== CACHE)).map(k => caches.delete(k)))).then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  const req=e.request, url=new URL(req.url);
  if(req.method!=='GET' || url.origin!==self.location.origin) return;
  if(url.pathname.includes('firebase-config') || url.pathname.includes('/__/')) return;
  if(req.mode==='navigate') {
    e.respondWith(fetch(req).then(res => {
      if(res.ok && url.pathname.endsWith('/index.html')) {const copy=res.clone(); e.waitUntil(caches.open(CACHE).then(c=>c.put('./index.html',copy)));}
      return res;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  if(SHELL.some(p => new URL(p,self.registration.scope).pathname === url.pathname)) {
    e.respondWith(fetch(req).then(res => {
      if(res.ok) {const copy=res.clone(); e.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)));}
      return res;
    }).catch(()=>caches.match(req)));
  }
});
