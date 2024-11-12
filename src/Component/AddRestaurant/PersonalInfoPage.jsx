import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import personalInfor from "../../assests/video/dossier.mp4";
import './PersonalInfoPage.css';
import Layout from './Layout';
import Navbar from '../../Component/Navbar'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { FaUser } from "react-icons/fa";
const PersonalInfoPage = () => {
  // Initialize state for personalInfo
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate=useNavigate('')
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...personalInfo, [name]: value };
    setPersonalInfo(updatedInfo);
    localStorage.setItem('personalInfo', JSON.stringify(updatedInfo));
  };

  const handleValidation = () => {
    const { fullName, email, phone } = personalInfo;

    if (!fullName || !email || !phone) {
      setSnackbarMessage("All fields are required.");
      setOpenSnackbar(true);
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setSnackbarMessage("Please enter a valid email address.");
      setOpenSnackbar(true);
      return false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
      setSnackbarMessage("Phone number must be 10 digits.");
      setOpenSnackbar(true);
      return false;
    }

    return true;
  };

  const onNextClick = () => {
    if (handleValidation()) {
      navigate('/restaurant-info')
      console.log("Proceeding to next step...");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  useEffect(() => {
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    if (savedPersonalInfo) {
      setPersonalInfo(JSON.parse(savedPersonalInfo));
    }
  }, []);

  

  return (
    <div>
      <Navbar/>
      <div className="personal-info-container">
        <div className="personal-info-layout">
          <Layout />
        </div>
        <div className="personal-info-content">
          <div className="personal-info-video-container">
            <video className="personal-info-centered-video" autoPlay loop muted>
              <source src={personalInfor} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <h2 className="personal-info-heading">Personal Information</h2>
          <form className="personal-info-form">
            <div className="personal-info-form-group">
              
              <label  className="personal-info-form-label">Name</label>
              <input
                type="text"
                className="personal-info-form-input"
                placeholder="Full Name"
                name="fullName"
                value={personalInfo.fullName}
                onChange={handlePersonalInfoChange}
              />
              <label  className="personal-info-form-label">Email Address</label>
              <input
                type="text"
                className="personal-info-form-input"
                placeholder="Email Address"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
              <label  className="personal-info-form-label">Phone Number</label>
              <input
                type="text"
                className="personal-info-form-input"
                placeholder="Phone Number"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <button
              type="button"
              className="personal-info-submit-button"
              onClick={onNextClick}
            >
              Next
            </button>
          </form>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <MuiAlert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%', backgroundColor: 'red', color: 'white',  // This should work for text color
      '& .MuiAlert-message': { color: 'white' }  ,'& .MuiAlert-icon': { color: 'white' },  // Change the warning icon to blue
      '& .MuiSvgIcon-root': { color: 'white' }  }}>
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
