import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-red-500">
              DineSmart
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-lg">
              Home
            </a>
            <a href="/recommend" className="text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-lg">
              recommend
            </a>
            <a href="/about" className="text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-lg ">
              About
            </a>
            <a href="/signup" className="text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-lg ">
              Add restaurants
            </a>
            <Link to="/loginform" className="bg-red-600 text-white px-3 py-2 rounded-md text-lg  hover:bg-red-700 transition duration-300">
              Sign In
            </Link>
          </div>
          <div className="flex md:hidden items-center">
            <button onClick={toggleMenu} className="text-gray-800 hover:text-red-500 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <a href="/" className="block text-center text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-base">
            Home
          </a>
          <a href="/about" className="block text-center text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-base ">
            About
          </a>
          <a href="/menu" className="block text-center text-gray-800 hover:text-red-500 px-3 py-2 rounded-md text-base ">
          Add restaurants
          </a>
          <a href="/loginform" className="block text-center text-gray-800 hover:text-red-500  px-3 py-2 rounded-md text-base ">
            Sign In
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
