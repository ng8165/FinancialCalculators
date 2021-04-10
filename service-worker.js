// Code from https://developers.google.com/web/fundamentals/primers/service-workers

const calculatorCache = 'tax-yield-calc-v2';
const cachedURLs = [
  "/tax-yield-calc/",
  "/tax-yield-calc/index.html",
  "/tax-yield-calc/css/style.css",
  "/tax-yield-calc/js/app.js",
  "/tax-yield-calc/images/favicon.png",
  "/tax-yield-calc/images/icon-192.png",
  "/tax-yield-calc/images/icon-512.png",
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(calculatorCache)
      .then(function(cache) {
        console.log('[ServiceWorker] Cache Opened');
        return cache.addAll(cachedURLs);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          console.log('[ServiceWorker] Found Cache, Returning Cached Value');
          return response;
        }

        console.log('[ServiceWorker] Cache Not Found, Retrieving From Web');
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheAllowlist = ['tax-yield-calc-v2'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log('[ServiceWorker] Deleting Old Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});