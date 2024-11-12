import React, { useState } from 'react';
import { FaStore } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate=useNavigate();
  const [Restaurant,setRestaurant]=useState("")
  const handleRegister=()=>
  {
    if(Restaurant)
    navigate("/signupform")
  else
  {
    alert("Please Enter a Resturant name")
  }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Get Instant Access Now
        </h2>
        <div className="relative mb-6">
          <FaStore className="absolute left-3 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Restaurant Name"
            onChange={(e)=>setRestaurant(e.target)}
            className="w-full py-3 pl-10 pr-4 border border-red-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>
        <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300" onClick={handleRegister}>
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default SignUp;

