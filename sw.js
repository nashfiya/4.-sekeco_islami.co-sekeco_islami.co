/**
 * ISLAMI.CO - SERVICE WORKER (CACHE PURGE & LIVE REFRESH)
 * Secara otomatis menghapus seluruh cache lama dan selalu menyajikan versi terkini.
 */

const CACHE_NAME = 'islami-live-v3';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(k => {
          console.log('[SW] Menghapus cache lama:', k);
          return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Selalu ambil langsung dari network (live freshness)
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
