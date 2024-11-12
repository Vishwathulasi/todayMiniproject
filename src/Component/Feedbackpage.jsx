import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import HeaderPage from './MenuPage/HeaderPage';
import { useNavigate } from 'react-router-dom';
const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch existing feedbacks when the component loads
    const existingFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(existingFeedbacks);
  }, []);
  function goHome(){
    navigate('/')
  }
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    if (!message || rating === 0) {
      setError('Please provide feedback and a rating.');
      return;
    }

    const newFeedback = {
      name: name.trim() || 'Anonymous',
      phone: phone.trim(),
      rating,
      message: message.trim(),
      date: new Date().toLocaleString(), // Save current date and time
    };

    const updatedFeedbacks = [newFeedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);

    // Store feedbacks in local storage
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));

    // Clear form fields
    setName('');
    setPhone('');
    setRating(0);
    setMessage('');
    setError('');
  };

  return (
    <div>
      <HeaderPage />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 px-4 border rounded-lg focus:outline-none border-gray-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Phone (Optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-3 px-4 border rounded-lg focus:outline-none border-gray-300"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your feedback"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full py-3 px-4 border rounded-lg focus:outline-none border-gray-300"
              ></textarea>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit Feedback
            </button>
          </form>

          {/* Button to open modal with all feedbacks */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 mt-6"
          >
            All Reviews
          </button>
          <button
              onClick={goHome}
              className="w-full py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
            >
              Back to home
            </button>
        </div>
      </div>

      {/* Modal for showing all reviews */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">All Reviews</h3>

            {/* Display all feedbacks */}
            <div className="max-h-64 overflow-y-auto">
              {feedbacks.length > 0 ? (
                feedbacks.map((fb, index) => (
                  <div key={index} className="border-b border-gray-300 py-4">
                    <p className="font-semibold text-gray-700">{fb.name}</p>
                    <p className="text-gray-600 text-sm mb-1">{fb.phone}</p>
                    <p className="text-gray-800">{fb.message}</p>
                    <div className="flex">
                      {[...Array(fb.rating)].map((_, i) => (
                        <FaStar key={i} size={18} className="text-yellow-500" />
                      ))}
                      {[...Array(5 - fb.rating)].map((_, i) => (
                        <FaStar key={i} size={18} className="text-gray-300" />
                      ))}
                    </div>
                    <p className="text-gray-500 text-xs mt-2">Posted on: {fb.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No feedbacks yet.</p>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 mt-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
