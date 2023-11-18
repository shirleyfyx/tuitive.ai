import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TutoringSession = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [apiSessionToken, setApiSessionToken] = useState(null);

  // Hardcoded context data
  const contextData = "IGCSE Syllabus content... Past Paper content... Solution content...";

  // Initialize ChatGPT session
  const initializeChatGPTSession = async () => {
    try {
      const response = await axios.post('https://api.openai.com/v1/davinci/codex/sessions', {}, {
        headers: {
          'Authorization': `Bearer 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`
        }
      });
      setApiSessionToken(response.data.id);
    } catch (error) {
      console.error('Error initializing ChatGPT session:', error);
    }
  };

  // Send message to ChatGPT
  const sendMessageToChatGPT = async (message) => {
    try {
      const response = await axios.post(`https://api.openai.com/v1/davinci/codex/sessions/${apiSessionToken}/messages`, {
        input: `${contextData}\n\n${message}`
      }, {
        headers: {
          'Authorization': `Bearer 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`
        }
      });

      const aiResponse = response.data.messages.at(-1).content.trim();
      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
    }
  };

  // Handle user input submission
  const handleUserInputSubmit = () => {
    if (!userInput.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'user', text: userInput }]);
    sendMessageToChatGPT(userInput);
    setUserInput(''); // Clear input field
  };

  // Initialize ChatGPT session on component mount
  useEffect(() => {
    initializeChatGPTSession();
  }, []);

  return (
    <div>
      <h2>Tutoring Session</h2>
      <div className="chat-window">
        {chatHistory.map((msg, index) => (
          <p key={index} className={msg.sender === 'ai' ? 'ai-message' : 'user-message'}>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your question or feedback..."
      />
      <button onClick={handleUserInputSubmit}>Send</button>
    </div>
  );
};

export default TutoringSession;
