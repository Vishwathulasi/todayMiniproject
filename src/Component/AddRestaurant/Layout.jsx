import React from "react";
import "./Layout.css";
import businessMan from "../../assests/image/WhatsApp_Image_2024-09-02_at_21.31.07_9643438d-removebg-preview.png";
import RestaurantInfopic from "../../assests/image/WhatsApp_Image_2024-09-02_at_21.30.45_8432d6a8-removebg-preview.png";
import menuDetailspic from "../../assests/image/WhatsApp_Image_2024-09-02_at_21.35.07_96683c3c-removebg-preview.png";
import { useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();
  return (
    <div className="layout-container">
      <div className="sidebar">
        <div className="sidebar-content">
          <h2 className="sidebar-heading">Complete your registration</h2>
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <div className={location.pathname==='/add-restaurant'?'sidebar-item-content active':'sidebar-item-content'}>
                <span className="sidebar-icon">
                  <img src={businessMan} alt="Personal Information" style={{ height: "30px" }} />
                </span>{" "}
                Personal Information
              </div>
            </li>
            <li className="sidebar-item">
              <div className={location.pathname==='/restaurant-info'?'sidebar-item-content active':'sidebar-item-content'}>
                <span className="sidebar-icon">
                  <img src={RestaurantInfopic} alt="Restaurant Information" style={{ height: "30px" }}/>
                </span> Restaurant Information
              </div>
            </li>
            <li className="sidebar-item">
              <div className={location.pathname==='/menu-details'?'sidebar-item-content active':'sidebar-item-content'}>
                <span className="sidebar-icon">
                  <img src={menuDetailspic} alt="Menu and Operational Details" style={{ height: "30px" }}/>
                </span> Menu and Operational
                Details
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* You can add additional static content here if needed */}
    </div>
  );
};

export default Layout;
