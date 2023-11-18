import React, { useState, useEffect, useRef } from 'react';
import './TutoringSession.css';
import axios from 'axios';
import ProfilePicture from './components/ProfilePicture';

const TutoringSession = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showResponseButtons, setShowResponseButtons] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const initialMessageSentRef = useRef(false);

  // Send message to ChatGPT via your backend
  const sendMessageToChatGPT = async (message, isInitialMessage = false, isControlMessage = false) => {
    try {
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant', 
        content: msg.text
      }));

      const response = await axios.post('http://localhost:3001/api/chat', {
        messages: [...formattedHistory, { role: 'user', content: message }]
      });

      const aiResponse = response['data']['choices'][0]['message']['content'];
      // Add response to chat history, excluding control messages and the initial prompt
      setChatHistory(prev => [
        ...prev, 
        ...((isControlMessage || isInitialMessage) ? [] : [{ sender: 'user', text: message }]), 
        { sender: 'assistant', text: aiResponse }
      ]);

      if (isInitialMessage) {
        setShowResponseButtons(true); // Show buttons after the initial message
      }
    } catch (error) {
      console.error('Error communicating with ChatGPT:', error);
    }
  };

  // Function to handle button clicks and user queries
  const handleButtonClick = (responseType) => {
    sendMessageToChatGPT(responseType, false, true);
  };

  const handleUserQuerySubmit = () => {
    if (userQuery.trim()) {
      sendMessageToChatGPT(userQuery);
      setUserQuery(''); // Clear input field
    }
  };

  // Initialize ChatGPT session on component mount
  useEffect(() => {
    const initialPrompt = "Give me a full tutorial on IB chemistry topic ideal gases. THIS IS YOUR MAIN TOPIC. Break it down into multiple replies. After each reply, wait for my response. If I say okay, proceed with the lesson. And keep prompting me for an understanding. If I say not okay, explain the topic more in depth, then continue with the lesson. I can also ask you a specific question, in which case answer and elaborate to the best you can before checking for my understanding. If I say okay continue with the lesson. In either case, make sure the lesson continue. Also, make it sound as if you are a private tutor. In your first message introduce yourself briefly as an AI tutor (TuitiveBot) and treat it as if you are talking to the student directly. Also, do not veer of topic and if the student ask innaprpriate questions say you cannot answer and continue with the topic. Remember, if I say Okay, assume and just continue with the overall lesson about ideal gases from where you last left off.";

    if (!initialMessageSentRef.current) {
      sendMessageToChatGPT(initialPrompt, true);
      initialMessageSentRef.current = true;
    }
  }, []);

  return (
    <div>
      <h2>Topic for today: IB Chemistry Chapter 6 - Ideal Gases 🧪</h2>
      <div className="chat-window">
        {chatHistory.map((msg, index) => (
          <p key={index} className={msg.sender === 'assistant' ? 'ai-message' : 'user-message'}>
            {msg.text}
          </p>
        ))}
      </div>
      {showResponseButtons && (
        <div>
          <div className="response-buttons">
            <button onClick={() => handleButtonClick("Okay")}>Please Continue</button>
            <button onClick={() => handleButtonClick("Not okay")}>Please Elaborate</button>
          </div>
          <div className="user-query-section">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Ask a specific question..."
            />
            <button onClick={handleUserQuerySubmit}>Submit Question</button>
      <ProfilePicture />
          </div>
        </div>
      )}
    </div>
  );
};

export default TutoringSession;
