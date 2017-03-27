const CORE_CACHE_NAME = 'moviespot-v1.0.0-core';
const PAGE_CACHE_NAME = 'moviespot-v1.0.0-pages';
const CORE_FILES = ['/assets/css/style.css', '/assets/css/movie_style.css'];

/* CACHE CORE SITE ASSETS
-------------------------------------------------------------- */
this.addEventListener('install', event => event.waitUntil(
    caches.open(CORE_CACHE_NAME) // Open cache with name: moviespot-v1.0.0-core
        .then(cache => cache.addAll(CORE_FILES)) // Add all core files to the cache
        .then(this.skipWaiting())  // Create the new active worker
));

this.addEventListener('fetch', event => {
    const request = event.request;
    console.log(request);
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
    return caches.open(CORE_CACHE_NAME)
        .then(cache => cache.match(url))
        .then(response => response ? response : Promise.reject());
}

function getCachedPage(request) {
    return caches.open(PAGE_CACHE_NAME)
        .then(cache => cache.match(request))
        .then(response => response ? response : Promise.reject());
}

function cachePage(request, response) {
    const clonedResponse = response.clone();
    caches.open(PAGE_CACHE_NAME)
        .then(cache => cache.put(request, clonedResponse));
    return response;
}
