import React, { useState } from 'react';
import pic from '../../Picture/bot-pic4.png';

const AIChatbox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Send message to the old chatbot backend (same as in the old chatbot code)
    const response = await fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });
    const data = await response.json();
    console.log(data)

    // Check if data contains the expected fields (food_name, category, description, taste)
    if (data.food_name) {
      // Format the AI message to include all the food details
      const formattedMessage = `
        <strong>Food Name:</strong> ${data.food_name} <br/>
        <strong>Category:</strong> ${data.category} <br/>
        <strong>Description:</strong> ${data.description} <br/>
        <strong>Taste:</strong> ${data.taste} <br/>
        ${data.photo ? `<img src="${data.photo}" alt="${data.food_name}" style="max-width: 100%;" />` : ''}
      `;

      setMessages([...messages, { user: input, ai: formattedMessage }]);
    } else {
      // In case of a simple text response
      setMessages([...messages, { user: input, ai: data.message || 'No data found.' }]);
    }

    setInput(''); // Clear input after sending
  };

  return (
    <div className="flex flex-col h-[400px] w-[350px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <div className="text-sm font-semibold text-gray-700">Chat</div>
        <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
          &#10005;
        </button>
      </div>
      
      {/* Chat area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <img src={pic} alt="Smartbite Logo" className="mb-4 w-12 h-12" />
            <h2 className="text-lg font-semibold text-gray-700">SmartBite</h2>
            <p className="text-sm text-gray-500">Your everyday AI companion</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white text-sm rounded-lg p-2 max-w-xs">
                  {msg.user}
                </div>
              </div>
              <div className="flex justify-start mt-2">
                <div
                  className="bg-gray-200 text-gray-800 text-sm rounded-lg p-2 max-w-xs"
                  dangerouslySetInnerHTML={{ __html: msg.ai }} // Use innerHTML for formatted messages
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-2 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg text-black focus:outline-none text-sm"
          placeholder="Ask me anything or type '@'"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbox;
