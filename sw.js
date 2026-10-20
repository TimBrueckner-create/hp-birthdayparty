const PREFIX='geheime-karte:'+self.registration.scope;
const CACHE=PREFIX+'v4-release';
const FILES=['./', './index.html', './style.css', './app.js', './core.js', './manifest.json', './icon.svg', './assets/castle.jpg', './assets/hat.jpg', './assets/creature.jpg', './assets/chest.jpg', './assets/tree.jpg', './assets/area-map.svg', './assets/map-meta.json','./assets/egg.jpg','./assets/scroll.jpg','./assets/kartendaten.zip'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||!event.request.url.startsWith(self.registration.scope))return;event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request)).then(hit=>hit||fetch(event.request)));});
self.addEventListener('message',event=>{if(event.data==='CHECK_OFFLINE')event.waitUntil(caches.open(CACHE).then(async cache=>{const files=await Promise.all(FILES.map(f=>cache.match(f)));if(files.every(Boolean))event.source?.postMessage('OFFLINE_READY');}));});
