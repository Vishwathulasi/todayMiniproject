import React, { useState } from "react";
import QRCode from "qrcode";
import menu from "../../assests/video/menu.mp4";
import { useNavigate } from "react-router-dom";
import "./MenuDetails.css";
import Layout from "./Layout";
import Navbar from "../Navbar";
import tickIcon from "../../assests/image/checkmark.png";
import photo from '../../assests/image/photo.png';
import folder from '../../assests/image/cloud-computing.png';

const MenuDetails = () => {
  const [uploadMethod, setUploadMethod] = useState("manual");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(uploadedFiles);
  };

  const handleFileSelect = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    handleFileUpload(uploadedFiles);
  };

  const handleFileUpload = (uploadedFiles) => {
    const updatedFiles = uploadedFiles.map((file) => ({
      file,
      progress: 0,
      completed: false,
    }));

    // Append new files to existing list
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

    updatedFiles.forEach((fileObj) => {
      const interval = setInterval(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === fileObj.file
              ? {
                  ...f,
                  progress: f.progress + 10,
                  completed: f.progress + 10 >= 100 ? true : false,
                }
              : f
          )
        );
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    });
  };

  // Remove file based on name and lastModified properties
  const handleRemoveFile = (fileToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter(
        (fileObj) =>
          !(fileObj.file.name === fileToRemove.name && fileObj.file.lastModified === fileToRemove.lastModified)
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem('personalInfo');
    localStorage.removeItem('restaurantInfo');
    const uniqueId = Date.now().toString();

    try {
      const url = `http://localhost:3001/${uniqueId}`;
      console.log("Generated URL: ", url);
      const qrCodeDataUrl = await QRCode.toDataURL(url);

      navigate("/qrcode", { state: { qrCode: qrCodeDataUrl } });
    } catch (err) {
      console.error("Failed to generate QR code", err);
    }
  };

  const renderUploadBox = (accept, uploadType, inputId) => (
    <div
      className={`menu-details-page-upload-container ${
        isDragging ? "dragover" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById(inputId).click()}
    >
      <img
        src={uploadType === "image" ? photo : folder}
        alt={`${uploadType} icon`}
        className="menu-details-page-upload-icon"
      />
      <p>Click to upload or drag and drop</p>
      <input
        type="file"
        id={inputId}
        accept={accept}
        onChange={handleFileSelect}
        multiple
        style={{ display: "none" }}
      />
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="menu-details-large-container">
        <div className="menu-details-layout-container">
          <Layout />
        </div>
        <div className="menu-details-page-container">
          <div className="menu-details-page-content">
            <div className="menu-details-page-main">
              <div className="menu-details-page-video-container">
                <video
                  className="menu-details-page-centered-video"
                  autoPlay
                  loop
                  muted
                >
                  <source src={menu} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h2 className="menu-details-page-heading">
                Menu and Operational Details
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Upload Restaurant Picture */}
                <div className="menu-details-page-form-group">
                  <label className="menu-details-page-form-label">
                    Upload Restaurant Picture
                  </label>
                  {renderUploadBox(".jpg,.jpeg,.png", "image", "fileInputRestaurant")}
                </div>

                {/* Choose Menu Upload Method */}
                <div className="menu-details-page-form-group">
                  <label className="menu-details-page-form-label">
                    Choose Menu Upload Method
                  </label>
                  <select
                    className="menu-details-page-form-input"
                    value={uploadMethod}
                    onChange={(e) => setUploadMethod(e.target.value)}
                  >
                    <option value="manual">Menu Card</option>
                    <option value="csv">CSV/Excel File</option>
                  </select>
                </div>

                {/* Manual Upload Method */}
                {uploadMethod === "manual" && (
                  <div className="menu-details-page-manual-upload">
                    <div className="menu-details-page-form-group">
                      <label className="menu-details-page-form-label">
                        Menu Card Image
                      </label>
                      {renderUploadBox(".jpg,.jpeg,.png", "image", "fileInputManual")}
                    </div>
                  </div>
                )}

                {/* CSV Upload Method */}
                {uploadMethod === "csv" && (
                  <div className="menu-details-page-csv-upload">
                    <div className="menu-details-page-form-group">
                      <label className="menu-details-page-form-label">
                        Upload CSV/Excel File
                      </label>
                      {renderUploadBox(".csv,.xls,.xlsx", "file", "fileInputCSV")}
                    </div>
                  </div>
                )}

                {/* Uploaded Files List */}
                <div className="menu-details-page-upload-list">
                  {files.map((fileObj, index) => (
                    <div
                      key={`${fileObj.file.name}-${fileObj.file.lastModified}`}
                      className={`menu-details-page-upload-item ${
                        fileObj.completed ? "upload-item-complete" : ""
                      }`}
                    >
                      <span>{fileObj.file.name}</span>
                      {fileObj.completed ? (
                        <span className="upload-complete">
                          Uploaded <img src={tickIcon} alt="Uploaded" style={{ height: "20px", width: "20px" }} />
                          <span className="remove-file" onClick={() => handleRemoveFile(fileObj.file)}>
                            Remove
                          </span>
                        </span>
                      ) : (
                        <>
                          <div className="menu-details-page-upload-item-progress">
                            <div className="menu-details-page-upload-item-progress-bar" style={{ width: `${fileObj.progress}%` }}></div>
                          </div>
                          <span>{fileObj.progress}%</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="menu-details-page-buttons">
                  <button type="button" className="menu-details-page-back-button" onClick={() => navigate(-1)}>
                    Back
                  </button>
                  <button type="submit" className="menu-details-page-submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
