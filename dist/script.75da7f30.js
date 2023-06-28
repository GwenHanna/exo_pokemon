// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"function.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardPokemon = cardPokemon;
exports.classSwitch = classSwitch;
exports.createCard = createCard;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createCard(name, types, srcImg, id) {
  var card = document.createElement('div');
  card.setAttribute('id', id);
  var typess = document.createElement('div');
  card.classList.add('card', name.toLowerCase());
  card.setAttribute('data-id', id);
  typess.classList.add('types-list');
  var title = document.createElement('h3');
  title.textContent = name;
  var image = document.createElement('img');
  image.setAttribute('src', srcImg);
  image.classList.add('img-pokemon-list');
  types.forEach(function (type) {
    var p = document.createElement('p');
    p.textContent = type.name;
    p.classList.add('type');
    typess.append(p);
    p.style.background = colours[type.name.toLowerCase()];
    console.log(colours + "." + type.name);
    console.log(colours[type.name]);
  });
  card.append(title);
  card.append(image);
  card.insertAdjacentElement('beforeend', typess);
  return card;
}
function cardPokemon(name, types, srcImg, hp, atack, def, evolution) {
  var template = "<div class=\"card-pokemon\">\n     <header class=\"head-pokemon \">\n       <h3 class=\"pokemon-title\">".concat(name, "</h3>\n       <span id=\"close\">\n           <svg fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"35px\"><title>window-close</title><path d=\"M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z\" /></svg>\n       </span>\n       </header>\n       <div class=\"contenu \">\n       <img class=\"pokemon-img\" src=\"").concat(srcImg, "\" alt=\"\">\n    <div class=\"data\">\n   \n    <table >\n        <tr >\n            <th>HP</th>\n            <td class=\"hp\">").concat(hp, "</td>\n        </tr>\n        <tr >\n            <th>Ataque</th>\n            <td class=\"atack\">").concat(atack, "</td>\n        </tr>\n        <tr class=\"def\">\n            <th>D\xE9fense</th>\n            <td class=\"atack\">").concat(def, "</td>\n        </tr>\n        <tr >\n            <th>Evolution</th>\n            <td class=\"evolution\" >\n            ");
  var _iterator = _createForOfIteratorHelper(evolution),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var evo = _step.value;
      template += evo.name;
      console.log(evo.name);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  template += "\n            </td>\n \n        </tr>\n    \n    \n    </table>\n    <div class=\"types\">\n    ";
  var _iterator2 = _createForOfIteratorHelper(types),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var type = _step2.value;
      template += "<p  style=\"background: ".concat(colours[type.name.toLowerCase()], ";\">").concat(type.name, "</p>");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  template += "\n    </div>\n    </div>\n    </div>\n     </div>";
  return template;
}
function classSwitch(element, classAdd, classRemove) {
  element.addClass(classAdd);
  element.removeClass(classRemove);
}
var colours = {
  normal: '#A8A77A',
  feu: '#EE8130',
  eau: '#6390F0',
  électrik: '#F7D02C',
  plante: '#7AC74C',
  glace: '#96D9D6',
  combat: '#C22E28',
  poison: '#A33EA1',
  sol: '#E2BF65',
  vol: '#A98FF3',
  psy: '#F95587',
  insecte: '#A6B91A',
  roche: '#B6A136',
  spectre: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  acier: '#B7B7CE',
  fée: '#D685AD'
};
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _function = require("./function.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var imgLoad = document.querySelector('.imgLoad');
setTimeout(function () {
  $('.body').removeClass('in-active');
  $('.load').addClass('in-active');
  var id = 120;
  $(document).ready(function () {
    var url = "https://pokebuildapi.fr/api/v1/pokemon/limit/".concat(id);
    var x = $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function success(data) {
        data.forEach(function (element, index) {
          var cards = (0, _function.createCard)(element.name, element.apiTypes, element.image, element.id);
          $('main').append(cards);
          console.log(element);
          $('form').on("submit", function (event) {
            event.preventDefault();
            var valueSearch = $('input').val();
            if (valueSearch.toUpperCase() == element.name.toUpperCase()) {
              $('form').addClass("in-active");
              (0, _function.classSwitch)($('main'), 'in-active', 'active');
              (0, _function.classSwitch)($('.pokemon'), 'active', 'in-active');
              $('.pokemon').append((0, _function.cardPokemon)(element.name, element.apiTypes, element.image, element.stats.HP, element.stats.attack, element.stats.defense, element.apiEvolutions));
              $('#close').click(function () {
                (0, _function.classSwitch)($('.pokemon'), 'in-active', 'active');
                (0, _function.classSwitch)($('main'), 'active', 'in-active');
                $('form').removeClass("in-active");
                $('.pokemon').empty();
              });
            }
          });
        });
        var cards = $('main').find('.card');
        var _iterator = _createForOfIteratorHelper(cards),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var card = _step.value;
            $(card).click(function (e) {
              var _this = this;
              e.preventDefault();
              console.log('ok');
              $('form').addClass("in-active");
              var container = $('.pokemon');
              (0, _function.classSwitch)($('main'), 'in-active', 'active');
              (0, _function.classSwitch)($('.pokemon'), 'active', 'in-active');
              x.responseJSON.forEach(function (element) {
                if (element.id === Number(_this.id)) {
                  console.log(element);
                  var _card = (0, _function.cardPokemon)(element.name, element.apiTypes, element.image, element.stats.HP, element.stats.attack, element.stats.defense, element.apiEvolutions);
                  container.append(_card);
                  $('#close').click(function () {
                    $('.pokemon').empty();
                    (0, _function.classSwitch)($('.pokemon'), 'in-active', 'active');
                    (0, _function.classSwitch)($('main'), 'active', 'in-active');
                    $('form').removeClass("in-active");
                  });
                }
              });
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      error: function error() {
        console.log('error');
      }
    });
  });
}, 2000);
},{"./function.js":"function.js"}],"../../../Users/HB/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49918" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../Users/HB/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map