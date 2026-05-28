"use strict";

// Versija tiek ņemta no viena kopīga faila.
// /js/version.js satur:
// self.BREVIARS_VERSION = "2.125";
importScripts("js/version.js");

const ver = self.BREVIARS_VERSION;
const CACHE_NAME = "breviars-v" + ver;
const vs = "" + ver;

if (!ver) {
  console.error("BREVIARS_VERSION nav definēts. Pārbaudi /js/version.js.");
}

// Faili, kas tiek saglabāti offline lietošanai.
const urlsToCache = [
	"./",
	"index.html",
	"credit.html",
	"copyright.html",
	"manifest.json",
	"favicon.ico",

  // Kopīgie vadības faili
	"js/version.js",
	"js/app-loader.js?v=" + vs,
	"js/pwa-controller.js?v=" + vs,

  // CSS ar versiju
	"css/calendar.css?v=" + vs,
	"css/style.css?v=" + vs,

  // Galvenie Breviāra JS faili ar versiju
	"js/himnas.js?v=" + vs,
	"js/himnasLatin.js?v=" + vs,
	"js/template_liturgy.js?v=" + vs,
	"js/script.js?v=" + vs,
	"js/pieminasdienas.js?v=" + vs,
	"js/standartabloki.js?v=" + vs,
	"js/komplet.js?v=" + vs,
	"js/lugsana_pll_sv.js?v=" + vs,
	"js/psalmi.js?v=" + vs,
	"js/parastais.js?v=" + vs,
	"js/officium.js?v=" + vs,
	"js/advents.js?v=" + vs,
	"js/ziemassvetki.js?v=" + vs,
	"js/gavenis.js?v=" + vs,
	"js/lieldienas.js?v=" + vs,
	"js/festum.js?v=" + vs,
	"js/tools.js?v=" + vs,
	"js/liturgiskaisgads.js?v=" + vs,
	"js/calendar.js?v=" + vs,

  // Attēli un fonti
	"img/Cloth_BG.png",
	"img/Cube-loading.svg",
	"img/Lacing.png",
	"img/Logo_Gold_200.png",
	"src/EBGaramond12-Regular.ttf"
];

// Šie faili vienmēr vispirms jāmēģina ņemt no tīkla,
// lai versijas un vadības loģika nenovecotu.
const networkFirstPaths = [
  "/",
  "/index.html",
  "/js/version.js",
  "/js/app-loader.js",
  "/js/pwa-controller.js",
  "/service-worker.js",
  "/manifest.json"
];

// Install – saglabājam aplikācijas pamata failus cache.
// Šeit neliekam automātisku self.skipWaiting(),
// jo atjaunošanu kontrolē poga “Atjaunot!” no pwa-controller.js.
self.addEventListener("install", function (event) {
  console.log("Service worker installing:", CACHE_NAME);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      })
      .then(function () {
        console.log("App shell cached:", CACHE_NAME);
		return self.skipWaiting();
      })
      .catch(function (error) {
        console.error("Failed to cache app shell:", error);
        throw error;
      })
  );
});

// Ziņa no pwa-controller.js.
// Kad lietotājs nospiež “Atjaunot!”, jaunais service worker aktivizējas.
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    console.log("SKIP_WAITING received.");
    self.skipWaiting();
  }
});

// Activate – dzēšam vecās cache versijas un pārņemam klientus.
self.addEventListener("activate", function (event) {
  console.log("Service worker activating:", CACHE_NAME);

  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }

            return Promise.resolve();
          })
        );
      })
      .then(function () {
        console.log("Service worker activated:", CACHE_NAME);
        return self.clients.claim();
      })
  );
});

// Fetch stratēģija:
// 1) HTML un vadības failiem – network first.
// 2) CSS/JS ar ?v=, attēliem un fontiem – cache first.
// 3) Ārējos resursus, piemēram Google Analytics, neaiztiekam.
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);

  // Neapstrādājam ārējos pieprasījumus.
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  // HTML navigācijas vienmēr mēģinām no tīkla.
  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Vadības faili – network first.
  if (networkFirstPaths.includes(requestUrl.pathname)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Pārējie statiskie faili – cache first.
  event.respondWith(cacheFirst(event.request));
});

// Network first:
// vispirms mēģina paņemt jaunu failu no servera,
// ja nav interneta – ņem no cache.
function networkFirst(request) {
  return fetch(request, { cache: "reload" })
    .then(function (networkResponse) {
      if (!isValidResponse(networkResponse)) {
        return networkResponse;
      }

      const responseCopy = networkResponse.clone();

      caches.open(CACHE_NAME)
        .then(function (cache) {
          cache.put(request, responseCopy);
        });

      return networkResponse;
    })
    .catch(function () {
      return caches.match(request)
        .then(function (cachedResponse) {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Ja pieprasīta lapa, bet konkrētā adrese nav cache,
          // dodam galveno lapu.
          if (request.mode === "navigate") {
            return caches.match("/") || caches.match("/index.html");
          }

          return undefined;
        });
    });
}

// Cache first:
// vispirms mēģina no cache,
// ja nav cache – ņem no tīkla un saglabā cache.
function cacheFirst(request) {
  return caches.match(request)
    .then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then(function (networkResponse) {
          if (!isValidResponse(networkResponse)) {
            return networkResponse;
          }

          const responseCopy = networkResponse.clone();

          caches.open(CACHE_NAME)
            .then(function (cache) {
              cache.put(request, responseCopy);
            });

          return networkResponse;
        });
    })
    .catch(function (error) {
      console.error("Fetch failed:", error);
      return undefined;
    });
}

// Derīga atbilde cache saglabāšanai.
function isValidResponse(response) {
  return response &&
         response.status === 200 &&
         response.type === "basic";
}