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
    "url": "astro/_slug_.a2007327.css",
    "revision": null
  }, {
    "url": "astro/hoisted.c7f6add3.js",
    "revision": null
  }, {
    "url": "astro/index.3b46af41.css",
    "revision": null
  }, {
    "url": "astro/workbox-window.prod.es5.dc90f814.js",
    "revision": null
  }, {
    "url": "default.css",
    "revision": "dc717548eed6406483fcb4c1055ddc3a"
  }, {
    "url": "favicon.svg",
    "revision": "8c13f40658976ea1dfb8ba37a8be0e8d"
  }, {
    "url": "/rouse-greek-boy-pwa/",
    "revision": "f2cf2dc2aca20d305c46ca4b0f327fe6"
  }, {
    "url": "registerSW.js",
    "revision": "8aa7118324cae3660deca891768312cc"
  }, {
    "url": "rouse_corrected_text",
    "revision": "4f41a968207eb97b74022b81115d4b95"
  }, {
    "url": "text/01-on-the-incarnation",
    "revision": "827b9a912e5f2a4585ab200116ea97ae"
  }, {
    "url": "text/02-on-the-incarnation",
    "revision": "8b82eb589a7aedbd5d50f6da943c18f4"
  }, {
    "url": "text",
    "revision": "5f658a3ee1fd3e1b91fb18e1562e62be"
  }, {
    "url": "favicon.svg",
    "revision": "8c13f40658976ea1dfb8ba37a8be0e8d"
  }, {
    "url": "manifest.webmanifest",
    "revision": "98df69c56b031b338d1a3f50714e7474"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/404")));

}));
