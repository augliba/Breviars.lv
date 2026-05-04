const ver = "2.101";
const CACHE_NAME = "v"+ver;
const  vs = ""+ver; // versija pastāvīga
const urlsToCache = [
  '/',
  '/index.html?v=' + vs,
  '/credit.html',
  '/copyright.html',
  '/css/calendar.css?v=' + vs,
  '/css/style.css?v=' + vs,
  '/js/template_liturgy.js?v=' + vs,
  '/js/script.js?v=' + vs,
  '/js/pieminasdienas.js?v=' + vs,
  '/js/standartabloki.js?v=' + vs,
  '/js/komplet.js?v=' + vs,
  '/js/lugsana_pll_sv.js?v=' + vs,
  '/js/psalmi.js?v=' + vs,
  '/js/himnas.js?v=' + vs,
  '/js/himnasLatin.js?v=' + vs,
  '/js/parastais.js?v=' + vs,
  '/js/officium.js?v=' + vs,
  '/js/advents.js?v=' + vs,
  '/js/ziemassvetki.js?v=' + vs,
  '/js/gavenis.js?v=' + vs,
  '/js/lieldienas.js?v=' + vs,
  '/js/festum.js?v=' + vs,
  '/js/tools.js?v=' + vs,
  '/js/liturgiskaisgads.js?v=' + vs,
  '/js/calendar.js?v=' + vs,
  '/img/Cloth_BG.png',
  '/img/Cube-loading.svg',
  '/img/Lacing.png',
  '/img/Logo_Gold_200.png',
  '/src/EBGaramond12-Regular.ttf'
];

/*   */

// Install event: Cache the app shell and other assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error('Failed to open cache:', error);
      })
  );
});

// Fetch event: Serve assets from cache if available, otherwise fetch from network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // Return the cached version
        }
        return fetch(event.request);
      })
      .catch(function(error) {
        console.error('Fetch failed:', error);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      // Take control of the page immediately
      return self.clients.claim();
    })
  );
});