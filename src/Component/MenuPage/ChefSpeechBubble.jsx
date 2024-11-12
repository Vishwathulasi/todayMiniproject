import React from 'react';
import pic from '../../Picture/image.png';

const ChefSpeechBubble = () => {
  return (
    <div className="relative flex items-center">
      <img
        src={pic}
        alt="Chef"
        className="h-16 mb-6 rounded-full transition-transform transform hover:scale-110 duration-900"
      />
      <div className="bubble-text">
        <p>
          Welcome to our restaurant! If you have a doubt, you can ask my chat friend.
        </p>
      </div>
    </div>
  );
};

export default ChefSpeechBubble;
