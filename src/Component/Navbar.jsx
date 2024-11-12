import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Chef from '../assests/image/chef.png';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    setIsRegistered(localStorage.getItem('isRegistered') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('userName');
    setIsRegistered(false);
    setIsDropdownOpen(false);
    navigate('/')
  };

  return (
    <nav className="bg-white shadow-lg fixed z-50 top-0 left-0 w-full">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src={Chef} alt="Chef Logo" className="h-10 w-10 mr-2" />
            <a href="/" className="text-2xl font-bold text-red-500">DineSmart</a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-lg font-medium">Home</a>
            {/* <a href="/about" className="text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-lg font-medium">About</a> */}
            <a href="/add-restaurant" className="text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-lg font-medium">Add Restaurant</a>
            {isRegistered ? (
              <div className="relative">
                <FaUserCircle
                  className="text-gray-800 text-2xl cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signup" className="bg-red-600 text-white px-3 py-2 rounded-md text-lg font-medium hover:bg-red-700 transition duration-300">Sign Up</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
