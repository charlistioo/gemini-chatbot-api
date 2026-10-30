const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const sendButton = chatForm.querySelector('button[type="submit"]');

// Stores the conversation history for multi-turn chat
const conversation = [];

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const messageText = userInput.value.trim();
  if (!messageText) return;

  // 1. Add user message to UI and history
  appendMessage('user', messageText);
  conversation.push({ role: 'user', text: messageText });

  // Clear input and disable controls while waiting for AI response
  userInput.value = '';
  userInput.disabled = true;
  if (sendButton) sendButton.disabled = true;

  // 2. Show temporary "Thinking..." bot message
  const botMessageElement = appendMessage('bot', 'Thinking...');

  try {
    // 3. Send conversation history to the backend endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ conversation })
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();

    // 4. Replace "Thinking..." with AI response or fallback error
    if (data && typeof data.result === 'string' && data.result.trim()) {
      botMessageElement.textContent = data.result;
      conversation.push({ role: 'model', text: data.result });
    } else {
      botMessageElement.textContent = 'Sorry, no response received.';
      // Revert the unresponded user turn so history remains in sync
      conversation.pop();
    }
  } catch (error) {
    console.error('Chat error:', error);
    botMessageElement.textContent = 'Failed to get response from server.';
    // Revert user message from conversation on failure
    conversation.pop();
  } finally {
    // Re-enable form controls and refocus input
    userInput.disabled = false;
    if (sendButton) sendButton.disabled = false;
    userInput.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

/**
 * Creates and appends a chat message element into the chat box
 * @param {'user' | 'bot'} sender
 * @param {string} text
 * @returns {HTMLDivElement}
 */
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.style.clear = 'both';
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}
