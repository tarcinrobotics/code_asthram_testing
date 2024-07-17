const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error('Failed to install service worker:', error);
            })
    );
});

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
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(event.request).then(response => {
                // Ensure a valid Response is always returned
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    console.error('Fetch failed, returning network error response for API request:', event.request.url);
                    return caches.match('offline.html');
                }
                return response;
            }).catch(error => {
                console.error('Fetch failed, returning cached response for API request:', event.request.url, error);
                return caches.match(event.request).then(cachedResponse => {
                    return cachedResponse || caches.match('offline.html');
                });
            })
        );
    } else {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    const fetchPromise = fetch(event.request).then(networkResponse => {
                        // Ensure a valid Response is always returned
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            console.error('Fetch failed, returning cached response for:', event.request.url);
                            return response || networkResponse;
                        }
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }).catch(error => {
                        console.error('Fetch failed, returning cached response for:', event.request.url, error);
                        return response;
                    });

                    return response || fetchPromise;
                });
            })
        );
    }
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    const dataToSync = await getCachedData(); // Placeholder for your data fetching logic
    try {
        const response = await fetch('api/data-sync', {
            method: 'POST',
            body: JSON.stringify(dataToSync),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('Data synced successfully');
            clearCachedData(); // Placeholder for clearing your local cache if needed
        }
    } catch (error) {
        console.error('Failed to sync data:', error);
    }
}

self.addEventListener('push', event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/icon.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
