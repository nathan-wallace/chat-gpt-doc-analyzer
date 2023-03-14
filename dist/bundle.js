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


// Define a variable to store the settings
let settings = null;

// Add a listener for the 'getChatGPT' message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getChatGPT') {
    getSettings()
      .then(settings => {
        const chat = new (_chatgpt_js__WEBPACK_IMPORTED_MODULE_0___default())();
        return chat.getChatResponse(request.prompt, settings.apiKey, settings.promptLength, settings.temperature, settings.maxTokens);
      })
      .then(response => {
        sendMessageToPopup(response);
        saveChatToStorage(request.prompt, response);
      })
      .catch(error => {
        console.log(error);
      });
    return true;
  } else if (request.type === 'resetSettings') {
    resetSettings(request.settings);
    return true;
  }
});

function sendMessageToPopup(data) {
  chrome.runtime.sendMessage({ type: 'response', data });
}
// Define a function to get settings
function getSettings() {
  if (settings) {
    resolve(settings);
  } else {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(['apiKey', 'promptLength', 'temperature', 'maxTokens'], ({ apiKey, promptLength, temperature, maxTokens }) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve({ apiKey, promptLength, temperature, maxTokens });
        }
      });
    });
  }
}

// Define a function to reset settings
function resetSettings(settings) {
  // Code to reset settings goes here
}

// Define a function to save the prompt and response to chrome.storage
function saveChatToStorage(prompt, response) {
  chrome.storage.sync.set({ prompt, response }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      console.log('Chat saved to storage');
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map