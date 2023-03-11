/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chatgpt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatgpt.js */ \"./src/chatgpt.js\");\n/* harmony import */ var _chatgpt_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chatgpt_js__WEBPACK_IMPORTED_MODULE_0__);\n\nchrome.runtime.onMessage.addListener((request, sender, sendResponse) => {\n  if (request.type === 'getChatGPT') {\n    chrome.storage.sync.get(['apiKey', 'promptLength', 'temperature', 'maxTokens'], ({\n      apiKey,\n      promptLength,\n      temperature,\n      maxTokens\n    }) => {\n      const chat = new (_chatgpt_js__WEBPACK_IMPORTED_MODULE_0___default())();\n      chat.getChatResponse(request.prompt, apiKey, promptLength, temperature, maxTokens).then(response => {\n        sendMessageToPopup(response);\n      }).catch(error => {\n        console.log(error);\n      });\n    });\n    return true;\n  }\n});\nfunction sendMessageToPopup(data) {\n  chrome.runtime.sendMessage({\n    type: 'response',\n    data\n  });\n}\n\n//# sourceURL=webpack:///./src/background.js?");

/***/ }),

/***/ "./src/chatgpt.js":
/*!************************!*\
  !*** ./src/chatgpt.js ***!
  \************************/
/***/ ((module) => {

eval("class ChatGPT {\n  async getChatResponse(promptInput, apiKey, promptLength, temperature, maxTokens) {\n    // API endpoint for getting chat response\n    const endpoint = 'https://api.openai.com/v1/chat/completions';\n    // Construct request data\n    const data = {\n      model: \"gpt-3.5-turbo\",\n      messages: [{\n        \"role\": \"user\",\n        \"content\": promptInput\n      }]\n    };\n\n    // Send POST request to API endpoint\n    const response = await fetch(endpoint, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + apiKey\n      },\n      body: JSON.stringify(data)\n    });\n\n    // Parse response as JSON\n    const responseData = await response.json();\n    // console.log(promptInput);\n    // Extract and return chat response\n    const chatResponse = responseData.choices[0].message.content;\n    //console.log(chatResponse);\n    // Send chat response back to content script\n    return chatResponse;\n  }\n}\nmodule.exports = ChatGPT;\n\n//# sourceURL=webpack:///./src/chatgpt.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/background.js");
/******/ 	
/******/ })()
;