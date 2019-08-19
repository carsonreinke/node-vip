/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/google-charts/dist/googleCharts.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/google-charts/dist/googleCharts.esm.js ***!
  \*************************************************************/
/*! exports provided: default, GoogleCharts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GoogleCharts\", function() { return GoogleCharts; });\n/* googleCharts.js Version: 1.5.0 Built On: 2018-12-30 */\nconst loadScript = Symbol('loadScript');\nconst instance = Symbol('instance');\nlet _instance;\n\nclass GoogleChartsManager {\n    get [instance]() {\n        return _instance\n    }\n\n    set [instance](value) {\n        _instance = value;\n    }\n\n    constructor() {\n        if (this[instance]) {\n            return this[instance]\n        }\n\n        this[instance] = this;\n    }\n\n    reset() {\n        _instance = null;\n    }\n\n    [loadScript]() {\n        if (!this.scriptPromise) {\n            this.scriptPromise = new Promise(resolve => {\n                const body = document.getElementsByTagName('body')[0];\n                const script = document.createElement('script');\n                script.type = 'text/javascript';\n                script.onload = function() {\n                    GoogleCharts.api = window.google;\n                    GoogleCharts.api.charts.load('current', {\n                        packages: ['corechart', 'table'],\n                    });\n                    GoogleCharts.api.charts.setOnLoadCallback(() => {\n                        resolve();\n                    });\n                };\n                script.src = 'https://www.gstatic.com/charts/loader.js';\n                body.appendChild(script);\n            });\n        }\n        return this.scriptPromise\n    }\n\n    load(callback, type) {\n        return this[loadScript]().then(() => {\n            if (type) {\n                let config = {};\n                if (type instanceof Object) {\n                    config = type;\n                } else if (Array.isArray(type)) {\n                    config = { packages: type };\n                } else {\n                    config = { packages: [type] };\n                }\n                this.api.charts.load('current', config);\n                this.api.charts.setOnLoadCallback(callback);\n            } else {\n                if(typeof callback != 'function') {\n                    throw('callback must be a function');\n                } else {\n                    callback();               \n                }\n            }\n        })\n    }\n}\n\nconst GoogleCharts = new GoogleChartsManager();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GoogleChartsManager);\n\n\n\n//# sourceURL=webpack:///./node_modules/google-charts/dist/googleCharts.esm.js?");

/***/ }),

/***/ "./report.json":
/*!*********************!*\
  !*** ./report.json ***!
  \*********************/
/*! exports provided: entries, total, others, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"entries\\\":[\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"lodash\\\\\\\",\\\\\\\"score\\\\\\\":549131.8269891739,\\\\\\\"impact\\\\\\\":204556}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"inherits\\\\\\\",\\\\\\\"score\\\\\\\":414289.28513246775,\\\\\\\"impact\\\\\\\":237360}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"babel-runtime\\\\\\\",\\\\\\\"score\\\\\\\":381425.66242460907,\\\\\\\"impact\\\\\\\":58356}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"debug\\\\\\\",\\\\\\\"score\\\\\\\":343437.00990867615,\\\\\\\"impact\\\\\\\":201359}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"safe-buffer\\\\\\\",\\\\\\\"score\\\\\\\":328294.90177209675,\\\\\\\"impact\\\\\\\":238408}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"chalk\\\\\\\",\\\\\\\"score\\\\\\\":328130.66463184357,\\\\\\\"impact\\\\\\\":155526}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"regenerator-runtime\\\\\\\",\\\\\\\"score\\\\\\\":255001.2320632264,\\\\\\\"impact\\\\\\\":146554}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"core-js\\\\\\\",\\\\\\\"score\\\\\\\":244348.01468937844,\\\\\\\"impact\\\\\\\":141322}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"supports-color\\\\\\\",\\\\\\\"score\\\\\\\":233042.34911584854,\\\\\\\"impact\\\\\\\":157304}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"esutils\\\\\\\",\\\\\\\"score\\\\\\\":232106.07093906403,\\\\\\\"impact\\\\\\\":100960}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@babel/types\\\\\\\",\\\\\\\"score\\\\\\\":226280.58072662354,\\\\\\\"impact\\\\\\\":39729}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@babel/helper-plugin-utils\\\\\\\",\\\\\\\"score\\\\\\\":219883.98769378662,\\\\\\\"impact\\\\\\\":23023}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"ms\\\\\\\",\\\\\\\"score\\\\\\\":207553.10484600067,\\\\\\\"impact\\\\\\\":209190}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"semver\\\\\\\",\\\\\\\"score\\\\\\\":197935.466255188,\\\\\\\"impact\\\\\\\":157218}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"loose-envify\\\\\\\",\\\\\\\"score\\\\\\\":197298.3953704834,\\\\\\\"impact\\\\\\\":97995}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"object-assign\\\\\\\",\\\\\\\"score\\\\\\\":195249.49145138264,\\\\\\\"impact\\\\\\\":138884}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"escape-string-regexp\\\\\\\",\\\\\\\"score\\\\\\\":190506.02959680557,\\\\\\\"impact\\\\\\\":159191}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"source-map\\\\\\\",\\\\\\\"score\\\\\\\":182117.30323696136,\\\\\\\"impact\\\\\\\":113219}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"ansi-styles\\\\\\\",\\\\\\\"score\\\\\\\":181854.30100739002,\\\\\\\"impact\\\\\\\":172051}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"readable-stream\\\\\\\",\\\\\\\"score\\\\\\\":180354.27463573217,\\\\\\\"impact\\\\\\\":145305}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"once\\\\\\\",\\\\\\\"score\\\\\\\":176669.91985678673,\\\\\\\"impact\\\\\\\":176049}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"to-fast-properties\\\\\\\",\\\\\\\"score\\\\\\\":174297.18956375122,\\\\\\\"impact\\\\\\\":57855}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"prop-types\\\\\\\",\\\\\\\"score\\\\\\\":167670.28855895996,\\\\\\\"impact\\\\\\\":68947}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"minimist\\\\\\\",\\\\\\\"score\\\\\\\":167048.30668067932,\\\\\\\"impact\\\\\\\":186893}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"glob\\\\\\\",\\\\\\\"score\\\\\\\":157347.35992860794,\\\\\\\"impact\\\\\\\":157609}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"mkdirp\\\\\\\",\\\\\\\"score\\\\\\\":153254.5389137268,\\\\\\\"impact\\\\\\\":141494}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"underscore\\\\\\\",\\\\\\\"score\\\\\\\":141193.01372623444,\\\\\\\"impact\\\\\\\":36278}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"js-tokens\\\\\\\",\\\\\\\"score\\\\\\\":138102.236287117,\\\\\\\"impact\\\\\\\":134213}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"minimatch\\\\\\\",\\\\\\\"score\\\\\\\":136522.62014985085,\\\\\\\"impact\\\\\\\":166517}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"wrappy\\\\\\\",\\\\\\\"score\\\\\\\":130708.9195394516,\\\\\\\"impact\\\\\\\":176261}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"strip-ansi\\\\\\\",\\\\\\\"score\\\\\\\":123430.5438194871,\\\\\\\"impact\\\\\\\":121217}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"babel-types\\\\\\\",\\\\\\\"score\\\\\\\":121976.3062133789,\\\\\\\"impact\\\\\\\":27878}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"tslib\\\\\\\",\\\\\\\"score\\\\\\\":119458.02576446533,\\\\\\\"impact\\\\\\\":96918}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"graceful-fs\\\\\\\",\\\\\\\"score\\\\\\\":117549.94588851929,\\\\\\\"impact\\\\\\\":115665}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"has-flag\\\\\\\",\\\\\\\"score\\\\\\\":117078.34057354927,\\\\\\\"impact\\\\\\\":157329}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"react-is\\\\\\\",\\\\\\\"score\\\\\\\":108011.3964767456,\\\\\\\"impact\\\\\\\":72622}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"node-opcua-assert\\\\\\\",\\\\\\\"score\\\\\\\":107962.55502319336,\\\\\\\"impact\\\\\\\":90}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"mime-types\\\\\\\",\\\\\\\"score\\\\\\\":106685.64530944824,\\\\\\\"impact\\\\\\\":137957}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"postcss\\\\\\\",\\\\\\\"score\\\\\\\":102596.7734375,\\\\\\\"impact\\\\\\\":24865}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"rimraf\\\\\\\",\\\\\\\"score\\\\\\\":100311.83295822144,\\\\\\\"impact\\\\\\\":111816}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"string_decoder\\\\\\\",\\\\\\\"score\\\\\\\":96886.64952489734,\\\\\\\"impact\\\\\\\":145392}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"depd\\\\\\\",\\\\\\\"score\\\\\\\":96048.0774230957,\\\\\\\"impact\\\\\\\":71513}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@babel/runtime\\\\\\\",\\\\\\\"score\\\\\\\":96024.60767555237,\\\\\\\"impact\\\\\\\":53847}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"util-deprecate\\\\\\\",\\\\\\\"score\\\\\\\":95789.73836156726,\\\\\\\"impact\\\\\\\":153600}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"color-convert\\\\\\\",\\\\\\\"score\\\\\\\":94201.07074981928,\\\\\\\"impact\\\\\\\":182594}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"path-is-absolute\\\\\\\",\\\\\\\"score\\\\\\\":92099.89724946022,\\\\\\\"impact\\\\\\\":161146}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"qs\\\\\\\",\\\\\\\"score\\\\\\\":91764.3858089447,\\\\\\\"impact\\\\\\\":134934}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"bn.js\\\\\\\",\\\\\\\"score\\\\\\\":90436.92250585556,\\\\\\\"impact\\\\\\\":32503}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"string-width\\\\\\\",\\\\\\\"score\\\\\\\":87147.0961612463,\\\\\\\"impact\\\\\\\":116104}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"uuid\\\\\\\",\\\\\\\"score\\\\\\\":85251.19007110596,\\\\\\\"impact\\\\\\\":126871}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@babel/code-frame\\\\\\\",\\\\\\\"score\\\\\\\":82909.58275222778,\\\\\\\"impact\\\\\\\":72095}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"inflight\\\\\\\",\\\\\\\"score\\\\\\\":80573.13308930397,\\\\\\\"impact\\\\\\\":157619}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"statuses\\\\\\\",\\\\\\\"score\\\\\\\":79738.77470397949,\\\\\\\"impact\\\\\\\":65606}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"resolve\\\\\\\",\\\\\\\"score\\\\\\\":79701.22476792336,\\\\\\\"impact\\\\\\\":97772}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"fs.realpath\\\\\\\",\\\\\\\"score\\\\\\\":78837.67996430397,\\\\\\\"impact\\\\\\\":157629}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"commander\\\\\\\",\\\\\\\"score\\\\\\\":77673.80522346497,\\\\\\\"impact\\\\\\\":111174}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"through2\\\\\\\",\\\\\\\"score\\\\\\\":76908.61979305744,\\\\\\\"impact\\\\\\\":73728}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"async\\\\\\\",\\\\\\\"score\\\\\\\":76838.33088874817,\\\\\\\"impact\\\\\\\":95569}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"request\\\\\\\",\\\\\\\"score\\\\\\\":75361.3232421875,\\\\\\\"impact\\\\\\\":89774}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"on-finished\\\\\\\",\\\\\\\"score\\\\\\\":73311.44201660156,\\\\\\\"impact\\\\\\\":60329}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@babel/parser\\\\\\\",\\\\\\\"score\\\\\\\":71607.41838788986,\\\\\\\"impact\\\\\\\":37076}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"function-bind\\\\\\\",\\\\\\\"score\\\\\\\":71320.75166550092,\\\\\\\"impact\\\\\\\":81410}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"loader-utils\\\\\\\",\\\\\\\"score\\\\\\\":71210.92919921875,\\\\\\\"impact\\\\\\\":30378}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"ajv\\\\\\\",\\\\\\\"score\\\\\\\":71147.0361328125,\\\\\\\"impact\\\\\\\":114134}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"brace-expansion\\\\\\\",\\\\\\\"score\\\\\\\":68414.84132492542,\\\\\\\"impact\\\\\\\":166555}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"ansi-regex\\\\\\\",\\\\\\\"score\\\\\\\":68320.63458064198,\\\\\\\"impact\\\\\\\":124352}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"escape-html\\\\\\\",\\\\\\\"score\\\\\\\":67848.50280761719,\\\\\\\"impact\\\\\\\":60580}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"bluebird\\\\\\\",\\\\\\\"score\\\\\\\":66092.63882446289,\\\\\\\"impact\\\\\\\":72492}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"babylon\\\\\\\",\\\\\\\"score\\\\\\\":64124.90133666992,\\\\\\\"impact\\\\\\\":30407}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"json5\\\\\\\",\\\\\\\"score\\\\\\\":63815.11022949219,\\\\\\\"impact\\\\\\\":54734}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"type-fest\\\\\\\",\\\\\\\"score\\\\\\\":62555.59023189545,\\\\\\\"impact\\\\\\\":105980}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"punycode\\\\\\\",\\\\\\\"score\\\\\\\":61921.041301727295,\\\\\\\"impact\\\\\\\":132739}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"combined-stream\\\\\\\",\\\\\\\"score\\\\\\\":60799.99267578125,\\\\\\\"impact\\\\\\\":100644}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"better-assert\\\\\\\",\\\\\\\"score\\\\\\\":60547.49040222168,\\\\\\\"impact\\\\\\\":12930}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"encodeurl\\\\\\\",\\\\\\\"score\\\\\\\":60253.69989013672,\\\\\\\"impact\\\\\\\":54591}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"find-up\\\\\\\",\\\\\\\"score\\\\\\\":58471.315546512604,\\\\\\\"impact\\\\\\\":102326}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"globals\\\\\\\",\\\\\\\"score\\\\\\\":57978.77772331238,\\\\\\\"impact\\\\\\\":52306}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"classnames\\\\\\\",\\\\\\\"score\\\\\\\":57031.59143066406,\\\\\\\"impact\\\\\\\":25198}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"mime-db\\\\\\\",\\\\\\\"score\\\\\\\":56797.14247894287,\\\\\\\"impact\\\\\\\":141929}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@babel/template\\\\\\\",\\\\\\\"score\\\\\\\":56447.239550590515,\\\\\\\"impact\\\\\\\":35624}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"assert-plus\\\\\\\",\\\\\\\"score\\\\\\\":56189.335510253906,\\\\\\\"impact\\\\\\\":92214}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"http-errors\\\\\\\",\\\\\\\"score\\\\\\\":55906.36459350586,\\\\\\\"impact\\\\\\\":64148}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"has\\\\\\\",\\\\\\\"score\\\\\\\":55182.385098230094,\\\\\\\"impact\\\\\\\":66092}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"parseurl\\\\\\\",\\\\\\\"score\\\\\\\":54975.14929199219,\\\\\\\"impact\\\\\\\":57026}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"extend\\\\\\\",\\\\\\\"score\\\\\\\":54748.153681755066,\\\\\\\"impact\\\\\\\":114959}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@types/node\\\\\\\",\\\\\\\"score\\\\\\\":54419.09391784668,\\\\\\\"impact\\\\\\\":76883}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"@phosphor/algorithm\\\\\\\",\\\\\\\"score\\\\\\\":54074.365478515625,\\\\\\\"impact\\\\\\\":1024}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"babel-traverse\\\\\\\",\\\\\\\"score\\\\\\\":53426.98181152344,\\\\\\\"impact\\\\\\\":21190}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"color-name\\\\\\\",\\\\\\\"score\\\\\\\":52920.00331047177,\\\\\\\"impact\\\\\\\":182721}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"babel-template\\\\\\\",\\\\\\\"score\\\\\\\":50278.123046875,\\\\\\\"impact\\\\\\\":20435}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"iconv-lite\\\\\\\",\\\\\\\"score\\\\\\\":49960.10544586182,\\\\\\\"impact\\\\\\\":113263}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"fs-extra\\\\\\\",\\\\\\\"score\\\\\\\":49903.72981262207,\\\\\\\"impact\\\\\\\":54352}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"object-keys\\\\\\\",\\\\\\\"score\\\\\\\":49628.036442533135,\\\\\\\"impact\\\\\\\":81270}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"invariant\\\\\\\",\\\\\\\"score\\\\\\\":49279.56814575195,\\\\\\\"impact\\\\\\\":46658}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"moment\\\\\\\",\\\\\\\"score\\\\\\\":48834.84240722656,\\\\\\\"impact\\\\\\\":45763}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"setprototypeof\\\\\\\",\\\\\\\"score\\\\\\\":47881.78044128418,\\\\\\\"impact\\\\\\\":64421}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"tough-cookie\\\\\\\",\\\\\\\"score\\\\\\\":47761.57556152344,\\\\\\\"impact\\\\\\\":92592}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"is-glob\\\\\\\",\\\\\\\"score\\\\\\\":47338.417308330536,\\\\\\\"impact\\\\\\\":77918}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"schema-utils\\\\\\\",\\\\\\\"score\\\\\\\":46996.60888671875,\\\\\\\"impact\\\\\\\":22533}\\\",\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"emoji-regex\\\\\\\",\\\\\\\"score\\\\\\\":46837.17515581846,\\\\\\\"impact\\\\\\\":117144}\\\"],\\\"total\\\":{\\\"score\\\":31376868.86245127,\\\"impact\\\":51769755},\\\"others\\\":{\\\"score\\\":19410001.15825186,\\\"impact\\\":41594982}}\");\n\n//# sourceURL=webpack:///./report.json?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var google_charts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! google-charts */ \"./node_modules/google-charts/dist/googleCharts.esm.js\");\n\n\nvar report = __webpack_require__(/*! ../report.json */ \"./report.json\");\n\ngoogle_charts__WEBPACK_IMPORTED_MODULE_0__[\"GoogleCharts\"].load(function () {\n  var data = new google_charts__WEBPACK_IMPORTED_MODULE_0__[\"GoogleCharts\"].api.visualization.DataTable();\n  data.addColumn('string', 'Package');\n  data.addColumn('number', 'Score');\n  report.entries.forEach(function (entry) {\n    data.addRow([entry.name, entry.score / report.total.score * 100.0]);\n  });\n  data.addRow(['Others', report.others.score / report.total.score * 100.0]);\n  var chart = new google_charts__WEBPACK_IMPORTED_MODULE_0__[\"GoogleCharts\"].api.visualization.PieChart(document.getElementById('chart'));\n  chart.draw(data);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });