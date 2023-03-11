//import './style.scss';

document.addEventListener('DOMContentLoaded', function() {
  // Get button and text inputs
  const getResponseButton = document.getElementById('get-response');
  const promptInput = document.getElementById('promptInput');
  const responseInput = document.getElementById('response');

  // Add event listener to button
  getResponseButton.addEventListener('click', async () => {
    // Load ChatGPT class from background script
    const response = await new Promise(resolve => chrome.runtime.sendMessage({ type: 'getChatGPT', prompt: promptInput.value }, resolve));

    // Log the response variable to the console
    console.log(response);

    // Set response value
    responseInput.value = response;
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'response') {
      // Set response value
      responseInput.value = message.data;
    }
  });
});
