import ChatGPT from './chatgpt.js';

// Define a variable to store the settings
let settings = null;

// Add a listener for the 'getChatGPT' message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getChatGPT') {
    getSettings()
      .then(settings => {
        const chat = new ChatGPT();
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