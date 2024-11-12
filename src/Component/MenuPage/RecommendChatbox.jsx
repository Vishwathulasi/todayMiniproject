import React, { useState } from 'react';
import './FoodRecommendation.css'; // Importing the CSS file

const FoodRecommendation = () => {
  const [dishName, setDishName] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [numRecommendations, setNumRecommendations] = useState(5);
  const [error, setError] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false); // State to control visibility

  const handleGetRecommendations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8002/recommend/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dish_name: dishName, num_recommendations: numRecommendations }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Check if data has the expected structure
      if (data.recommended_dishes) {
        setRecommendations(data.recommended_dishes);
        setShowRecommendations(true); // Show recommendations when fetched
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleCloseRecommendations = () => {
    setShowRecommendations(false); // Close recommendations container
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Food Recommendations</h1>
      <input
        type="text"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 mb-4 text-black"
        placeholder="Enter a dish name"
      />
      <button
        onClick={handleGetRecommendations}
        className="bg-blue-500 text-white rounded-lg p-2 mb-4 hover:bg-blue-600"
      >
        Get Recommendations
      </button>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      {showRecommendations && recommendations.length > 0 && (
        <div className="mt-4 recommendation-container relative"> {/* Add relative positioning */}
          <h2 className="text-xl font-semibold text-black text-center mb-4 p-4">Recommended Dishes:</h2>
          <button
            onClick={handleCloseRecommendations}
            className="absolute top-2 right-2 text-black" // Positioning the close icon
            aria-label="Close"
          >
            &#10005; {/* Close icon (cross) */}
          </button>
          <div className="scrollable-recommendations">
            {recommendations.map((dish, index) => (
              <div key={index} className="dish-container border border-gray-300 rounded-lg p-2 flex flex-col items-center">
                <img
                  src={dish.Image} // Ensure this path is correct
                  alt={dish['Food Item']}
                  className="object-cover mb-2 dish-image" // Image will resize based on container
                />
                <div className="dish-name text-black"> {/* Set dish name color to black */}
                  {dish['Food Item']}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRecommendation;
