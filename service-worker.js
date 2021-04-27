// Code from https://developers.google.com/web/fundamentals/primers/service-workers

const calculatorCache = 'FinancialCalculatorsCache-v3.0.3';
const cachedURLs = [
  "/FinancialCalculators/",
  "/FinancialCalculators/teycalc.html",
  "/FinancialCalculators/mortgagecalc.html",
  "/FinancialCalculators/css/style.css",
  "/FinancialCalculators/js/app.js",
  "/FinancialCalculators/js/teycalc.js",
  "/FinancialCalculators/js/mortgagecalc.js",
  "/FinancialCalculators/images/favicon.png",
  "/FinancialCalculators/images/icon-192.png",
  "/FinancialCalculators/images/icon-512.png",
  "/FinancialCalculators/images/pandas/panda-drawing-1.png",
  "/FinancialCalculators/images/pandas/panda-drawing-2.png"
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  
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
  var cacheAllowlist = ['FinancialCalculatorsCache-v3.0.3'];

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