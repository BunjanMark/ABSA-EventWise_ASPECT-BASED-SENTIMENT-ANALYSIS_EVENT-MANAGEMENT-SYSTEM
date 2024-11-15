import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { IoArrowBack, IoAdd } from 'react-icons/io5';
import image1 from './images/event1.png';
import image2 from './images/event2.png';
import image3 from './images/event3.png';
import axios from 'axios';
import { getAuthToken } from './apiconfig';

const Package = () => {
  const navigate = useNavigate();

  const [packageName, setPackageName] = useState('');
  const [eventType, setEventType] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirmOverlay, setShowConfirmOverlay] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const images = [image1, image2, image3];
  const serCategory = ["All", "Food Catering", "Photography", "Video Editing", "Florists", "Venue"];

  useEffect(() => {
    axios.get('http://localhost:8000/api/services', {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => {
        const mappedServices = response.data.map((service) => ({
          id: service.id,
          serviceName: service.serviceName,
          basePrice: service.basePrice,
          serviceCategory: service.serviceCategory,
          image: images[Math.floor(Math.random() * images.length)],
        }));
        setAvailableServices(mappedServices);
        setFilteredServices(mappedServices); // Initially, show all services
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredServices(availableServices);
    } else {
      const filtered = availableServices.filter((service) => service.serviceCategory === selectedCategory);
      setFilteredServices(filtered);
    }
  }, [selectedCategory, availableServices]);

  const handleAddCoverPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setCoverPhoto(imageURL);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowConfirmOverlay(true);
  };

  const handleConfirmService = () => {
    if (selectedService) {
      setServices((prevServices) => {
        const updatedServices = [...prevServices, {
          id: selectedService.id,
          serviceName: selectedService.serviceName,
          serviceCategory: selectedService.serviceCategory,
          basePrice: selectedService.basePrice,
        }];
        return updatedServices;
      });
    }
    setShowConfirmOverlay(false);
    setShowOverlay(false);
  };

  const handleCancelService = () => {
    setShowConfirmOverlay(false);
    setShowOverlay(false);
  };

  const handleRemoveService = (serviceId) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
  };

  const handleCreatePackage = () => {
    if (!packageName || !eventType) {
      alert("Please fill in all fields and select at least one service.");
      return;
    }
  
    const packageData = {
      packageName,
      eventType,
      packageType: 'Pre-defined', // You can adjust this depending on how you want to categorize the package
      services, // An array of selected services
      totalPrice,
      coverPhoto, // Cover photo URL or base64 encoded image string
      packageCreatedDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };
  
    axios.post('http://localhost:8000/api/admin/packages', packageData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Package created successfully:', response.data);
      alert('Package created successfully!');
      // Optionally clear the form after success
      resetForm();
    })
    .catch((error) => {
      console.error('Error creating package:', error);
      alert('Failed to create package. Please try again.');
    });
  };
  
  const resetForm = () => {
    setPackageName('');
    setEventType('');
    setTotalPrice(0);
    setCoverPhoto(null);
    setServices([]);
    setSelectedCategory('All');
    setFilteredServices([]);
  };
  

  // Handle totalPrice input manually (ensuring it's a valid float)
  const handleTotalPriceChange = (e) => {
    let value = e.target.value;
  
    // Remove any non-numeric characters (keeping only numbers)
    value = value.replace(/[^0-9]/g, "");
  
    // Set the total price only if the value is a valid number
    if (value !== "") {
      setTotalPrice(parseInt(value, 10)); // Parse as integer
    } else {
      setTotalPrice(0); // Default to 0 if input is empty
    }
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

        <span className="labels-portfolio">Package Info</span>

        <label className="label-portfolio">Package Name</label>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Name"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
        />

        <label className="label-portfolio">Event Type</label>
        <input
          type="text"
          className="text-input-portfolio"
          placeholder="Enter Event Type (e.g., Wedding, Birthday, etc.)"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />

        <label className="label-portfolio">Enter Total Price</label>
        <input
          type="number"  // Use number type for whole numbers
          className="text-input-portfolio"
          placeholder="Total Price"
          value={totalPrice}
          step="1"  // Only whole numbers allowed
          onChange={handleTotalPriceChange}  // Manual input handling
        />



        <div className="services-container-portfolio">
          <h2 className="services-header-portfolio">Services</h2>
          {services.map((service, index) => (
            <div key={index} className="service-item-portfolio">
              <input type="text" placeholder="Service ID" value={service.id} readOnly className="service-input-portfolio" />
              <input type="text" placeholder="Service Name" value={service.serviceName} readOnly className="service-input-portfolio" />
              <input type="text" placeholder="Service Category" value={service.serviceCategory} readOnly className="service-input-portfolio" />
              <input type="text" placeholder="Service Price" value={service.basePrice} readOnly className="service-input-portfolio" />
              <button
                className="delete-service-button-portfolio"
                onClick={() => handleRemoveService(service.id)}
              >
                X
              </button>
            </div>
          ))}
          <div className="center-button-container-portfolio">
            <button className="create-portfolio-button-portfolio" onClick={() => setShowOverlay(true)}>
              <IoAdd size={20} color="white" />
              <span className="create-portfolio-text-portfolio">Choose Service Provider</span>
            </button>
          </div>
        </div>

        <button className="create-package-button" onClick={handleCreatePackage}>Create Package</button>

        {showOverlay && (
          <div className="overlay-container-services">
            <div className="overlay-content-services">
              <div className="filter-buttons-container">
                {serCategory.map((category, index) => (
                  <button
                    key={index}
                    className={`filter-button ${selectedCategory === category ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="service-buttons-container-services">
                {filteredServices.map((service, index) => (
                  <div key={index} className="service-item-overlay">
                    <button className="close-overlay-services" onClick={() => setShowOverlay(false)}>X</button>
                    <img src={service.image} alt={service.serviceName} className="service-image-overlay" />
                    <div className="service-details-overlay">
                      <h4>{service.serviceName}</h4>
                      <p>{service.serviceCategory}</p>
                      <p>{service.basePrice}</p>
                    </div>
                    <button className="select-service-overlay" onClick={() => handleServiceSelect(service)}>
                      Select Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showConfirmOverlay && selectedService && (
          <div className="overlay-container-buttons">
            <div className="overlay-content-buttons">
              <button className="close-overlay-services" onClick={handleCancelService}>X</button>
              <h3>Confirm Service: {selectedService.serviceName}</h3>
              <p>Category: {selectedService.serviceCategory}</p>
              <p>Base Price:{selectedService.basePrice}</p>
              <div className="confirm-button-container">
                <button className="confirm-button" onClick={handleConfirmService}>
                  Confirm
                </button>
                <button className="cancel-button" onClick={handleCancelService}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Package;
