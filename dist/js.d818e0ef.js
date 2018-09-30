// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"src/js/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemsContainer = exports.itemCategory = exports.itemPrice = exports.itemName = exports.itemForm = exports.entryQuantity = exports.totalMoney = exports.incomeForm = void 0;
// Entry money elements
var incomeForm = document.getElementById('add-incomes');
exports.incomeForm = incomeForm;
var totalMoney = document.getElementById('my-money');
exports.totalMoney = totalMoney;
var entryQuantity = document.getElementById('income-quantity'); // Item form elements

exports.entryQuantity = entryQuantity;
var itemForm = document.getElementById('add-expenses');
exports.itemForm = itemForm;
var itemName = document.getElementById('item-name');
exports.itemName = itemName;
var itemPrice = document.getElementById('item-price');
exports.itemPrice = itemPrice;
var itemCategory = document.getElementById('item-category');
exports.itemCategory = itemCategory;
var itemsContainer = document.getElementById('items-container');
exports.itemsContainer = itemsContainer;
},{}],"src/js/storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveData = exports.getData = void 0;

var getData = function getData(key) {
  var data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

exports.getData = getData;

var saveData = function saveData(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
};

exports.saveData = saveData;
},{}],"src/js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI = exports.resetValues = exports.render = exports.structure = exports.totalPrices = exports.incomesList = exports.items = void 0;

var _storage = require("./storage");

var _elements = require("./elements");

var items = (0, _storage.getData)('items') ? (0, _storage.getData)('items') : [];
exports.items = items;
var incomesList = (0, _storage.getData)('incomes') ? (0, _storage.getData)('incomes') : [];
exports.incomesList = incomesList;
var template;

var setCategoryIcon = function setCategoryIcon(category) {
  switch (category) {
    case 'Home':
      return {
        icon: "<i class='fas fa-home'></i>",
        color: "#1abc9c"
      };

    case 'Car':
      return {
        icon: "<i class='fas fa-car'></i>",
        color: "#3498db"
      };

    case 'Shopping':
      return {
        icon: "<i class='fas fa-weight-hanging'></i>",
        color: "#9b59b6"
      };

    case 'Entertainment':
      return {
        icon: "<i class='fas fa-tv'></i>",
        color: "#e74c3c"
      };

    case 'Clothes':
      return {
        icon: "<i class='fas fa-tshirt'></i>",
        color: "#f1c40f"
      };

    case 'Telephony':
      return {
        icon: "<i class='fas fa-phone'></i>",
        color: "#34495e"
      };

    case 'Other':
      return {
        icon: "<i class='fas fa-box'></i>",
        color: "#95a5a6"
      };

    default:
      return {
        icon: "<i class='fas fa-box'></i>",
        color: "#95a5a6"
      };
  }
};

var totalPrices = function totalPrices() {
  var itemsPrices = items.reduce(function (prev, current) {
    return Number(prev) + Number(current.price);
  }, 0);
  var incomesPrices = incomesList.reduce(function (prev, current) {
    return Number(prev) + Number(current.income);
  }, 0);
  return incomesPrices - itemsPrices;
};

exports.totalPrices = totalPrices;

var structure = function structure(e) {
  return "<div class=\"item\" style=\"background: ".concat(setCategoryIcon(e.category).color, "\">\n             <h2 class=\"item-price\"> $").concat(e.price, " </h2> \n             <p class=\"item-title\"> ").concat(e.name, "  </p>\n             <span class=\"item-category\">  ").concat(setCategoryIcon(e.category).icon, " </span>\n          </div>");
};

exports.structure = structure;

var render = function render() {
  _elements.itemsContainer.innerHTML = "";
  template = "";
  items.forEach(function (e) {
    template += structure(e);
    _elements.itemsContainer.innerHTML = template;
  });
};

exports.render = render;

var resetValues = function resetValues() {
  _elements.itemName.value = "";
  _elements.itemPrice.value = "";
  _elements.itemCategory.value = "Home";
};

exports.resetValues = resetValues;

var UI = function UI() {
  // Total money color
  _elements.totalMoney.textContent < 0 ? _elements.totalMoney.classList.add("alert") : _elements.totalMoney.classList.remove("alert");
};

exports.UI = UI;
},{"./storage":"src/js/storage.js","./elements":"src/js/elements.js"}],"src/js/index.js":[function(require,module,exports) {
"use strict";

var _elements = require("./elements");

var _utils = require("./utils");

var _storage = require("./storage");

// Import Local Storage functions
_elements.totalMoney.textContent = (0, _utils.totalPrices)(); // money entry

_elements.incomeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (typeof Number(_elements.entryQuantity.value) === "number" && _elements.entryQuantity.value > 0) {
    (0, _utils.UI)();

    _utils.incomesList.push({
      income: _elements.entryQuantity.value
    });

    (0, _storage.saveData)('incomes', _utils.incomesList);
    _elements.totalMoney.textContent = (0, _utils.totalPrices)();
    _elements.entryQuantity.value = "";
  } else {
    alert("Enter a valid format!");
  }
});

_utils.items ? (0, _utils.render)() : null;

_elements.itemForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (_elements.itemName.value.trim() && _elements.itemPrice.value.trim()) {
    _utils.items.push({
      name: _elements.itemName.value,
      price: _elements.itemPrice.value,
      category: _elements.itemCategory.value
    });

    _elements.totalMoney.textContent = _elements.totalMoney.textContent - _elements.itemPrice.value;
    (0, _utils.render)();
    (0, _utils.resetValues)();
    (0, _utils.UI)();
    (0, _storage.saveData)('items', _utils.items);
  }
});
},{"./elements":"src/js/elements.js","./utils":"src/js/utils.js","./storage":"src/js/storage.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53344" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.d818e0ef.map