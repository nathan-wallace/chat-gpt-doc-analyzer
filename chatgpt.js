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