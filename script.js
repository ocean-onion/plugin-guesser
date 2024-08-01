document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('plugin-file', document.getElementById('plugin-file').files[0]);
    const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    document.getElementById('results').innerText = `Predicted features: ${result.features.join(', ')}`;
});

// Additional script for contact form
document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    alert(result.message);
});
// Chatbot functionality
document.getElementById('chatbot-toggle').addEventListener('click', () => {
    document.getElementById('chatbot').style.display = 'flex';
    document.getElementById('chatbot-toggle').style.display = 'none';
});

document.getElementById('chatbot-close').addEventListener('click', () => {
    document.getElementById('chatbot').style.display = 'none';
    document.getElementById('chatbot-toggle').style.display = 'block';
});

document.getElementById('chatbot-send').addEventListener('click', () => {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message) {
        addMessage('User', message);
        input.value = '';
        // Handle chatbot response
        getChatbotResponse(message);
    }
});

function addMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chatbot-message');
    messageContainer.innerHTML = `<strong>${sender}:</strong> ${message}`;
    document.getElementById('chatbot-messages').appendChild(messageContainer);
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}

function getChatbotResponse(message) {
    // Simple example responses
    let response = "I'm sorry, I don't understand.";
    if (message.toLowerCase().includes('hello')) {
        response = 'Hello! How can I assist you today?';
    } else if (message.toLowerCase().includes('ai model')) {
        response = 'Our AI model guesses the features of Minecraft plugins based on the uploaded plugin file.';
    } else if (message.toLowerCase().includes('upload')) {
        response = 'You can upload a Minecraft plugin file on the AI Model page to get feature predictions.';
    }

    setTimeout(() => addMessage('Chatbot', response), 500);
}
