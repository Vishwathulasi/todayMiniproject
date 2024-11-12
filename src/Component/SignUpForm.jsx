import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [fields, setFields] = useState({
    email: '',
    firstName: '',
    lastName: '',
    restaurantName: '',
    password: '',
  });
  const [passwordType, setPasswordType] = useState('password');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const registeredStatus = localStorage.getItem('isRegistered');
    if (registeredStatus) setIsRegistered(true);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
    const isValid = value.trim() !== '';
    setFieldErrors({ ...fieldErrors, [name]: !isValid });

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setFieldErrors({ ...fieldErrors, email: !emailRegex.test(value) });
    }
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(fields).some((value) => value.trim() === '');
    if (hasEmptyFields) {
      setFieldErrors({
        email: true,
        firstName: true,
        lastName: true,
        restaurantName: true,
        password: true,
      });
      return;
    }

    localStorage.setItem('isRegistered', 'true'); 
    localStorage.setItem('userName', fields.firstName); 
    setIsRegistered(true);
    navigate('/add-restaurant');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-screen-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register Your Restaurant</h2>
        <form onSubmit={handleSubmitButton} className="flex flex-col space-y-8">
          <input type="text" name="restaurantName" placeholder="Restaurant Name *" className="w-full py-3 pl-4 border border-gray-300 rounded-lg" value={fields.restaurantName} onChange={handleChange} />
          <input type="text" name="firstName" placeholder="First Name *" className="w-full py-3 pl-4 border border-gray-300 rounded-lg" value={fields.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name *" className="w-full py-3 pl-4 border border-gray-300 rounded-lg" value={fields.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email *" className="w-full py-3 pl-4 border border-gray-300 rounded-lg" value={fields.email} onChange={handleChange} />
          <div className="relative">
            <input type={passwordType} name="password" placeholder="Password *" className="w-full py-3 pl-4 border border-gray-300 rounded-lg" value={fields.password} onChange={handleChange} />
            {passwordType === 'password' ? (
              <FaEye className="absolute right-3 top-4 text-gray-400" onClick={togglePasswordVisibility} />
            ) : (
              <FaEyeSlash className="absolute right-3 top-4 text-gray-400" onClick={togglePasswordVisibility} />
            )}
          </div>
          <button type="submit" className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
