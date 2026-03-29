const CACHE_NAME = 'nordic-globe-v3';
const ASSETS_CACHE = 'nordic-globe-assets-v3';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.png',
  '/logo.png',
  '/logo-icon.png',
  '/logo.svg',
  '/manifest.json',
  '/404.html'
];

const HTML_PAGES = [
  // Service pages
  '/myymalasiivous.html',
  '/toimistosiivous.html',
  '/kotisiivous.html',
  '/rakennussiivous.html',
  '/ikkunanpesu.html',
  '/loppusiivous.html',
  '/hinnat.html',
  '/ota-yhteytta.html',
  '/yhteystiedot.html',
  '/tietoa-meista.html',
  // City pages (Finnish)
  '/siivous-espoo.html',
  '/siivous-helsinki.html',
  '/siivous-vantaa.html',
  '/siivous-tampere.html',
  '/siivous-turku.html',
  '/siivous-jyvaskyla.html',
  '/siivous-kuopio.html',
  '/siivous-lahti.html',
  '/siivous-oulu.html',
  '/siivous-helsinki-seo.html',
  '/siivous-kallio.html',
  '/siivous-kamppi.html',
  // City pages (English)
  '/cleaning-espoo.html',
  '/cleaning-helsinki.html',
  '/cleaning-vantaa.html',
  '/cleaning-tampere.html',
  '/cleaning-turku.html',
  '/cleaning-jyvaskyla.html',
  '/cleaning-kuopio.html',
  '/cleaning-lahti.html',
  '/cleaning-oulu.html',
  // Language landing pages
  '/en/index.html',
  '/sv/index.html',
  '/no/index.html',
  '/da/index.html'
];

// Install: precache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS.concat(HTML_PAGES));
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== ASSETS_CACHE)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network First for HTML, Cache First for assets
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests except fonts and CDN assets
  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' ||
                 url.hostname === 'fonts.gstatic.com';
  const isCDN = url.hostname === 'cdnjs.cloudflare.com';

  if (!isSameOrigin && !isFont && !isCDN) return;

  // HTML pages: Network First
  if (request.headers.get('accept')?.includes('text/html') || request.url.endsWith('.html')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Static assets (CSS, JS, fonts, images): Cache First
  event.respondWith(cacheFirstStrategy(request));
});

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    // Fallback to 404 page for HTML requests
    const fallback = await caches.match('/404.html');
    if (fallback) return fallback;
    return new Response('Offline - sivua ei voitu ladata', {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Update cache in background
    fetchAndCache(request);
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(ASSETS_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('', { status: 408 });
  }
}

async function fetchAndCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(ASSETS_CACHE);
      cache.put(request, networkResponse.clone());
    }
  } catch (e) {
    // Silently fail - cached version is still served
  }
}
