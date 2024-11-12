import React, { useState } from 'react';
import pic from '../../Picture/food-think.png';
import mic from '../../Picture/microphone-button-red-icon.webp';
import chatIcon from '../../Picture/bot-pic4.png';
import AIChatbox from './AiChatbox';
import RecommendChatbox from './RecommendChatbox';  // Import RecommendChatbox compon
import { useNavigate } from 'react-router-dom';
const HeaderPage = ({ query, setQuery }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [isRecommendChatboxOpen, setIsRecommendChatboxOpen] = useState(false); // State for RecommendChatbox
  const navigate = useNavigate();
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
    };
    recognition.start();
  };

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };
  const handlefeedback=()=>{
    console.log('hello')
    navigate('/feed-back-page')
  }
  const toggleRecommendChatbox = () => {
    setIsRecommendChatboxOpen(!isRecommendChatboxOpen);
  };

  return (
    <nav className="w-full flex flex-col sm:flex-row justify-between items-center py-2 px-4 sm:px-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white shadow-lg">
      <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
        <img src={pic} alt="Restaurant Logo" className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full" />
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">DineSmart</h1>
      </div>
      <div className="flex items-center w-full sm:w-auto bg-white rounded-full shadow-inner max-w-full sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search menu items..."
          className="flex-grow p-2 text-gray-700 rounded-l-full focus:outline-none text-sm sm:text-base"
        />
        <button
          onClick={handleVoiceSearch}
          className="flex items-center justify-center px-2 py-1 text-white rounded-r-full">
          <img src={mic} className="w-6 h-6 sm:w-8 sm:h-8" alt="microphone" />
        </button>
      </div>
      <button
        onClick={toggleChatbox}
        className="flex items-center justify-center p-1 -ml-3"
      >
        <div className="relative bg-white rounded-full">
          <img src={chatIcon} className="w-8 h-8 sm:w-10 sm:h-10" alt="AI Chatbot" />
        </div>
      </button>
      <button onClick={toggleRecommendChatbox} className="p-2 bg-blue-500 text-white rounded-lg ml-2">
        Recommend
      </button>
      <button onClick={handlefeedback}>Give feedback</button>
      {isChatboxOpen && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-lg max-w-sm w-full z-50">
          <AIChatbox onClose={toggleChatbox} />
        </div>
      )}
      {isRecommendChatboxOpen && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-lg max-w-sm w-full z-50">
          <RecommendChatbox onClose={toggleRecommendChatbox} />
        </div>
      )}
    </nav>
  );
};

export default HeaderPage;
