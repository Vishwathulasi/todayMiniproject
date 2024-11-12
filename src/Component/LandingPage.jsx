
import React from 'react';
import foodthink from '../Picture/food-think.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate();
  const handleStart=()=>
  {
  navigate("/signup")
  }
  return (
    <div className="flex flex-col justify-center md:flex-row min-h-screen font-poppins bg-gray-100 px-3">
   
      <div className="flex flex-col  justify-center items-start w-full md:w-1/2 px-6 md:px-10 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-5xl md:text-6xl text-red-500">DineSmart</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6">
          Discover the best dishes at your favorite restaurants, powered by AI recommendations and real-time feedback. Scan the QR code, explore menus, and enjoy personalized dining experiences.
        </p>
        <button className="bg-red-600 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-red-700 transition duration-300 " onClick={handleStart}>
          Get Started
        </button>
      </div>
      <div className="w-full md:w-1/2  items-center justify-center hidden md:flex">
        <img
          src={foodthink}
          alt="Dining Experience"
          className="w-full md:w-3/4 rounded-lg"
        />
      </div>
      </div>
   
  );
};

export default LandingPage;
