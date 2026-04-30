const CACHE_NAME = 'scholarite-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/main.js',
    '/casier.js',
    '/notes.js',
    '/appel.js',
    '/journal.js'
];

// Installation : Mise en cache des fichiers
self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Récupération : Servir depuis le cache si hors-ligne
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
