import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/chat', { query });
      console.log(res)
      setResponse(res.data);
    } catch (error) {
      setResponse({ message: "An error occurred." });
    }
  };

  return (
    <div className="chat-bot-container">
      <h1 className="chat-bot-heading">Food Chatbot</h1>
      <form className="chat-bot-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about a food item..."
          className="chat-bot-input"
        />
        <button type="submit" className="chat-bot-button">Ask</button>
      </form>
      {response && (
        <div className="chat-bot-response">
          {response.food_name ? (
            <div className="chat-bot-food-info">
              <h2 className="chat-bot-food-name">{response.food_name}</h2>
              <p className="chat-bot-category"><strong>Category:</strong> {response.category}</p>
              <p className="chat-bot-description"><strong>Description:</strong> {response.description}</p>
              <p className="chat-bot-taste"><strong>Taste:</strong> {response.taste}</p>
              {response.photo && (
                <img 
                  src={response.photo} 
                  alt={response.food_name} 
                  className="chat-bot-photo" 
                />
              )}
            </div>
          ) : (
            <p className="chat-bot-message">{response.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Chatbot;
