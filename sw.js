const CACHE='geheime-karte-v2';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.json','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('geheime-karte-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||!event.request.url.startsWith(self.registration.scope))return;event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request)).then(hit=>hit||fetch(event.request)));});
self.addEventListener('message',event=>{if(event.data==='CHECK_OFFLINE')event.waitUntil(caches.open(CACHE).then(async cache=>{const files=await Promise.all(FILES.map(f=>cache.match(f)));if(files.every(Boolean))event.source?.postMessage('OFFLINE_READY');}));});
