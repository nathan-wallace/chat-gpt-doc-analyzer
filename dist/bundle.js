/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./chatgpt.js":
/*!********************!*\
  !*** ./chatgpt.js ***!
  \********************/
/***/ ((module) => {

class ChatGPT {
    async getChatResponse(promptInput, apiKey, promptLength, temperature, maxTokens) {
        // API endpoint for getting chat response
        const endpoint = 'https://api.openai.com/v1/chat/completions';
        // Construct request data
        const data = {
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": promptInput}]
        };
    
        // Send POST request to API endpoint
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiKey
          },
          body: JSON.stringify(data)
        });
    
        // Parse response as JSON
        const responseData = await response.json();
       // console.log(promptInput);
        // Extract and return chat response
        const chatResponse = responseData.choices[0].message.content;
        //console.log(chatResponse);
        // Send chat response back to content script
        return chatResponse;
      }
}
module.exports = ChatGPT;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./background.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chatgpt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chatgpt.js */ "./chatgpt.js");
/* harmony import */ var _chatgpt_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chatgpt_js__WEBPACK_IMPORTED_MODULE_0__);


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getChatGPT') {
    chrome.storage.sync.get(['apiKey', 'promptLength', 'temperature', 'maxTokens'], ({ apiKey, promptLength, temperature, maxTokens }) => {
      const chat = new (_chatgpt_js__WEBPACK_IMPORTED_MODULE_0___default())();
      chat.getChatResponse(request.prompt, apiKey, promptLength, temperature, maxTokens)
      .then(response => {
        sendMessageToPopup(response);
      })
      .catch(error => {
        console.log(error);
      });
    });
    return true;
  }
});

function sendMessageToPopup(data) {
  chrome.runtime.sendMessage({ type: 'response', data });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map