self.addEventListener('install', event => event.waitUntil(
    caches.open('moviespot-v1.0.0-core')
        .then(cache => cache.addAll([
            '/offline/',
            '/assets/css/style.css',
            '/assets/css/movie_style.css',
        ]))
        .then(self.skipWaiting())
));

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => cachePage(request, response))
                .catch(err => getCachedPage(request))
                .catch(err => fetchCoreFile('/offline/'))
        );
    } else {
        event.respondWith(
            fetch(request)
                .catch(err => fetchCoreFile(request.url))
                .catch(err => fetchCoreFile('/offline/'))
        );
    }
});

function fetchCoreFile(url) {
    return caches.open('moviespot-v1.0.0-core')
        .then(cache => cache.match(url))
        .then(response => response ? response : Promise.reject());
}

function getCachedPage(request) {
    return caches.open('moviespot-v1.0.0-pages')
        .then(cache => cache.match(request))
        .then(response => response ? response : Promise.reject());
}

function cachePage(request, response) {
    const clonedResponse = response.clone();
    caches.open('moviespot-v1.0.0-pages')
        .then(cache => cache.put(request, clonedResponse));
    return response;
}
