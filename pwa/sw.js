const staticCacheName = 'markme';
const assets = [
  '/',
  '/style.css',
  '/script.js',
  '/help',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.2/styles/night-owl.min.css',
  'https://code.jquery.com/jquery-3.5.1.slim.min.js',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.2/highlight.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap',
  'https://rsms.me/inter/inter.css',
  'https://fonts.gstatic.com/s/ibmplexmono/v5/-F6qfjptAgt5VM-kVkqdyU8n3oQIwlBFgg.woff2',
  'https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap',
  'https://markme.glitch.me/manifest.json',
  'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap',
  'https://cdn.jsdelivr.net/npm/vue',
  'https://unpkg.com/v-tooltip',
  'https://cdn.jsdelivr.net/npm/dompurify@2.0.12/dist/purify.min.js',
  'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
  'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&display=swap',
  'https://unpkg.com/prettier@2.0.5/standalone.js',
  'https://unpkg.com/prettier@2.0.5/parser-html.js',
  'https://cdn.jsdelivr.net/gh/kyle-rb/simplecopy/simplecopy.min.js',
  'https://kit.fontawesome.com/98f54f160f.js'
  
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});