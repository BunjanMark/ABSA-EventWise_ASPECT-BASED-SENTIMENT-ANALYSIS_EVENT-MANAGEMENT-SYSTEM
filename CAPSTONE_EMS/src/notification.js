import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import proPic from './images/pro_pic.png'; // Ensure the path to the image is correct
import event1 from './images/details.png'; // Added image for the event
import Modal from '@mui/material/Modal'; // Import Modal from Material UI





const Notification = () => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalVisibleDecline, setModalVisibleDecline] = useState(false); // State for modal visibility
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event details


  const handleAccept = () => {
    setModalVisible(true); // Show the overlay when booking an event
  };
  const handleDecline = () => {
    setModalVisibleDecline(true); // Show the overlay when booking an event
  };
  
  const handleCloseModal = () => {
    setModalVisible(false); // Close the overlay
  };
  const handleCloseModalDecline = () => {
    setModalVisibleDecline(false); // Close the overlay
  };
  const notificationsData = {
    'This Week': [
      {
        id: '1',
        title: 'Jane Wedding',
        joined: 'Diwata Pares, Heart Catering, and 35 others',
        daysAgo: '1d Ago',
        rightImage: proPic,
      },
      {
        id: '2',
        title: 'John Birthday',
        joined: 'Happy Cakes, DJ Mix, and 20 others',
        daysAgo: '3d Ago',
        rightImage: proPic,
      },
    ],
    'Booking Request': [
      {
        id: '1',
        name: 'Mr. & Mrs. Malik',
        title: 'Wedding',
        date: '2024-07-01',
        address: 'CDO',
        pax: 100,
        image: event1,
        daysAgo: '2d Ago',
      },
      {
        id: '2',
        name: 'John Smith',
        title: 'Birthday',
        date: '2024-08-01',
        address: 'Manila',
        pax: 50,
        image: event1,
        daysAgo: '4d Ago',
      },
    ],
    'Service Provider Request': [
      {
        id: '1',
        name: 'Emily Johnson',
        service: 'Photographer',
        daysAgo: '5d Ago',
      },
      {
        id: '2',
        name: 'Michael Brown',
        service: 'Food Catering',
        daysAgo: '6d Ago',
      },
    ],
    'All': [
      {
        id: '1',
        title: 'Jane Wedding',
        joined: 'Diwata Pares, Heart Catering, and 35 others',
        daysAgo: '1d Ago',
        rightImage: proPic,
      },
      {
        id: '2',
        name: 'Jane Doe',
        title: 'Wedding',
        daysAgo: '2d Ago',
      },
      {
        id: '3',
        name: 'Emily Johnson',
        service: 'Photographer',
        daysAgo: '5d Ago',
      },
    ],
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'This Week':
        return notificationsData['This Week'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={proPic} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                <h3 className="notification-title">{notification.title}</h3>
                <p className="notification-joined">{notification.joined}</p>
              </div>
            </div>
            {notification.rightImage && (
              <div className="right-container">
                <img src={notification.rightImage} className="right-image" alt="Right" />
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            )}
          </div>
        ));
      case 'Booking Request':
        return notificationsData['Booking Request'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={proPic} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                <h3 className="notification-name">{notification.name}</h3>
                <p className="notification-title">{notification.title}</p>
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            </div>
            <div className="buttons-container">
              <button className="accept-button" onClick={handleAccept}>
                <FontAwesomeIcon icon={faCheck} /> Accept
              </button>
              <button className="decline-button" onClick={handleDecline}>
                <FontAwesomeIcon icon={faTimes} /> Decline
              </button>
              <button className="view-details-button" onClick={() => setSelectedEvent(notification)}>
                View Details
              </button>
            </div>
          </div>
        ));
      case 'Service Provider Request':
        return notificationsData['Service Provider Request'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={proPic} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                <h3 className="notification-name">{notification.name}</h3>
                <p className="notification-service">{notification.service}</p>
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            </div>
            <div className="buttons-container">
              <button className="accept-button">
                <FontAwesomeIcon icon={faCheck} /> Accept
              </button>
              <button className="decline-button">
                <FontAwesomeIcon icon={faTimes} /> Decline
              </button>
            </div>
          </div>
        ));
      case 'All':
        return notificationsData['All'].map(notification => (
          <div key={notification.id} className="notification-box">
            <div className="left-container">
              <img src={proPic} className="profile-picture" alt="Profile" />
              <div className="notification-details">
                {notification.title && <h3 className="notification-title">{notification.title}</h3>}
                {notification.name && <p className="notification-name">{notification.name}</p>}
                {notification.service && <p className="notification-service">{notification.service}</p>}
                {notification.joined && <p className="notification-joined">{notification.joined}</p>}
                <p className="days-ago">{notification.daysAgo}</p>
              </div>
            </div>
            {notification.rightImage && (
              <div className="right-container">
                <img src={notification.rightImage} className="right-image" alt="Right" />
              </div>
            )}
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="notification-container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <div className="tabs-container">
        {['All', 'This Week', 'Booking Request', 'Service Provider Request'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="content-container">
        {renderContent()}
      </div>

      {/* Modal for Viewing Event Details */}
      {selectedEvent && (
        <div className="overlay">
          <div className="modal">
            <h2>{selectedEvent.name}'s {selectedEvent.title}</h2>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Address:</strong> {selectedEvent.address}</p>
            <p><strong>Pax:</strong> {selectedEvent.pax}</p>
            <img src={selectedEvent.image} alt="Event" className="event-image" />
            <button className="close-button" onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}

      <Modal
        open={modalVisible}
        onClose={handleCloseModal}
        className="modal-overlay-guestpage"
      >
        <div className="modal-content-guestpage">
          <button className="close-modal-btn-guestpage" onClick={handleCloseModal}>
            &times; {/* X Button */}
          </button>
          <img src={require('./images/popup-accept.png')} alt="Popup" className="popup-image-guestpage" />
        </div>
      </Modal>
      <Modal
        open={modalVisibleDecline}
        onClose={handleCloseModalDecline}
        className="modal-overlay-guestpage"
      >
        <div className="modal-content-guestpage">
          <button className="close-modal-btn-guestpage" onClick={handleCloseModalDecline}>
            &times; {/* X Button */}
          </button>
          <img src={require('./images/popup-delete.png')} alt="Popup" className="popup-image-guestpage" />
        </div>
      </Modal>
    </div>
  );
};

export default Notification;
