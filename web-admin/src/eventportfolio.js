import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { IoArrowBack, IoAdd } from 'react-icons/io5';

const EventPortfolio = () => {
  const navigate = useNavigate();
  const [portfolioName, setPortfolioName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null); // State for holding the selected cover photo

  const handleAddCoverPhoto = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a URL for the selected image
      setCoverPhoto(imageURL); // Set the image URL in state
    }
  };

  const handleCreatePortfolio = () => {
    alert('Create Service Portfolio', 'Functionality to create a new service portfolio.');
  };

  return (
    <div className="gradient-container-portfolio">
      <button onClick={() => navigate('/profile')} className="back-button-portfolio">
        <IoArrowBack size={24} color="#FFC42B" />
      </button>
      <div className="container-portfolio">
        <div className="header-portfolio">
          <h1 className="header-text-portfolio">Package Details</h1>
        </div>

        <div className="broken-box-container-portfolio">
          {coverPhoto ? (
            <div className="cover-photo-section-portfolio">
              <img src={coverPhoto} alt="Cover" className="cover-photo-preview-portfolio" />
              <button className="choose-cover-button-portfolio">
                <label htmlFor="choose-cover-input" className="choose-cover-text-portfolio">
                  Choose Cover
                </label>
              </button>
              <input
                type="file"
                accept="image/*"
                id="choose-cover-input"
                className="file-input-portfolio"
                onChange={handleAddCoverPhoto}
              />
            </div>
          ) : (
            <label className="cover-photo-container-portfolio">
              <IoAdd size={20} color="white" className="cover-photo-icon-portfolio" />
              <span className="cover-photo-text-portfolio">Add Cover</span>
              <input
                type="file"
                accept="image/*"
                className="file-input-portfolio"
                onChange={handleAddCoverPhoto}
              />
            </label>
          )}
        </div>

        <span className="labels-portfolio">Event Details</span>
        
        <label className="label-portfolio">Name</label>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Name"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
        />
        
        <label className="label-portfolio">Type of Services</label>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Type of Services"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />

        <label className="label-portfolio">Price Range</label>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />

        <div className="center-button-container-portfolio">
          <button className="create-portfolio-button-portfolio" onClick={handleCreatePortfolio}>
            <IoAdd size={20} color="white" />
            <span className="create-portfolio-text-portfolio">Create Package Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPortfolio;
