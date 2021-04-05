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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var canvas = document.getElementById('app');\r\nvar ctx = canvas.getContext('2d');\r\n// canvas.width = document.body.clientWidth\r\n// canvas.height = document.body.clientHeight\r\ncanvas.width = window.innerWidth;\r\ncanvas.height = window.innerWidth;\r\nvar render = function (coordinates) {\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n    coordinates.map(drawDot);\r\n    coordinates.forEach(function (dot1) {\r\n        ctx.beginPath();\r\n        ctx.moveTo(dot1.x, dot1.y);\r\n        coordinates.forEach(function (dot2) {\r\n            var dist = Math.sqrt(Math.pow((dot1.x - dot2.x), 2) + Math.pow((dot1.y - dot2.y), 2));\r\n            if (dist <= 150) {\r\n                ctx.lineTo(dot2.x, dot2.y);\r\n                ctx.strokeStyle = \"rgba(\" + Math.random() * 256 + \", \" + Math.random() * 256 + \", \" + Math.random() * 256 + \", 1)\";\r\n                ctx.stroke();\r\n            }\r\n        });\r\n    });\r\n};\r\nvar drawDot = function (set) {\r\n    ctx.beginPath();\r\n    ctx.arc(set.x, set.y, 2, 0, 2 * Math.PI, true);\r\n    ctx.fill();\r\n};\r\nvar fillCoordsArray = function (num) {\r\n    if (num === void 0) { num = 100; }\r\n    var coords = [];\r\n    for (var i = 0; i < num; i++) {\r\n        coords.push(generateCoords());\r\n    }\r\n    return coords;\r\n};\r\nvar generateCoords = function () {\r\n    var _a = [0, 0], x = _a[0], y = _a[1];\r\n    x = Math.random() * canvas.width;\r\n    y = Math.random() * canvas.height;\r\n    return { x: x, y: y };\r\n};\r\nvar move = function (coordinates) {\r\n    coordinates.forEach(function (dot) {\r\n        var vx = Math.floor(Math.random() * 60) - 30;\r\n        var vy = Math.floor(Math.random() * 60) - 30;\r\n        if (dot.x < 0 || dot.x > canvas.width) {\r\n            vx = -vx;\r\n        }\r\n        if (dot.y < 0 || dot.y > canvas.height) {\r\n            vy = -vy;\r\n        }\r\n        dot.x += vx / 60;\r\n        dot.y += vy / 60;\r\n    });\r\n};\r\nvar letsFuckinGo = function (coordinates) {\r\n    render(coordinates);\r\n    move(coordinates);\r\n    requestAnimationFrame(function () { return letsFuckinGo(coordinates); });\r\n};\r\nvar coords = fillCoordsArray(500);\r\nletsFuckinGo(coords);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });