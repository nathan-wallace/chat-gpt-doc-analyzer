document.addEventListener('DOMContentLoaded', async function() {
  // Get button and text inputs
  const getResponseButton = document.getElementById('get-response');
  const promptInput = document.getElementById('promptInput');
  const responseInput = document.getElementById('response');
  const loaderContainer = document.getElementById('loader-container');

  // Define a function to load the chat from chrome.storage
  async function loadChatFromStorage() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(['prompt', 'response'], ({ prompt, response }) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          console.log(prompt, response);
          resolve({ prompt, response });
        }
      });
    });
  }

  // Get response and update response input field
  async function getResponse() {
    responseInput.value = '';
    loaderContainer.classList.remove('display-none');

    // Load ChatGPT class from background script
    const response = await new Promise(resolve => chrome.runtime.sendMessage({ type: 'getChatGPT', prompt: promptInput.value }, resolve));

    // Log the response variable to the console
    // console.log(response);

    // Set response value
    // responseInput.value = response;
  }

  // Load chat from storage and display prompt and response
  const { prompt, response } = await loadChatFromStorage();
  promptInput.value = prompt;
  responseInput.value = response;

  // Add event listener to button
  getResponseButton.addEventListener('click', async () => {
    await getResponse();
  });

  // Add event listener to form
  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await getResponse();
  });

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'response') {
      // Set response value
      loaderContainer.classList.add('display-none');
      responseInput.value = message.data;
    }
  });
});
