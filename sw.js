const CACHE_NAME = "calc-v1";
const ASSETS = [
  "/calculadoras/",
  "/calculadoras/index.html",
  "/calculadoras/manifest.json",
  "/calculadoras/icons/icon-192.png",
  "/calculadoras/icons/icon-512.png"
];

// Instala e guarda arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Responde primeiro do cache, depois da rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
