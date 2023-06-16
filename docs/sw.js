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
    "url": "1k-interlinear",
    "revision": "0bb1b234fea278ecf00ea41430ac0595"
  }, {
    "url": "about",
    "revision": "274d16c1123a801cdf02a04bea6ba150"
  }, {
    "url": "astro/1k-interlinear.3b46af41.css",
    "revision": null
  }, {
    "url": "astro/hoisted.60dba1fd.js",
    "revision": null
  }, {
    "url": "astro/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "boy-temple",
    "revision": "5052e930bbdc97acfa6d5063c3b569c6"
  }, {
    "url": "default.css",
    "revision": "8180bdd118a9e9b5e75a009dd152b3cc"
  }, {
    "url": "drawing.svg",
    "revision": "1447a5f19c1524daddc774789e4fb2ec"
  }, {
    "url": "favicon.svg",
    "revision": "8c13f40658976ea1dfb8ba37a8be0e8d"
  }, {
    "url": "incarnation-interlinear",
    "revision": "312e6420c78bbbfe6769a2dfc1b9bc49"
  }, {
    "url": "/rouse-greek-boy-pwa/",
    "revision": "6295e8ad7e7d1fa18cd6f00e6ba3b473"
  }, {
    "url": "lgpsi-001",
    "revision": "7bd01889f7eda5e2f7979dd5a5a803ef"
  }, {
    "url": "lgpsi-002",
    "revision": "e05582a20cf21e2298359814d50feea5"
  }, {
    "url": "lgpsi-003",
    "revision": "21a518d202ccbcdb905776090afc8d1d"
  }, {
    "url": "lysias-24",
    "revision": "e4187ae3798e9dc4ea13ce5fa7655342"
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
    "revision": "58770d26fefabd1ea9966584908166c2"
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
