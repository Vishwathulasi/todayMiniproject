import React, { useState } from 'react';
import ChefSpeechBubble from './ChefSpeechBubble';

const CategoryCard = ({ category, setSelectedCategory, sortedItems, menuItems }) => {
  console.log("category",category)
  console.log("ser",setSelectedCategory)
  console.log("sor",sortedItems)
  console.log("menu",menuItems)
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (item) => {
    if (favorites.includes(item.id)) {
      setFavorites(favorites.filter(fav => fav !== item.id));
    } else {
      setFavorites([...favorites, item.id]);
    }
  };

  // Filter and sort items based on selected category
  const items = sortedItems(menuItems); // Use sortedItems function to sort

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <div className="flex justify-center">
        <ChefSpeechBubble />
      </div>
      <h2 className="text-center text-lg font-bold mb-4">{category.name}</h2>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item['Item ID']} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
            <img src={item.Image} alt={item['Food Item']} className="w-10 h-10 rounded-full" />
            <p className="flex-1 text-gray-700 ml-4">{item['Food Item']}</p>
            <span className="font-semibold text-orange-600">
              ₹{item['Price (INR)'] ? item['Price (INR)'].toFixed(2) : 'N/A'}
            </span>
            <span className="text-sm text-gray-500">⭐ {item.Rating ? item.Rating : 'N/A'}</span>
            <button
              onClick={() => handleFavorite(item)}
              className={`ml-2 p-1 rounded-full ${favorites.includes(item['Item ID']) ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {favorites.includes(item['Item ID']) ? '★' : '☆'}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setSelectedCategory(null)}
        className="mt-4 p-2 w-full bg-orange-500 text-white rounded-lg hover:bg-orange-600"
      >
        Back to Categories
      </button>
    </div>
  );
};


export default CategoryCard;
