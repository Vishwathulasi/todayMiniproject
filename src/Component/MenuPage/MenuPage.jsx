import React, { useState, useEffect } from 'react';
import HeaderPage from './HeaderPage';
import CategoryCard from './MenuCategories'; // Ensure the correct import for your CategoryCard
import sampleVideo from '../../Picture/Video.mp4';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Fetch data from FastAPI
  useEffect(() => {
    fetch('http://127.0.0.1:8000/menu-items')  // Your FastAPI URL
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data);
        // Extract unique categories from the data, excluding null or undefined values
        const uniqueCategories = [...new Set(data.map(item => item.Category).filter(category => category !== null && category !== undefined))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching menu items:', error));
  }, []);

  const filteredItems = menuItems.filter(item =>
    (item['Food Item'] && item['Food Item'].toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.Category && item.Category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedItems = (items) => {
    switch (sortOption) {
      case 'price-asc':
        return [...items].sort((a, b) => a['Price (INR)'] - b['Price (INR)']);
      case 'price-desc':
        return [...items].sort((a, b) => b['Price (INR)'] - a['Price (INR)']);
      case 'rating-asc':
        return [...items].sort((a, b) => a.Rating - b.Rating);
      case 'rating-desc':
        return [...items].sort((a, b) => b.Rating - a.Rating);
      default:
        return items;
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <HeaderPage query={searchQuery} setQuery={setSearchQuery} />
      <div className="flex mt-9">
        <div className="w-2/4 p-4">
          <div className="bg-white rounded-xl shadow-lg">
            <video
              src={sampleVideo}
              autoPlay
              loop
              muted
              className="w-full h-auto rounded-t-lg" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold">Welcome to DineSmart!</h3>
              <p className="text-gray-500">
                Enjoy our exclusive dishes while watching the best culinary techniques!
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/4 p-4">
          <div className="flex justify-end mb-4">
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              value={sortOption}>
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>
          <div
            style={{
              maxHeight: '60vh', overflowY: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            className="scroll-container">
            {selectedCategory ? (
              <CategoryCard
                category={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortedItems={sortedItems} // Pass the sorting function
                menuItems={menuItems.filter(item => item.Category === selectedCategory)} // Filter menu items based on selected category
              />
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {searchQuery ? (
                  sortedItems(filteredItems).map((item) => (
                    <div key={item['Item ID']} className="p-4 bg-white rounded-xl shadow-lg">
                      <img src={item.Image} alt={item['Food Item']} className="h-32 w-full object-cover rounded-t-lg" />
                      <h3 className="text-lg font-bold mt-2">{item['Food Item']}</h3>
                      <p className="text-gray-700">Category: {item.Category}</p>
                      <p className="text-gray-700">Description: {item.Description}</p>
                      <p className="text-gray-700">Price: ₹{item['Price (INR)'] ? item['Price (INR)'] : 'N/A'}</p>
                      <p className="text-gray-700">Rating: {item.Rating ? item.Rating : 'N/A'}</p>
                      <p className="text-gray-700">Taste: {item.Taste}</p>
                    </div>
                  ))
                ) : (
                  categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategorySelect(category)}
                      className="p-4 bg-white rounded-xl shadow-lg hover:bg-gray-200">
                      <h2 className="text-center text-lg font-bold">{category}</h2>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
