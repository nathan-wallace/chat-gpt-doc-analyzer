import ChatGPT from './chatgpt.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getChatGPT') {
    chrome.storage.sync.get(['apiKey', 'promptLength', 'temperature', 'maxTokens'], ({ apiKey, promptLength, temperature, maxTokens }) => {
      const chat = new ChatGPT();
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
