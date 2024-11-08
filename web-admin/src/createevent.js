import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken, faPlusCircle, faCashRegister, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaChevronDown, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight} from 'react-icons/fa';
import './App.css';
import image1 from "./images/event1.png"; // Example images
import image2 from "./images/event2.png";
import image3 from "./images/event3.png";


import Box from '@mui/material/Box';

// CREATE EVENT
const eventTypes = ["Wedding", "Birthday", "Reunion", "Debut", "Others"];
const venues = [
    { id: '1', venuename: 'Cove Garden Resort', image: require('./images/venue1.jpg'), address: 'Zone 3 Old Road, Cagayan de Oro, 9000 Misamis Oriental', description: 'Nestled on the shore of the magnificent Macajalar Bay, Cove Garden Resort is the perfect event venue for you, your loved ones, and your colleagues.' },
    { id: '2', venuename: 'Garcia Residencia', image: require('./images/venue2.jpg'), address: ' Captain E Jabulin St Centro, Cagayan de Oro, 9000 Misamis Oriental', description: 'GARCIA RESIDENCIA -A modern American style venue for any occasion situated in Cagayan de Oro City. We cater venue rental for: ➡️ Weddings ➡️ Debut ➡️ Birthdays ➡️' },
    { id: '3', venuename: 'Elarvee', image: require('./images/venue3.jpg'), address: 'CJVV+C66, S Diversion Rd, Cagayan de Oro, 9000 Misamis Oriental', description: 'Party planner sa Lungsod ng Cagayan de Oro' },
    { id: '4', venuename: 'Casa de Canitoan', image: require('./images/venue4.jpg'), address: 'Macapagal Dr, Cagayan de Oro, 9000 Misamis Oriental', description: 'Property Name: Casa de Canitoan ; Street Address: Macapagal Drive ; Apt, suite, floor etc. : Casa de Canitoan ; City : Cagayan de Oro City - Misamis Oriental.' },
    { id: '5', venuename: '4 Kings Event Center Uptown', image: require('./images/venue5.jpg'), address: 'FJ3C+P5F, Pacific St, Cagayan de Oro, 9000 Misamis Oriental', description: 'Fronting Terrazzo Restaurant, behind Prawn House Seafood Restaurant. 4 KINGS EVENT CENTER is the ideal spot to celebrate your occasions!' },
    { id: '6', venuename: 'Cove Garden Resort', image: require('./images/venue1.jpg'), address: 'Zone 3 Old Road, Cagayan de Oro, 9000 Misamis Oriental', description: 'Nestled on the shore of the magnificent Macajalar Bay, Cove Garden Resort is the perfect event venue for you, your loved ones, and your colleagues.' },
    { id: '7', venuename: 'Garcia Residencia', image: require('./images/venue2.jpg'), address: ' Captain E Jabulin St Centro, Cagayan de Oro, 9000 Misamis Oriental', description: 'GARCIA RESIDENCIA -A modern American style venue for any occasion situated in Cagayan de Oro City. We cater venue rental for: ➡️ Weddings ➡️ Debut ➡️ Birthdays ➡️' },
    { id: '8', venuename: 'Elarvee', image: require('./images/venue3.jpg'), address: 'CJVV+C66, S Diversion Rd, Cagayan de Oro, 9000 Misamis Oriental', description: 'Party planner sa Lungsod ng Cagayan de Oro' },
    { id: '9', venuename: 'Casa de Canitoan', image: require('./images/venue4.jpg'), address: 'Macapagal Dr, Cagayan de Oro, 9000 Misamis Oriental', description: 'Property Name: Casa de Canitoan ; Street Address: Macapagal Drive ; Apt, suite, floor etc. : Casa de Canitoan ; City : Cagayan de Oro City - Misamis Oriental.' },
    { id: '10', venuename: '4 Kings Event Center Uptown', image: require('./images/venue5.jpg'), address: 'FJ3C+P5F, Pacific St, Cagayan de Oro, 9000 Misamis Oriental', description: 'Fronting Terrazzo Restaurant, behind Prawn House Seafood Restaurant. 4 KINGS EVENT CENTER is the ideal spot to celebrate your occasions!' },
];


// CHOOSE PACKAGE
const packagesData = [
    { id: '1', packagename: 'Package A', image: require('./images/package1.png'), price: '100,000', description: 'Perfect for intimate gatherings, this package offers a cozy setting with essential amenities for up to 100 guests.' },
    { id: '2', packagename: 'Package B', image: require('./images/package2.png'), price: '150,000', description: 'Ideal for mid-sized events, Package B includes additional features such as catering and audiovisual support for up to 100 guests.' },
    { id: '3', packagename: 'Package C', image: require('./images/package3.png'), price: '200,000', description: 'Designed for larger events, this package accommodates up to 150 guests and provides a comprehensive solution with premium decorations.' },
    { id: '4', packagename: 'Package D', image: require('./images/package4.png'), price: '250,000', description: 'The ultimate choice for grand celebrations, Package D caters to events of up to 250 guests with bespoke services and expert planning.' },
  ];



//   SERVICE PROVIDER
 
const eventServices = ["Food Catering", "Photography", "Video Editing", "Florists"];
const images = [image1, image2, image3];


  
  const CreateEvent = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [customEventType, setCustomEventType] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState(''); // New state for event time
    const [pax, setPax] = useState('');
    const [venue, setVenue] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [venueOverlayOpen, setVenueOverlayOpen] = useState(false);
    const [venueDetailsOverlay, setVenueDetailsOverlay] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDateValid, setIsDateValid] = useState(true);
    const [coverPhoto, setCoverPhoto] = useState(null);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleNext = () => {
      const eventType = selectedType === 'Others' ? customEventType : selectedType;
      const eventData = {
          type: eventType,
          name: eventName,
          date: eventDate,
          time: eventTime, // Include time in event data
          pax: parseInt(pax, 10),
          venue: venue,
          coverPhoto: coverPhoto // Ensure this is in the right format (e.g., URL or File)
      };
      localStorage.setItem('eventData', JSON.stringify(eventData));
      navigate('/choose-package', { state: { eventData } });
  };
  

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelectEventType = (type) => {
        setSelectedType(type);
        setDropdownOpen(false);
    };

    const openVenueOverlay = () => {
        setVenueOverlayOpen(true);
    };

    const selectVenue = (venue) => {
        setVenueDetailsOverlay(venue);
    };

    const confirmVenueSelection = () => {
        setVenue(venueDetailsOverlay.venuename);
        closedVenueDetailsOverlay();
    };

    const closedVenueDetailsOverlay = () => {
        setVenueDetailsOverlay(null);
        setVenueOverlayOpen(false);
    };

    const closeVenueDetailsOverlay = () => {
        setVenueDetailsOverlay(null);
    };

    const closeVenueOverlay = () => {
        setVenueOverlayOpen(false);
    };

    const filteredVenues = venues.filter((venue) =>
        venue.venuename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setEventDate(selectedDate);

        const today = new Date().toISOString().split('T')[0];
        setIsDateValid(selectedDate >= today);
    };

    const handleTimeChange = (e) => { // New function to handle time change
      setEventTime(e.target.value);
  };



    const handleCoverPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverPhoto(URL.createObjectURL(file)); // Create a URL for the selected photo
        }
    };

    const isFormValid = () => {
        return (
            eventName.trim() !== '' &&
            eventDate !== '' &&
            isDateValid &&
            pax.trim() !== '' &&
            venue.trim() !== ''
        );
    };

    return (
        <div className="gradient-container-createevent">
            <div className="container-createevent">
                <div className="content-createevent">
                    <h1 className="header-text-createevent">Create Event</h1>
                    <div className="line-createevent"></div>
                    {/* Cover Photo Section */}
                    <div className="cover-photo-container-createevent">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleCoverPhotoChange} 
                                className="upload-button-createevent" 
                                id="file-input" // Add an ID to the file input
                                style={{ display: 'none' }} // Keep it hidden
                            />
                            <div className={`cover-photo-box-createevent ${coverPhoto ? 'has-cover' : ''}`}>
                                {coverPhoto ? (
                                    <img src={coverPhoto} alt="Event Cover" className="cover-photo-image-createevent" />
                                ) : (
                                    <span>No cover photo selected</span>
                                )}
                            </div>
                            <button 
                                className="add-event-cover-button-createevent" 
                                onClick={() => document.getElementById('file-input').click()} // Programmatically click the input
                            >
                                {coverPhoto ? "Re-pick Cover Photo" : "Add Event Cover"}
                            </button>
                        </div>
                    <h2 className="event-types-text-createevent">Choose Event Type</h2>
                    <div className="dropdown-container-createevent">
                        <div className="dropdown-button-createevent" onClick={toggleDropdown}>
                            {selectedType || "Select Event Type"}
                            <FaChevronDown />
                        </div>
                        <div className={`dropdown-menu-createevent ${dropdownOpen ? 'show' : ''}`}>
                            {eventTypes.map((type, index) => (
                                <button key={index} onClick={() => handleSelectEventType(type)}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    {selectedType === 'Others' && (
                        <div className="input-container-createevent custom-event-type-container">
                            <input
                                type="text"
                                className="text-input-createevent"
                                placeholder="Enter Custom Event Type"
                                value={customEventType}
                                onChange={(e) => setCustomEventType(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Event Name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent date-input-createevent">
                        <input
                            type="date"
                            className={`text-input-createevent ${!isDateValid ? 'invalid-date' : ''}`}
                            placeholder="Choose Event Date"
                            value={eventDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="input-container-createevent time-input-createevent"> {/* Time input container */}
                        <input
                            type="time"
                            className="text-input-createevent"
                            placeholder="Choose Event Time"
                            value={eventTime}
                            onChange={handleTimeChange} // Call the new handleTimeChange function
                        />
                    </div>
                    <div className="input-container-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Pax"
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                        />
                    </div>
                    <div className="input-container-createevent venue-input-createevent">
                        <input
                            type="text"
                            className="text-input-createevent"
                            placeholder="Choose Venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                        />
                    </div>
                    
                    


                    <div className="button-container-createevent">
                        <button className="cancel-button-createevent" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="choose-venue-button-createevent" onClick={openVenueOverlay}>
                            Choose Venue
                        </button>
                        <button
                            className="next-button-createevent"
                            onClick={handleNext}
                            disabled={!isFormValid()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {venueOverlayOpen && (
                <div className="overlay-createevent">
                    <FaTimes className="close-button1-createevent" onClick={closeVenueOverlay} />
                    <div className="venue-selection-container-createevent">
                        <div className="searchbox-container-createevent">
                            <input
                                type="text"
                                className="search-box-createevent"
                                placeholder="Search your Venue here!"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="venue-selection-container-createevent">
                            {filteredVenues.map((venue) => (
                                <div key={venue.id} className="venue-item-createevent">
                                    <div className="venue-box-createevent">
                                        <img src={venue.image} alt={venue.venuename} className="venue-image-createevent" />
                                        <h3 className="venue-name-createevent">{venue.venuename}</h3>
                                        <p className="venue-address-createevent">
                                            <FaMapMarkerAlt /> {venue.address}
                                        </p>
                                        <button className="venue-choose-button-createevent" onClick={() => selectVenue(venue)}>
                                            Choose
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {venueDetailsOverlay && (
                <div className="overlay-createevent">
                    <div className="venue-details-container-createevent">
                        <FaTimes className="close-button-createevent" onClick={closeVenueDetailsOverlay} />
                        <img src={venueDetailsOverlay.image} alt={venueDetailsOverlay.venuename} className="venue-details-image-createevent" />
                        <h2 className="venue-name-createevent">{venueDetailsOverlay.venuename}</h2>
                        <p className="venue-address-createevent">{venueDetailsOverlay.address}</p>
                        <button className="confirm-button-createevent" onClick={confirmVenueSelection}>
                            Confirm Selection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
  
  

// Blank Page Component
const ChoosePackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const navigate = useNavigate();

  const openOverlay = (pkg) => {
    setSelectedPackage(pkg);
    setIsOverlayOpen(true);
    localStorage.setItem('selectedPackage', JSON.stringify(pkg)); 
  };
  
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div className="container-choosepackage">
      <h1 className="header-choosepackage">Choose Package</h1>

      <button className="customize-btn-choosepackage" onClick={() => navigate('/choose-service-provider')}>
        Click here if you want to customize <FaArrowRight />
      </button>

      <div className="packages-row-choosepackage">
        {packagesData.map((pkg) => (
          <div key={pkg.id} className="package-choosepackage">
            <img src={pkg.image} alt={pkg.packagename} className="image-choosepackage" />
            <h3>{pkg.packagename}</h3>
            <p>{pkg.description}</p>
            <p>Price: {pkg.price}</p>
            <button className="choose-btn-choosepackage" onClick={() => openOverlay(pkg)}>
              Choose
            </button>
          </div>
        ))}
      </div>

      <button className="next-btn-choosepackage" onClick={() => navigate('/add-guest')}>Next</button>

      {isOverlayOpen && selectedPackage && (
        <div className="overlay-choosepackage">
          <div className="overlay-content-choosepackage">
            <h2 className="overlay-header-choosepackage">Chosen Package: {selectedPackage.packagename}</h2>
            <button className="close-btn-choosepackage" onClick={closeOverlay}>
              <FaTimes />
            </button>
            <img src={selectedPackage.image} alt={selectedPackage.packagename} className="overlay-image-choosepackage" />
            <p>{selectedPackage.description}</p>
            <p>Price: {selectedPackage.price}</p>
            <button className="confirm-btn-choosepackage" onClick={closeOverlay}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


const ChooseServiceProv = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [likedEvents, setLikedEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [addedEvents, setAddedEvents] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from your backend with Authorization Header
    axios.get("http://192.168.1.48:8000/api/services", {
        headers: {
            Authorization: `Bearer 1|a2EQ8hNRFbDsSXdltvsKl0ULgcAwe2CT4HnOdEWQd1a83b66` // Replace with your actual token
        }
    })
    .then((response) => {
        const mappedServices = response.data.map((service) => ({
            title: service.serviceName,
            price: service.basePrice,
            type: service.serviceCategory,
            image: images[Math.floor(Math.random() * images.length)], // Assign a random image
        }));
        setServices(mappedServices);
    })
    .catch((error) => {
        console.error("Error fetching services:", error);
    });
}, []);

  const toggleLike = (eventId) => {
    setLikedEvents(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const handleEventClick = (item) => {
    setSelectedEvent(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleNext = () => {
    if (selectedEvent) {
      const eventToAdd = {
        id: selectedEvent.id,
        title: selectedEvent.title,
        type: selectedEvent.type,
        price: selectedEvent.price,
      };

      const updatedEvents = [...addedEvents, eventToAdd];
      localStorage.setItem('addedEvents', JSON.stringify(updatedEvents));
      setAddedEvents(updatedEvents);
      handleCloseModal();
    }
  };

  const handleRemoveEvent = (eventId) => {
    setAddedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const handleFinish = async () => {
    const eventData = JSON.parse(localStorage.getItem('eventData')) || {};
    const addedEvents = JSON.parse(localStorage.getItem('addedEvents')) || [];

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          providers: addedEvents,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      localStorage.removeItem('eventData');
      localStorage.removeItem('addedEvents');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const filteredEventsData = selectedType
    ? services.filter(event => event.type === selectedType)
    : services;

  const renderEventItem = (item) => (
    <div className="event-item-sp" onClick={() => handleEventClick(item)} key={item.id}>
      <img src={item.image} alt={item.title} className="event-image-sp" />
      <p className="event-title-sp">{item.title}</p>
      <div className="event-details-sp">
        <div className="event-detail-row-sp">
          <FontAwesomeIcon icon={faPlusCircle} size="sm" color="#2A93D5" />
          <p className="event-detail-text-sp">{item.type}</p>
        </div>
        <div className="event-detail-row-sp">
          <FontAwesomeIcon icon={faCashRegister} size="sm" color="#2A93D5" />
          <p className="event-detail-text-sp">${item.price}</p>
        </div>
      </div>
      <div
        className={`like-icon-sp ${likedEvents[item.id] ? 'liked' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(item.id);
        }}
      >
        <FontAwesomeIcon
          icon={likedEvents[item.id] ? faHeart : faHeartBroken}
          color={likedEvents[item.id] ? '#FF0000' : '#888'}
          size="lg"
        />
      </div>
    </div>
  );

  return (
    <div className="gradient-background-sp">
      <div className="main-container-sp">
        <div className="scrollable-content-sp">
          <div className="content-sp">
            <p className="header-title-sp">Service Provider</p>
            <div className="separator-line-sp"></div>
            <p className="service-type-label-sp">Add Service Provider</p>
            <div className="horizontal-scroll-sp">
              {eventServices.map((type, index) => (
                <button
                  key={index}
                  className={`event-type-button-sp ${selectedType === type ? 'selected' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  <p className={`event-type-text-sp ${selectedType === type ? 'selected' : ''}`}>
                    {type}
                  </p>
                </button>
              ))}
            </div>

            <div className="event-list-container-sp">
              {filteredEventsData.map(event => renderEventItem(event))}
            </div>

            {addedEvents.length > 0 && (
              <div className="added-events-section-sp">
                <p className="added-events-title-sp">Added Events</p>
                <div className="added-events-scroll-sp">
                  {addedEvents.map(event => (
                    <div key={event.id} className="added-event-item-sp">
                      <p className="added-event-text-sp">{event.title}</p>
                      <p className="added-event-text-sp">{event.type}</p>
                      <p className="added-event-text-sp">${event.price}</p>
                      <button
                        className="remove-event-button-sp"
                        onClick={() => handleRemoveEvent(event.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#FF4C4C" />
                      </button>
                    </div>
                  ))}
                  <div className="footer-buttons-sp">
                    <button className="modal-cancel-button-sp" onClick={() => window.history.back()}>
                      <p className="modal-cancel-button-text-sp">Cancel</p>
                    </button>
                    <button className="modal-add-button-sp" onClick={handleFinish}>
                      <p className="modal-add-button-text-sp" onClick={() => navigate('/add-guest')}>Finish</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal open={modalVisible} onClose={handleCloseModal} className="modal-overlay-sp">
          <div className="modal-content-container-sp">
            <div className="modal-body-sp">
              {selectedEvent && (
                <>
                  <p className="modal-title-sp">{selectedEvent.title}</p>
                  <p className="modal-provider-sp">Provider: {selectedEvent.type}</p>
                  <p className="modal-price-sp">Price: ${selectedEvent.price}</p>
                  <div className="modal-actions-sp">
                    <button className="modal-add-button-sp" onClick={handleNext}>Add</button>
                    <button className="modal-cancel-button-sp" onClick={handleCloseModal}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

  const ReviewOverlay = ({ isOpen, onClose, packagesData, allEventsData, guests }) => {
    const eventData = JSON.parse(localStorage.getItem('eventData'));
    const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage'));
    const addedEvents = JSON.parse(localStorage.getItem('addedEvents'));
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    
    // New handleBookEvent function
    const handleBookEvent = async () => {
      const eventData = JSON.parse(localStorage.getItem('eventData'));
  
      console.log('Updated Event Data:', eventData);
  
      const formData = new FormData();
      formData.append('name', eventData.name);
      formData.append('date', eventData.date);
      formData.append('pax', eventData.pax);
      formData.append('venue', eventData.venue);
      formData.append('type', eventData.type);
  
      // Handle the cover photo if it exists
      if (eventData.coverPhoto) {
          try {
              const response = await fetch(eventData.coverPhoto);
              const blob = await response.blob();
              formData.append('cover_photo', blob, 'cover_photo.jpg');
          } catch (fetchError) {
              console.error('Error fetching the cover photo:', fetchError);
          }
      }
  
      try {
          const response = await axios.post('http://localhost:8000/api/events', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
  
          if (response.status === 201) {
              setModalVisible(true);
          } else {
              console.error('Failed to create event:', response.statusText);
          }
      } catch (error) {
          console.error('An error occurred:', error.response ? error.response.data : error.message);
      }
  };
  
  
  
  
    const handleCloseModal = () => {
        setModalVisible(false); // Close the overlay
    };

    console.log('Selected Package:', selectedPackage); // Debugging log

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box>
                <div className="overlay-content-reviewoverlay">
                    <div className="overlay-left">
                        <div className="overlay-header-reviewoverlay">
                            <h2 className="modal-title">Review Details</h2>
                            <button onClick={onClose} className="close-button-reviewoverlay">X</button>
                        </div>
                        <h3>Event Details</h3>
                        <p>Event Name: {eventData.name}</p>
                        <p>Date: {eventData.date}</p>
                        <p>Pax: {eventData.pax}</p>
                        <p>Location: {eventData.venue}</p>

                        <h3>Package Details</h3>
                        {selectedPackage ? (
                            <>
                                <p>Package Name: {selectedPackage.packagename}</p>
                                <p>Price: {selectedPackage.price}</p>
                            </>
                        ) : (
                            <p>No package selected.</p>
                        )}
                    </div>
                    <div className="overlay-right">
                        <h3>Service Providers</h3>
                        {Array.isArray(addedEvents) && addedEvents.length > 0 ? (
                            addedEvents.map((serviceProvider, index) => (
                                <p key={index}>{serviceProvider.title} - {serviceProvider.type}</p>
                            ))
                        ) : (
                            <p>No service providers added.</p>
                        )}

                        <h3>Guests</h3>
                        {Array.isArray(guests) && guests.length > 0 ? (
                            guests.slice(0, 5).map((guest, index) => (
                                <p key={index}>{guest.name} - {guest.email}</p>
                            ))
                        ) : (
                            <p>No guests added.</p>
                        )}
                        <button className="book-event-btn-guestpage" onClick={handleBookEvent}>
                            Book Event
                        </button>
                        <Modal
                            open={modalVisible}
                            onClose={handleCloseModal}
                            className="modal-overlay-guestpage"
                        >
                            <div className="modal-content-guestpage">
                                <button className="close-modal-btn-guestpage" onClick={handleCloseModal}>
                                    &times; {/* X Button */}
                                </button>
                                <img src={require('./images/popup.png')} alt="Popup" className="popup-image-guestpage" />
                                <p className="modal-text-guestpage">Your event has been booked!</p>
                            </div>
                        </Modal>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};



  
const GuestPage = ({ packagesData, allEventsData, selectedEvent }) => {
  const [guests, setGuests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState(''); // New field
  const [role, setRole] = useState(''); // New field

  // Handling guest addition
  const handleAddGuest = () => {
    if (!name.trim() || !email.trim() || !mobileNumber.trim() || !role.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setGuests([...guests, { name, email, mobileNumber, role }]);
    setName('');
    setEmail('');
    setMobileNumber('');
    setRole('');
  };

  // Handling guest removal
  const handleRemoveGuest = (index) => {
    const newGuests = guests.filter((_, i) => i !== index);
    setGuests(newGuests);
  };

  const handleBookEvent = () => {
    setModalVisible(true); // Show the review overlay
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the overlay
  };

  const openOverlay = () => {
    setOverlayVisible(true);
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <div className="guest-page-container-guestpage">
      <h1 className="header-guestpage">Add Guest</h1>
      <div className="guest-container-guestpage">
        <div className="right-section-guestpage">
          <table className="guest-table-guestpage">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th> {/* New column */}
                <th>Role</th> {/* New column */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.name}</td>
                  <td>{guest.email}</td>
                  <td>{guest.mobileNumber}</td> {/* Display mobile number */}
                  <td>{guest.role}</td> {/* Display role */}
                  <td>
                    <button
                      className="remove-btn-guestpage"
                      onClick={() => handleRemoveGuest(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="add-guest-btn-guestpage" onClick={openOverlay}>
        Add Guest
      </button>

      <button className="book-event-btn-guestpage" onClick={handleBookEvent}>
        Next
      </button>

      {overlayVisible && (
        <div className="overlay-guestpage">
          <div className="overlay-content-guestpage">
            <button className="close-btn-guestpage" onClick={closeOverlay}>
              X
            </button>
            <h2 className="overlay-header-guestpage">Add Guest</h2>
            
            <label className="name-label-guestpage">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              className="name-input-guestpage"
              onChange={(e) => setName(e.target.value)}
            />
            
            <label className="email-label-guestpage">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              className="email-input-guestpage"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label className="mobile-label-guestpage">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobileNumber}
              className="mobile-input-guestpage"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            
            <label className="role-label-guestpage">Role</label>
            <input
              type="text"
              placeholder="Enter role"
              value={role}
              className="role-input-guestpage"
              onChange={(e) => setRole(e.target.value)}
            />
            
            <button className="confirm-add-btn-guestpage" onClick={handleAddGuest}>
              Add
            </button>
          </div>
        </div>
      )}

      <ReviewOverlay
        isOpen={modalVisible}
        onClose={handleCloseModal}
        selectedEvent={selectedEvent}
        packagesData={packagesData}
        allEventsData={allEventsData}
        guests={guests}
      />
    </div>
  );
};

export { CreateEvent, ChoosePackage, ChooseServiceProv, GuestPage };
 