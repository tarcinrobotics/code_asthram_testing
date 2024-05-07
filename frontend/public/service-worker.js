const CACHE_NAME = 'version-1';
const urlsToCache = [ 'index.html', 'offline.html' ];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Forces the waiting service worker to become the active service worker.
            .catch(error => {
                console.error('Failed to install service worker:', error);
            })
    );
});



// Listen for requests
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Use network first for API calls
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
    } else {
        // Default to cache first for others
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    }
});


// Activate the SW
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.matchAll({type: 'window'}).then(clients => {
        for (const client of clients) {
            // Send a message to each client about the update
            client.postMessage('New version available! Refresh to update.');
        }
    });
});
