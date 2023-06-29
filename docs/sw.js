/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-148cb7e5'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "011-didache",
    "revision": "c83fd979bffafa828c8ffad0d00d132c"
  }, {
    "url": "1k-interlinear",
    "revision": "199b995fd82394a7a5df0a32845db32c"
  }, {
    "url": "about",
    "revision": "4aa09d73710a82538239095e7993ca9e"
  }, {
    "url": "astro/011-didache.3b46af41.css",
    "revision": null
  }, {
    "url": "astro/hoisted.60dba1fd.js",
    "revision": null
  }, {
    "url": "astro/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "boy-temple",
    "revision": "44e31d2930840686841f2f3db962bc7e"
  }, {
    "url": "default.css",
    "revision": "8180bdd118a9e9b5e75a009dd152b3cc"
  }, {
    "url": "drawing.svg",
    "revision": "8f84a06cf8f000b077f96247420e73da"
  }, {
    "url": "favicon.svg",
    "revision": "8c13f40658976ea1dfb8ba37a8be0e8d"
  }, {
    "url": "incarnation-interlinear",
    "revision": "1ca7d9c6c85667a9e8a4896dde99d0e2"
  }, {
    "url": "/rouse-greek-boy-pwa/",
    "revision": "1bfa4067f44bd5b9183288f0ee2996d8"
  }, {
    "url": "lgpsi-001",
    "revision": "f9bfe52f00678113b9c4366c7215b337"
  }, {
    "url": "lgpsi-002",
    "revision": "0a844290f13b2819ecf043fcc124e889"
  }, {
    "url": "lgpsi-003",
    "revision": "6b9737110581ba44cb473cd821ff31bd"
  }, {
    "url": "lysias-24",
    "revision": "4f1e08e2377b890641daa612ddc8bbd5"
  }, {
    "url": "pwa-192-192.png",
    "revision": "50e920258500ecf9e66fcf220ba818f1"
  }, {
    "url": "pwa-512-512.png",
    "revision": "8edcdbd527eb7806b6ea88e710f912c5"
  }, {
    "url": "registerSW.js",
    "revision": "875b58700297f8f71df54a9efb030d9c"
  }, {
    "url": "rouse_corrected_text",
    "revision": "7a31bd506b6d1a040274c2349288fc54"
  }, {
    "url": "favicon.svg",
    "revision": "8c13f40658976ea1dfb8ba37a8be0e8d"
  }, {
    "url": "manifest.webmanifest",
    "revision": "90deee1148f2ceb262d55540d962ef0d"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/404")));

}));
