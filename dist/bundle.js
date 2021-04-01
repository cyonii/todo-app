/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Todo - Task Manager</title>\n</head>\n\n<body>\n  <header>\n    <nav class=\"navbar navbar-light bg-light\">\n      <div class=\"container\">\n        <a class=\"navbar-brand d-flex align-items-center\" href=\"#\">\n          <i class=\"bi bi-card-checklist me-2\"></i>\n          <strong>ToDo</strong>\n        </a>\n      </div>\n    </nav>\n  </header>\n  <main>\n    <div class=\"container\">\n      <div class=\"row justify-content-center\">\n        <div class=\"col-sm-5 col-lg-3 py-4\">\n          <form class=\"row gx-1\">\n            <div class=\"col-8\">\n              <label class=\"visually-hidden\" for=\"project\">Project</label>\n              <input type=\"text\" class=\"form-control\" id=\"project\" placeholder=\"Project name\">\n            </div>\n\n            <div class=\"col-4\">\n              <button type=\"submit\" class=\"btn btn-primary\">Create</button>\n            </div>\n          </form>\n        </div>\n        <div class=\"col-sm-7 col-lg-5 py-4\">\n          <div class=\"d-flex\">\n            <button class=\"btn btn-primary ms-auto\">Add task</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n</body>\n\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/scss/bundle.scss":
/*!******************************!*\
  !*** ./src/scss/bundle.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/todo.js":
/*!************************!*\
  !*** ./src/js/todo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ToDo": () => (/* binding */ ToDo)
/* harmony export */ });
class Project {
  constructor(props) {
    this.name = props.name;
  }
}

class ToDo {
  constructor(props) {
    this.title = props.title;
    this.description = props.description;
    this.dueDate = props.dueDate;
    this.priority = props.priority;
    this.notes = props.notes;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _scss_bundle_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scss/bundle.scss */ "./src/scss/bundle.scss");
/* harmony import */ var _js_todo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/todo.js */ "./src/js/todo.js");




const project = new _js_todo_js__WEBPACK_IMPORTED_MODULE_2__.Project({ name: "General" });
const todo = new _js_todo_js__WEBPACK_IMPORTED_MODULE_2__.ToDo({
  title: "Build the UI",
  description: "Work on the UI of Komrades web app",
});

console.log(project);
console.log(todo);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map