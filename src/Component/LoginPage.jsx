
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldFocus, setFieldFocus] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [errors, setErrors] = useState({ email: '', password: '' });



  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Validate email format
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Invalid email format';
    }

    // Validate password
    if (!password) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    // If no validation errors, proceed with form submission
    if (Object.keys(validationErrors).length === 0) {
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };


  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent the button's default behavior
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-9 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldFocus('email');
              }}
              className={`w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none ${errors.email
                  ? 'border-red-500' // Invalid email or empty field
                  : email.trim() !== ''
                    ? 'border-green-500' // Valid email
                    : 'border-gray-300'  // Default border color
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type={passwordType}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldFocus('password');
              }}
              className={`w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none ${errors.password
                  ? 'border-red-500' // Invalid password or empty field
                  : password.trim() !== ''
                    ? 'border-green-500' // Valid password
                    : 'border-gray-300'  // Default border color
                }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <button
              className="absolute right-3 top-4 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {passwordType === 'password' ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
          >
            LOGIN
          </button>
        </form>


        <p className="text-gray-500 text-center mt-4">Forgot your password?</p>
        <p className="text-gray-500 text-center mt-4">
          Don't have an account? <Link to="/signupform" className="text-red-600">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
