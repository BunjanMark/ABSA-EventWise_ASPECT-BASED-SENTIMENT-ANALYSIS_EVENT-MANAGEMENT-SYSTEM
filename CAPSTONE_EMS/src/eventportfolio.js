import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { IoArrowBack, IoAdd } from 'react-icons/io5';

const EventPortfolio = () => {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleAddCoverPhoto = () => {
    alert('Add Cover Photo', 'Functionality to choose an image for the cover photo.');
  };

  const handleCreatePortfolio = () => {
    alert('Create Service Portfolio', 'Functionality to create a new service portfolio.');
  };

  return (
    <div className="gradient-container-portfolio">
      <div className="container-portfolio">
        <div className="header-portfolio">
          <button onClick={() => navigate('/edit-profile')} className="back-button-portfolio">
            <IoArrowBack size={32} color="#FFC42B" />
          </button>
          <h1 className="header-text-portfolio">Package Details</h1>
        </div>

        <button className="cover-photo-container-portfolio" onClick={handleAddCoverPhoto}>
          <IoAdd size={24} color="white" className="cover-photo-icon-portfolio" />
          <span className="cover-photo-text-portfolio">Add Cover</span>
        </button>

        <div className="line-portfolio" />

        <span className="labels-portfolio">Event Details</span>
        <span className="label-portfolio"></span>
        
        <span className="label-portfolio">Name</span>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Name"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />
        
        <span className="label-portfolio">Type of Services</span>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Type of Services"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        />

        <span className="label-portfolio">Price Range</span>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />

        <button className="create-portfolio-button-portfolio" onClick={handleCreatePortfolio}>
          <IoAdd size={24} color="white" />
          <span className="create-portfolio-text-portfolio">Create Package Details</span>
        </button>
      </div>
    </div>
  );
};

export default EventPortfolio;
