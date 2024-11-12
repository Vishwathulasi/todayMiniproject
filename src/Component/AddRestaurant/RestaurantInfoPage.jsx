// src/components/RestaurantInfoPage.js
import videoSrc from '../../assests/video/restaurant.mp4'
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import './RestaurantInfoPage.css';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar';
import Layout from './Layout';
import { useEffect } from 'react';

const RestaurantInfoPage = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurantName: '',
    restaurantNumber: '',
    restaurantEmail: '',
    address1: '',
    address2: '',
    city: '',
    landmark: ''
  });
  useEffect(() => {
    const savedRestaurantInfo = localStorage.getItem('restaurantInfo');
    if (savedRestaurantInfo) {
      setRestaurantInfo(JSON.parse(savedRestaurantInfo));
    }
  }, []);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleRestaurantInfoChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...restaurantInfo, [name]: value };
    setRestaurantInfo(updatedInfo);
    localStorage.setItem('restaurantInfo', JSON.stringify(updatedInfo));
  };

  const handleValidation = () => {
    const { restaurantName, restaurantNumber, restaurantEmail, address2 } = restaurantInfo;

    if (!restaurantName || !restaurantNumber || !restaurantEmail || !address2) {
      setSnackbarMessage("All fields marked with * are required.");
      setOpenSnackbar(true);
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(restaurantEmail)) {
      setSnackbarMessage("Please enter a valid email address.");
      setOpenSnackbar(true);
      return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(restaurantNumber)) {
      setSnackbarMessage("Phone number must be 10 digits.");
      setOpenSnackbar(true);
      return false;
    }

    return true;
  };

  const onNextClick = () => {
    if (handleValidation()) {
      navigate('/menu-details'); // Adjust this path as needed
    }
  };

  const onPreviousClick = () => {
    navigate('/add-restaurant'); // Adjust this path as needed
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Navbar/>
      <div className="restaurant-info-large-container">
      <div className="restaurant-info-layout-container">
        <Layout/>
      </div>
      <div className="restaurant-info-container">
        <div className="restaurant-info-content">
          <div className="restaurant-info-video-container">
            <video className="restaurant-info-centered-video" autoPlay loop muted>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2 className="restaurant-info-heading">Restaurant Information</h2>
          <form className="restaurant-info-form">
            <div className="restaurant-info-form-group">
              <label className="restaurant-info-form-label">Restaurant Name*</label>
              <input
                type="text"
                className="restaurant-info-form-input"
                placeholder="Restaurant Name"
                name="restaurantName"
                value={restaurantInfo.restaurantName}
                onChange={handleRestaurantInfoChange}
              />
            </div>
            <div className="restaurant-info-form-group">
              <label className="restaurant-info-form-label">Restaurant Contact Number*</label>
              <input
                type="text"
                className="restaurant-info-form-input"
                placeholder="Restaurant Contact Number"
                name="restaurantNumber"
                value={restaurantInfo.restaurantNumber}
                onChange={handleRestaurantInfoChange}
              />
            </div>
            <div className="restaurant-info-form-group">
              <label className="restaurant-info-form-label">Official Email Address*</label>
              <input
                type="text"
                className="restaurant-info-form-input"
                placeholder="Official Email Address"
                name="restaurantEmail"
                value={restaurantInfo.restaurantEmail}
                onChange={handleRestaurantInfoChange}
              />
            </div>
            <div className="restaurant-info-form-group">
              <label className="restaurant-info-form-label">Restaurant Address Details</label>
              <input
                type="text"
                className="restaurant-info-form-input"
                placeholder="Shop no./Building no. (optional)"
                name="address1"
                value={restaurantInfo.address1}
                onChange={handleRestaurantInfoChange}
              />
              <input
                type="text"
                className="restaurant-info-form-input"
                placeholder="Area/Sector/Locality*"
                name="address2"
                value={restaurantInfo.address2}
                onChange={handleRestaurantInfoChange}
              />
              <input
                type="text"
                className="restaurant-info-form-input"
                placeholder="City"
                name="city"
                value={restaurantInfo.city}
                onChange={handleRestaurantInfoChange}
              />
              <input
                type="text"
                className="restaurant-info-form-input"
                placeholder="Add any nearby landmark (optional)"
                name="landmark"
                value={restaurantInfo.landmark}
                onChange={handleRestaurantInfoChange}
              />
            </div>
            <div className="restaurant-info-buttons">
              <button
                type="button"
                className="restaurant-info-back-button"
                onClick={onPreviousClick}
              >
                Back
              </button>
              <button
                type="button"
                className="restaurant-info-submit-button"
                onClick={onNextClick}
              >
                Next
              </button>
            </div>
          </form>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <MuiAlert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%', backgroundColor: 'red', color: 'white','& .MuiAlert-message': { color: 'white' }  }}>
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RestaurantInfoPage;