// Function to toggle the chatbot window
function toggleChatbot() {
    const chatbotContainer = document.querySelector(".chatbot-container");
    chatbotContainer.style.display = chatbotContainer.style.display === "none" ? "block" : "none";
}

// Function to send a message
function sendMessage() {
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();

    if (message) {
        // Display user message
        displayMessage(message, "user");

        // Get bot response
        const botResponse = getBotResponse(message);

        // Display bot response after a short delay
        setTimeout(() => {
            displayMessage(botResponse, "bot");
        }, 500);

        // Clear input
        input.value = "";
    }
}

// Function to display a message in the chat window
function displayMessage(message, sender) {
    const chatBody = document.getElementById("chatbot-body");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);

    // Scroll to the bottom of the chat window
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Function to get a response from the bot
function getBotResponse(message) {
    const lowerCaseMessage = message.toLowerCase();

    // Check for predefined responses
    for (const key in responses) {
        if (lowerCaseMessage.includes(key)) {
            return responses[key];
        }
    }

    // Default response
    return "I'm sorry, I didn't understand that. Can you please rephrase?";
}