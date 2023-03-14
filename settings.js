document.addEventListener('DOMContentLoaded', function() {
  // Load saved settings from chrome storage
  function save_options() {
    // Retrieve the updated values from the input fields
    const apiKey = document.getElementById("apiKey").value;
    const promptLength = parseInt(document.getElementById("promptLength").value);
    const temperature = parseFloat(document.getElementById("temperature").value);
    const maxTokens = parseInt(document.getElementById("maxTokens").value);
    
    // Save the updated values to Chrome storage
    chrome.storage.sync.set({
      apiKey: apiKey,
      promptLength: promptLength,
      temperature: temperature,
      maxTokens: maxTokens
    }, function() {
      // Notify the user that the settings have been saved
      const status = document.getElementById("status");
      status.textContent = "Settings saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 3000);
    });
  }


  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(["apiKey", "promptLength", "temperature", "maxTokens"], function(items) {
        const apiKeyEl = document.getElementById("apiKey");
        if (apiKeyEl) apiKeyEl.value = items.apiKey || "";
        
        const lengthEl = document.getElementById("promptLength");
        if (lengthEl) lengthEl.value = items.promptLength || "";

        const temperatureEl = document.getElementById("temperature");
        if (temperatureEl) temperatureEl.value = items.temperature || "";

        const maxTokensEl = document.getElementById("maxTokens");
        if (maxTokensEl) maxTokensEl.value = items.maxTokens || "";
  
      });
  }

  // Bind the save_options function to the form submit event
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      save_options();
    });
  }
  // Restore saved options on page load
  restore_options();
});
