// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"kYpTN":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d113fd8ce37f48ea";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"aenu9":[function(require,module,exports) {
// Import 'async' from 'regenerator-runtime' to enable asynchronous functionality with async/await.
// Import modules for the models and views of the application.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _modelJs = require("./model.js");
var _recipeViewJs = require("./views/recipeView.js");
var _recipeViewJsDefault = parcelHelpers.interopDefault(_recipeViewJs);
var _searchViewJs = require("./views/searchView.js");
var _searchViewJsDefault = parcelHelpers.interopDefault(_searchViewJs);
var _searchResultsViewJs = require("./views/searchResultsView.js");
var _searchResultsViewJsDefault = parcelHelpers.interopDefault(_searchResultsViewJs);
var _bookmarksViewJs = require("./views/bookmarks.View.js");
var _bookmarksViewJsDefault = parcelHelpers.interopDefault(_bookmarksViewJs);
var _addRecipeViewJs = require("./views/addRecipeView.js");
var _addRecipeViewJsDefault = parcelHelpers.interopDefault(_addRecipeViewJs);
var _paginationViewJs = require("./views/paginationView.js");
var _paginationViewJsDefault = parcelHelpers.interopDefault(_paginationViewJs);
// Import constant for modal close duration from 'config.js'.
var _configJs = require("./config.js");
// Select the recipe container element from the DOM.
const recipeContainer = document.querySelector(".recipe");
// Controller function to handle the rendering of a recipe.
const controlRecipe = async function() {
    try {
        // Extract the new hash value (remove the '#' symbol) from the URL.
        const newHash = window.location.hash.slice(1);
        if (!newHash) return;
        // Render the loading spinner on the recipe view.
        (0, _recipeViewJsDefault.default).renderSpinner();
        // Update the search results view and bookmarks view.
        (0, _searchResultsViewJsDefault.default).update(_modelJs.getSearchResultsPage());
        (0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmark);
        // Load the recipe data based on the hash value.
        await _modelJs.loadRecipe(newHash);
        // Render the recipe view with the loaded recipe data.
        (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
    } catch (err) {
        // Render an error message on the recipe view in case of any error.
        (0, _recipeViewJsDefault.default).renderError();
        console.error(err);
    }
};
// Controller function to handle search results.
const controlSearchResults = async function() {
    try {
        // Render the loading spinner on the search results view.
        (0, _searchResultsViewJsDefault.default).renderSpinner();
        // Get the search query from the search view.
        const query = (0, _searchViewJsDefault.default).getQuery();
        // If the query is empty, return.
        if (!query) return;
        // Load the search results based on the query.
        await _modelJs.loadSearchResults(query);
        // Render the search results view and pagination view.
        (0, _searchResultsViewJsDefault.default).render(_modelJs.getSearchResultsPage());
        (0, _paginationViewJsDefault.default).render(_modelJs.state.search);
    } catch (error) {
        console.log(error);
    }
};
// Controller function to handle pagination.
const controlPagination = function(goToPage) {
    // Render the search results for the specified page.
    (0, _searchResultsViewJsDefault.default).render(_modelJs.getSearchResultsPage(goToPage));
    // Render the pagination view.
    (0, _paginationViewJsDefault.default).render(_modelJs.state.search);
};
// Controller function to handle updating servings in the recipe.
const controlServings = function(newServings) {
    // Update the number of servings in the recipe model.
    _modelJs.updateServings(newServings);
    // Render the recipe view with updated servings.
    (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
};
// Controller function to add or remove a bookmark for a recipe.
const controlAddBookmark = function() {
    // Toggle the bookmark status of the recipe in the model.
    !_modelJs.state.recipe.bookmarked ? _modelJs.addBookmark(_modelJs.state.recipe) : _modelJs.removeBookmark(_modelJs.state.recipe);
    // Render the recipe view with updated bookmark status.
    (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
    // Render the bookmarks view with updated bookmarks.
    (0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmark);
};
// Controller function to load bookmarks.
const controlLoadBookmark = function() {
    // Render the bookmarks view with loaded bookmarks.
    (0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmark);
};
// Controller function to handle adding a new recipe.
const controlAddRecipe = async function(newRecipe) {
    try {
        // Render the loading spinner on the add recipe view.
        (0, _addRecipeViewJsDefault.default).renderSpinner();
        // Upload the new recipe to the server using the model.
        await _modelJs.uploadRecipe(newRecipe);
        // Render the recipe view with the uploaded recipe.
        (0, _recipeViewJsDefault.default).render(_modelJs.state.recipe);
        // Render a success message on the add recipe view.
        (0, _addRecipeViewJsDefault.default).renderMessage();
        // Render the bookmarks view with updated bookmarks.
        (0, _bookmarksViewJsDefault.default).render(_modelJs.state.bookmarks);
        // Update the URL hash to include the ID of the uploaded recipe.
        window.history.pushState(null, "", `#${_modelJs.state.recipe.id}`);
        // Close the add recipe modal after a certain duration.
        setTimeout(function() {
            (0, _addRecipeViewJsDefault.default).toggleWindow();
        }, (0, _configJs.MODAL_CLOSE_SEC) * 1000);
    } catch (err) {
        // Render an error message on the add recipe view in case of any error.
        (0, _addRecipeViewJsDefault.default).renderError(err.message);
    }
};
// Initialization function to set up event handlers for the views and models.
const init = function() {
    // Add event handler to render bookmarks on page load.
    (0, _bookmarksViewJsDefault.default).addHandlerRender(controlLoadBookmark);
    // Add event handler to handle search submission and results.
    (0, _searchViewJsDefault.default).addHandlerSearch(controlSearchResults);
    // Add event handler to render a recipe on page load or hash change.
    (0, _recipeViewJsDefault.default).addHandlerRender(controlRecipe);
    // Add event handler to update servings in the recipe view.
    (0, _recipeViewJsDefault.default).addHandlerUpdateServings(controlServings);
    // Add event handler to handle pagination clicks.
    (0, _paginationViewJsDefault.default).addHandlerClick(controlPagination);
    // Add event handler to handle bookmarking a recipe.
    (0, _recipeViewJsDefault.default).addHandlerBookmark(controlAddBookmark);
    // Add event handler to handle recipe upload.
    (0, _addRecipeViewJsDefault.default).addHandlerUpload(controlAddRecipe);
};
// Call the initialization function to set up the application.
init();

},{"./model.js":"Y4A21","./views/recipeView.js":"l60JC","./views/searchView.js":"9OQAM","./views/searchResultsView.js":"cXIN2","./views/bookmarks.View.js":"hgKPf","./views/addRecipeView.js":"i6DNj","./views/paginationView.js":"6z7bi","./config.js":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Y4A21":[function(require,module,exports) {
// Import constants from 'config.js' and 'helper.js' files.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>state);
parcelHelpers.export(exports, "loadRecipe", ()=>loadRecipe);
parcelHelpers.export(exports, "loadSearchResults", ()=>loadSearchResults);
parcelHelpers.export(exports, "getSearchResultsPage", ()=>getSearchResultsPage);
parcelHelpers.export(exports, "updateServings", ()=>updateServings);
parcelHelpers.export(exports, "addBookmark", ()=>addBookmark);
parcelHelpers.export(exports, "removeBookmark", ()=>removeBookmark);
parcelHelpers.export(exports, "uploadRecipe", ()=>uploadRecipe);
var _configJs = require("./config.js");
var _helperJs = require("./helper.js");
const setDataToRedis = async (key, data, db = 1)=>{
    JSONdata = JSON.stringify(data);
    //console.log(JSONdata);
    //console.log(key);
    try {
        const response = await fetch(`http://localhost:49999/set/${db}/${key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSONdata
        });
        if (response.ok) {
            console.log("Data set successfully in Redis");
            console.log(response);
        // Handle success (if needed)
        } else {
            console.error("Failed to set data in Redis");
            // Handle failure or error response (if needed)
            console.log(response);
        }
    } catch (error) {
        console.error("Error setting data:", error);
    // Handle other errors (if needed)
    }
};
// Example function to get data from Redis via the backend API
const getDataFromRedis = async (key, db)=>{
    try {
        const response = await fetch(`http://localhost:49999/get/${db}/${key}`);
        if (response.ok) {
            const data = await response.json();
            //console.log('Retrieved data from Redis:', data);
            return data;
        } else console.error("Failed to get data from Redis");
    } catch (error) {
        console.error("Error getting data:", error);
    // Handle other errors (if needed)
    }
};
// Example function to update data in Redis via the backend API
const updateDataInRedis = async (key, value, db = 1)=>{
    try {
        const response = await fetch(`http://localhost:49999/update/${db}/${key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: value
        });
        if (response.ok) {
            console.log("Data updated successfully in Redis");
            const data = await response.json();
            const results = data.array.forEach((string)=>{
                JSON.parse(string);
            });
            console.log(results);
            //console.log('Retrieved data from Redis:', data);
            return results;
        } else {
            console.error("Failed to update data in Redis");
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error("Error updating data:", error);
    // Handle other errors (if needed)
    }
};
// Example function to get query objects from Redis via the backend API
const getQueryObjectsFromRedis = async (key, db = 2)=>{
    //console.log(key);
    try {
        const response = await fetch(`http://localhost:49999/smembers/${db}/${key}`);
        if (response.ok) {
            const data = await response.json();
            //console.log('Retrieved query objects from Redis:', data);
            return data;
        // Use the retrieved data (if needed)
        } else console.error("Failed to get query objects from Redis");
    } catch (error) {
        console.error("Error getting query objects:", error);
    // Handle other errors (if needed)
    }
};
// Example function to set query objects to Redis via the backend API
const setQueryObjectsToRedis = async (key, value, db = 2)=>{
    const data = JSON.stringify(value);
    //console.log(data);
    try {
        const response = await fetch(`http://localhost:49999/sadd/${db}/${key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data // Adjust the body as needed
        });
        if (response.ok) console.log("Query objects set successfully in Redis");
        else console.error("Failed to set query objects in Redis");
    } catch (error) {
        console.error("Error setting query objects:", error);
    // Handle other errors (if needed)
    }
};
const existKeyInRedis = async (key, db)=>{
    try {
        const response = await fetch(`http://localhost:49999/exists/${db}/${key}`);
        if (response.ok) {
            const data = await response.json();
            //console.log(data.exists);
            return data.exists;
        } else throw new Error("Failed to check if key exists");
    } catch (error) {
        console.error("Error checking if key exists:", error);
        return false; // Handle or return a default value for the error
    }
};
const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        resultsPerPage: (0, _configJs.RES_PER_PAGE),
        page: 1
    },
    bookmark: []
};
const createRecipeObject = function(data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...recipe.key && {
            key: recipe.key
        }
    };
};
const loadRecipe = async function(idr) {
    try {
        let data;
        if (await existKeyInRedis(idr, 1)) {
            data = await getDataFromRedis(idr, 1);
            state.recipe = data;
        } else {
            data = await (0, _helperJs.AJAX)((0, _configJs.API_URL) + "" + idr);
            // Fetch the recipe data from the API using AJAX.
            // Extract relevant data from the response using object destructuring.
            const { id, title, publisher, servings, source_url, image_url, cooking_time, ingredients } = data.data.recipe;
            // Create a recipe object with extracted data and store it in the state.
            state.recipe = {
                id,
                title,
                publisher,
                servings,
                sourceUrl: source_url,
                image: image_url,
                cookingTime: cooking_time,
                ingredients
            };
            setDataToRedis(state.recipe.id, state.recipe); //f
        }
        // Check if the recipe is bookmarked and set the 'bookmarked' property accordingly.
        if (state.bookmark.some((bookmark)=>bookmark.id === idr)) state.recipe.bookmarked = true;
    } catch (error) {
        throw error;
    }
};
const loadSearchResults = async function(query) {
    // Store the search query in the state.
    state.search.query = query.toLocaleLowerCase();
    try {
        if (await existKeyInRedis(state.search.query.toLowerCase(), 2)) {
            const results = await getQueryObjectsFromRedis(state.search.query, 2) //check cache first then get the data from the cache
            ;
            state.search.results = results;
            console.log(results);
        } else {
            // Fetch the search results from the API using AJAX and the provided query.
            const data = await (0, _helperJs.AJAX)((0, _configJs.API_URL) + "?search=" + state.search.query);
            const results = data.data;
            // Map the received data to extract relevant information for each recipe.
            state.search.results = results.recipes.map((rec)=>{
                const { id, title, publisher, image_url } = rec;
                return {
                    id,
                    title,
                    publisher,
                    image: image_url
                };
            });
            // Store the search results in the cache.
            await setQueryObjectsToRedis(state.search.query, state.search.results, 2);
        }
    } catch (error) {
        throw error;
    }
};
const getSearchResultsPage = function(page = 1) {
    // Update the current search page in the state.
    state.search.page = page;
    // Calculate the start and end indices to slice the search results array.
    const start = (state.search.page - 1) * state.search.resultsPerPage;
    const end = state.search.page * state.search.resultsPerPage;
    // Return the sliced portion of search results for the specified page.
    return state.search.results.slice(start, end);
};
const updateServings = function(newServings) {
    // Map through the ingredients and adjust their quantities based on the new number of servings.
    state.recipe.ingredients.map((ing)=>{
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    });
    // Update the number of servings in the recipe in the state.
    state.recipe.servings = newServings;
};
const addBookmark = function(recipe) {
    // Add the recipe to the bookmark array in the state.
    state.bookmark.push(recipe);
    // Set the 'bookmarked' property of the recipe to true.
    state.recipe.bookmarked = true;
    // Persist the bookmarks in the local storage.
    persistBookmark();
};
const removeBookmark = function(recipe) {
    // Filter out the provided recipe from the bookmark array in the state.
    state.bookmark = state.bookmark.filter((res)=>res !== recipe);
    // Set the 'bookmarked' property of the recipe to false.
    state.recipe.bookmarked = false;
    // Persist the bookmarks in the local storage.
    persistBookmark();
};
/**
 * Saves the bookmark data to the browser's local storage.
 * It converts the 'state.bookmark' array into a JSON string and stores it in the local storage
 * under the key "bookmarks".
 */ const persistBookmark = function() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmark));
};
/**
 * Function to initialize the application by loading bookmarks from local storage.
 * This function should be called when the application starts.
 */ const init = function() {
    const storage = localStorage.getItem("bookmarks");
    if (storage) state.bookmark = JSON.parse(storage);
};
// Call the init function to initialize the application.
init();
const uploadRecipe = async function(newRecipe) {
    try {
        // Extract ingredients from the new recipe and format them for API request.
        const ingredients = Object.entries(newRecipe).filter((entry)=>entry[0].startsWith("ingredient") && entry[1] !== "").map((ing)=>{
            const ingArr = ing[1].split(",").map((el)=>el.trim());
            if (ingArr.length !== 3) throw new Error("Wrong ingredient format! Please use the correct format :)");
            const [quantity, unit, description] = ingArr;
            return {
                quantity: quantity ? +quantity : null,
                unit,
                description
            };
        });
        // Create a recipe object with the formatted data.
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        };
        // Upload the new recipe to the API using AJAX.
        const data = await (0, _helperJs.AJAX)(`${(0, _configJs.API_URL)}?key=${(0, _configJs.KEY)}`, recipe);
        // Create a recipe object from the API response and store it in the state.
        state.recipe = createRecipeObject(data);
        await setDataToRedis(state.recipe.id, state.recipe); //fire and forget cache setting
        addBookmark(state.recipe);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

},{"./config.js":"k5Hzs","./helper.js":"lVRAz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k5Hzs":[function(require,module,exports) {
/**
 * The base URL for the Recipe API.
 * @type {string}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "API_URL", ()=>API_URL);
parcelHelpers.export(exports, "KEY", ()=>KEY);
parcelHelpers.export(exports, "TIME_OUT", ()=>TIME_OUT);
parcelHelpers.export(exports, "NO_RECIPE", ()=>NO_RECIPE);
parcelHelpers.export(exports, "RES_PER_PAGE", ()=>RES_PER_PAGE);
parcelHelpers.export(exports, "MODAL_CLOSE_SEC", ()=>MODAL_CLOSE_SEC);
const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes/`;
const KEY = "ad998d8e-6312-495b-8686-4866cc09402c"; //should bre replaced with a valid key
const TIME_OUT = 10;
const NO_RECIPE = "We couldn't find that recipe...";
const RES_PER_PAGE = 10;
const MODAL_CLOSE_SEC = 2.5;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"lVRAz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AJAX", ()=>AJAX);
var _config = require("./config");
/**
 * Creates a promise that rejects after a specified duration if not resolved.
 * @param {number} s - The duration in seconds before the promise rejects.
 * @returns {Promise} - A promise that rejects after the specified duration.
 */ const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
const AJAX = async function(url, uploadData) {
    try {
        // Create the Fetch API request based on whether uploadData is provided.
        const fetchPro = uploadData ? fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uploadData)
        }) : fetch(url);
        // Race between the Fetch request and the timeout promise.
        const res = await Promise.race([
            fetchPro,
            timeout((0, _config.TIME_OUT))
        ]);
        // Parse the response data.
        const data = await res.json();
        // If the response is not ok, throw an error with the error message and status code.
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        // Return the parsed response data.
        return data;
    } catch (err) {
        // Re-throw any errors that occurred during the AJAX request.
        throw err;
    }
};

},{"./config":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l60JC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
var _regeneratorRuntime = require("regenerator-runtime");
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
/**
 * RecipeView class represents the view for displaying a recipe in the Forkify recipe application.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */ class RecipeView extends (0, _viewJsDefault.default) {
    /**
   * The parent element where the recipe view is rendered.
   * @type {HTMLElement}
   */ _parentElement = document.querySelector(".recipe");
    /**
   * Generates the markup for displaying the recipe details.
   * @returns {string} The HTML markup for displaying the recipe.
   * @protected
   * @override
   */ _generateMarkup() {
        const ingredientsHTML = this._markUpIngredient(this._data.ingredients);
        const recipeHTML = `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${(0, _iconsSvgDefault.default)}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${(0, _iconsSvgDefault.default)}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
          <span class="recipe__info-text">Servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings - 1}">
              <svg>
                <use href="${(0, _iconsSvgDefault.default)}#icon-minus-circle "></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings + 1}">
              <svg>
                <use href="${(0, _iconsSvgDefault.default)}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="recipe__user-generated">
          <svg>
            <use href="${(0, _iconsSvgDefault.default)}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${(0, _iconsSvgDefault.default)}#icon-bookmark${this._data.bookmarked ? "-fill" : ""}"></use>
          </svg>
        </button>
      </div>
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${ingredientsHTML}
        </ul>
      </div>
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${this._data.sourceUrl}">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${(0, _iconsSvgDefault.default)}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
        return recipeHTML;
    }
    /**
   * Generates the markup for displaying the list of ingredients.
   * @param {Array} ingredients - The array of ingredient objects.
   * @returns {string} The HTML markup for displaying the list of ingredients.
   * @private
   */ _markUpIngredient(ingredients) {
        return ingredients.map((ingredient)=>`
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${0, _iconsSvgDefault.default}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ingredient.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit || ""}</span>
              ${ingredient.description}
            </div>
          </li>
        `).join("");
    }
    /**
   * Adds an event listener for rendering the recipe view.
   * The view is rendered when the page loads or the hash in the URL changes.
   * @param {Function} handler - The handler function to be called when rendering the recipe view.
   */ addHandlerRender(handler) {
        [
            "hashchange",
            "load"
        ].forEach((ev)=>window.addEventListener(ev, handler));
    }
    /**
   * Adds an event listener for updating the number of servings.
   * @param {Function} handler - The handler function to be called when updating the servings.
   */ addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener("click", function(e) {
            const btn = e.target.closest(".btn--increase-servings");
            if (!btn) return;
            const { updateTo } = btn.dataset;
            if (+updateTo > 0) handler(+updateTo);
        });
    }
    /**
   * Adds an event listener for bookmarking the recipe.
   * @param {Function} handler - The handler function to be called when bookmarking the recipe.
   */ addHandlerBookmark(handler) {
        this._parentElement.addEventListener("click", function(e) {
            const btn = e.target.closest(".btn--bookmark");
            if (!btn) return;
            handler();
        });
    }
}
// Export an instance of the RecipeView class to be used throughout the application
exports.default = new RecipeView();

},{"url:../../img/icons.svg":"loVOp","regenerator-runtime":"dXNgZ","./View.js":"5cUXS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"loVOp":[function(require,module,exports) {
module.exports = require("9bcc84ee5d265e38").getBundleURL("hWUTQ") + "icons.dfd7a6db.svg" + "?" + Date.now();

},{"9bcc84ee5d265e38":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"dXNgZ":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var runtime = function(exports) {
    "use strict";
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    };
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        });
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: true
    });
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: true
    });
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        defineProperty(this, "_invoke", {
            value: enqueue
        });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method, or a missing .next mehtod, always terminate the
            // yield* loop.
            context.delegate = null;
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (methodName === "throw" && delegate.iterator["return"]) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);
                if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
            }
            if (methodName !== "return") {
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(0, module.exports));
try {
    regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = runtime;
    else Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"5cUXS":[function(require,module,exports) {
// Import the 'icons.svg' file from a specified URL (relative path).
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
// Import the 'NO_RECIPE' constant from the '../config' module.
var _config = require("../config");
class View {
    /**
   * Data object to be rendered on the DOM.
   * @type {Object | Object[]}
   * @private
   */ _data;
    /**
   * Default error message to display when rendering an error.
   * @type {string}
   * @private
   */ _errorMessage = (0, _config.NO_RECIPE);
    /**
   * Current message to display in the view.
   * @type {string}
   * @private
   */ _message = "";
    /**
   * Render the received object to the DOM.
   * @param {Object | Object[]} data - The data to be rendered (e.g. recipe).
   * @param {boolean} [render=true] - If false, creates markup string instead of rendering to the DOM.
   * @returns {undefined | string} - A markup string is returned if render=false.
   * @this {Object} - View instance.
   */ render(data, render = true) {
        // If data is empty or not provided, render an error message.
        if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
        // Store the data to be rendered.
        this._data = data;
        // Generate the markup based on the data.
        const markup = this._generateMarkup();
        // If render is set to false, return the markup string.
        if (!render) return markup;
        // Clear the parent element and insert the generated markup.
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    /**
   * Update the current view with new data.
   * @param {Object | Object[]} data - The updated data to be rendered on the DOM.
   */ update(data) {
        // Store the updated data.
        this._data = data;
        // Generate the new markup based on the updated data.
        const newMarkup = this._generateMarkup();
        // Create a new DOM fragment from the new markup.
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        // Retrieve all new and current elements for comparison.
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));
        // Compare and update changed text and attributes in the current DOM.
        newElements.forEach((newEl, i)=>{
            const curEl = curElements[i];
            // Updates changed TEXT
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") curEl.textContent = newEl.textContent;
            // Updates changed ATTRIBUTES
            if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach((attr)=>curEl.setAttribute(attr.name, attr.value));
        });
    }
    /**
   * Clear the content of the parent DOM element.
   * @private
   */ _clear() {
        this._parentElement.innerHTML = "";
    }
    /**
   * Render a spinner (loading indicator) on the DOM.
   */ renderSpinner() {
        const markup = `
      <div class="spinner">
        <svg>
          <use href="${(0, _iconsSvgDefault.default)}#icon-loader"></use>
        </svg>
      </div>
    `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    /**
   * Render an error message on the DOM.
   * @param {string} [message=this._errorMessage] - The error message to display.
   */ renderError(message = this._errorMessage) {
        const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${(0, _iconsSvgDefault.default)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    /**
   * Render a success message on the DOM.
   * @param {string} [message=SUCCESS_MESSAGE] - The success message to display.
   */ renderMessage(message = this._message) {
        const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${(0, _iconsSvgDefault.default)}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}
exports.default = View;

},{"url:../../img/icons.svg":"loVOp","../config":"k5Hzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9OQAM":[function(require,module,exports) {
/**
 * SearchView class represents the view for the search functionality in the Forkify recipe application.
 * It handles interactions with the search input and form, allowing users to enter a search query and submit it.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class SearchView {
    /**
   * The parent element where the search view is rendered.
   * @type {HTMLElement}
   * @private
   */ _parentElement = document.querySelector(".search");
    /**
   * Retrieves the search query entered by the user in the search input field.
   * After getting the query, it clears the input field for the next search.
   * @returns {string} The search query entered by the user.
   */ getQuery() {
        const query = this._parentElement.querySelector(".search__field").value;
        this._clearInput();
        return query;
    }
    /**
   * Private helper method to clear the search input field after the query is retrieved.
   * This keeps the search view tidy and ready for the next search.
   * @private
   */ _clearInput() {
        this._parentElement.querySelector(".search__field").value = "";
    }
    /**
   * Adds an event listener for the search form submission.
   * When the user submits the search form, the provided handler function will be called to handle the search functionality.
   * @param {Function} handler - The handler function to be called when the form is submitted.
   */ addHandlerSearch(handler) {
        this._parentElement.addEventListener("submit", function(e) {
            e.preventDefault();
            handler();
        });
    }
}
// Export an instance of the SearchView class to be used throughout the application
exports.default = new SearchView();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cXIN2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _previewViewJs = require("./previewView.js");
var _previewViewJsDefault = parcelHelpers.interopDefault(_previewViewJs);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
/**
 * ResultsView class represents the view for displaying search results in the Forkify recipe application.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */ class ResultsView extends (0, _viewJsDefault.default) {
    /**
   * The parent element where the search results view is rendered.
   * @type {HTMLElement}
   * @private
   */ _parentElement = document.querySelector(".results");
    /**
   * Generates the markup for displaying the search results.
   * It maps over the _data array and calls the previewView's render method to generate the markup for each search result.
   * The individual result markups are then joined together into a single string and returned.
   * @returns {string} The HTML markup for displaying the search results.
   * @protected
   * @override
   */ _generateMarkup() {
        return this._data.map((result)=>(0, _previewViewJsDefault.default).render(result, false)).join("");
    }
}
// Export an instance of the ResultsView class to be used throughout the application
exports.default = new ResultsView();

},{"./View.js":"5cUXS","./previewView.js":"1FDQ6","url:../../img/icons.svg":"loVOp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1FDQ6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _iconsSvg = require("url:../../img/icons.svg"); // Parcel 2
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
/**
 * PreviewView class represents the view for displaying recipe previews in the search results.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */ class PreviewView extends (0, _viewJsDefault.default) {
    /**
   * The parent element where the recipe preview view is rendered.
   * @type {string}
   * @private
   */ _parentElement = "";
    /**
   * Generates the markup for displaying a single recipe preview.
   * It uses the _data object to fill in the relevant information for the recipe.
   * The markup includes the recipe's image, title, publisher, and user-generated icon (if applicable).
   * If the recipe's ID matches the current URL hash, it will be marked as active with a special class.
   * @returns {string} The HTML markup for displaying the recipe preview.
   * @protected
   * @override
   */ _generateMarkup() {
        const id = window.location.hash.slice(1);
        return `
      <li class="preview">
        <a class="preview__link ${this._data.id === id ? "preview__link--active" : ""}" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${this._data.key ? "" : "hidden"}">
              <svg>
                <use href="${0, _iconsSvgDefault.default}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
    }
}
// Export an instance of the PreviewView class to be used throughout the application
exports.default = new PreviewView();

},{"./View.js":"5cUXS","url:../../img/icons.svg":"loVOp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hgKPf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _previewViewJs = require("./previewView.js");
var _previewViewJsDefault = parcelHelpers.interopDefault(_previewViewJs);
var _iconsSvg = require("url:../../img/icons.svg"); // Parcel 2
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
/**
 * BookmarksView class represents the view for displaying bookmarked recipes.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */ class BookmarksView extends (0, _viewJsDefault.default) {
    /**
   * The parent element where the bookmarked recipes view is rendered.
   * @type {HTMLElement}
   * @private
   */ _parentElement = document.querySelector(".bookmarks__list");
    /**
   * The error message to be displayed when there are no bookmarked recipes.
   * @type {string}
   * @protected
   */ _errorMessage = "No bookmarks yet.";
    /**
   * Adds an event listener for handling the rendering of bookmarked recipes.
   * When the page is loaded, the handler function is called to render the bookmarked recipes.
   * @param {Function} handler - The handler function to be called when rendering bookmarks.
   */ addHandlerRender(handler) {
        window.addEventListener("load", handler);
    }
    /**
   * Generates the markup for displaying bookmarked recipes.
   * It uses the _data object, which contains an array of bookmarked recipes,
   * and passes each bookmark to the previewView to generate the preview markup.
   * The preview markup for all bookmarks is then joined and returned as the result.
   * @returns {string} The HTML markup for displaying bookmarked recipes.
   * @protected
   * @override
   */ _generateMarkup() {
        return this._data.map((bookmark)=>(0, _previewViewJsDefault.default).render(bookmark, false)).join("");
    }
}
// Export an instance of the BookmarksView class to be used throughout the application
exports.default = new BookmarksView();

},{"./View.js":"5cUXS","./previewView.js":"1FDQ6","url:../../img/icons.svg":"loVOp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i6DNj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
/**
 * AddRecipeView class represents the view for uploading new recipes.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */ class AddRecipeView extends (0, _viewJsDefault.default) {
    /**
   * The parent element where the new recipe upload view is rendered.
   * @type {HTMLElement}
   * @private
   */ _parentElement = document.querySelector(".upload");
    /**
   * The success message to be displayed when a recipe is successfully uploaded.
   * @type {string}
   * @protected
   */ _message = "Recipe was successfully uploaded :)";
    /**
   * The window element that represents the add recipe modal.
   * @type {HTMLElement}
   * @private
   */ _window = document.querySelector(".add-recipe-window");
    /**
   * The overlay element used to hide the add recipe modal.
   * @type {HTMLElement}
   * @private
   */ _overlay = document.querySelector(".overlay");
    /**
   * The button element that opens the add recipe modal.
   * @type {HTMLElement}
   * @private
   */ _btnOpen = document.querySelector(".nav__btn--add-recipe");
    /**
   * The button element that closes the add recipe modal.
   * @type {HTMLElement}
   * @private
   */ _btnClose = document.querySelector(".btn--close-modal");
    /**
   * Constructor function for the AddRecipeView class.
   * Initializes event handlers to show and hide the add recipe modal.
   */ constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }
    /**
   * Toggles the visibility of the add recipe modal and overlay by adding or removing the 'hidden' class.
   */ toggleWindow() {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }
    /**
   * Adds an event listener to the button that opens the add recipe modal.
   * When the button is clicked, the toggleWindow method is called to show the modal.
   * @private
   */ _addHandlerShowWindow() {
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
    }
    /**
   * Adds event listeners to the button that closes the add recipe modal and the overlay element.
   * When either of these elements is clicked, the toggleWindow method is called to hide the modal.
   * @private
   */ _addHandlerHideWindow() {
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
        this._overlay.addEventListener("click", this.toggleWindow.bind(this));
    }
    /**
   * Adds an event listener for handling recipe upload form submission.
   * When the form is submitted, it prevents the default form submission behavior,
   * converts the form data to an object, and calls the handler function with the data.
   * @param {Function} handler - The handler function to be called when a recipe is uploaded.
   */ addHandlerUpload(handler) {
        this._parentElement.addEventListener("submit", function(e) {
            e.preventDefault();
            const dataArr = [
                ...new FormData(this)
            ];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }
    /**
   * Generates the markup for the add recipe view (currently empty).
   * This method is not implemented in this class since the add recipe view doesn't require any specific markup.
   * @returns {string} An empty string, as there is no markup to be generated for this view.
   * @protected
   * @override
   */ _generateMarkup() {
        return "";
    }
}
// Export an instance of the AddRecipeView class to be used throughout the application
exports.default = new AddRecipeView();

},{"./View.js":"5cUXS","url:../../img/icons.svg":"loVOp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6z7bi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./View.js");
var _viewJsDefault = parcelHelpers.interopDefault(_viewJs);
var _iconsSvg = require("url:../../img/icons.svg");
var _iconsSvgDefault = parcelHelpers.interopDefault(_iconsSvg);
/**
 * PaginationView class represents the view for displaying pagination buttons in the search results.
 * It extends the View class and inherits its methods for rendering data to the DOM.
 */ class PaginationView extends (0, _viewJsDefault.default) {
    /**
   * The parent element where the pagination buttons view is rendered.
   * @type {HTMLElement}
   * @private
   */ _parentElement = document.querySelector(".pagination");
    /**
   * Adds an event listener for handling clicks on the pagination buttons.
   * When a button is clicked, it finds the nearest button element with the class "btn--inline"
   * and retrieves the "goto" attribute value (page number) to handle the pagination.
   * @param {Function} handler - The handler function to be called when a pagination button is clicked.
   */ addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function(e) {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
    /**
   * Generates the markup for displaying the pagination buttons.
   * The markup includes previous and next buttons with their respective page numbers.
   * @returns {string} The HTML markup for displaying the pagination buttons.
   * @protected
   * @override
   */ _generateMarkup() {
        const { page, results, resultsPerPage } = this._data;
        const numPages = Math.ceil(results.length / resultsPerPage);
        if (numPages <= 1) return "";
        let markup = "";
        if (page > 1) markup += this.createPaginationButton(page - 1, "prev");
        if (page < numPages) markup += this.createPaginationButton(page + 1, "next");
        return markup;
    }
    /**
   * Creates a single pagination button with the specified page number and type (prev or next).
   * The button includes an SVG icon (arrow left or arrow right) and the page number.
   * @param {number} page - The page number for the button.
   * @param {string} type - The type of the button (prev or next).
   * @returns {string} The HTML markup for the pagination button.
   */ createPaginationButton(page, type) {
        return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        <svg class="search__icon">
          <use href="${0, _iconsSvgDefault.default}#icon-arrow-${type === "prev" ? "left" : "right"}"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `;
    }
}
// Export an instance of the PaginationView class to be used throughout the application
exports.default = new PaginationView();

},{"./View.js":"5cUXS","url:../../img/icons.svg":"loVOp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["kYpTN","aenu9"], "aenu9", "parcelRequire3a11")

//# sourceMappingURL=index.e37f48ea.js.map
