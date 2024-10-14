import React, { useState, useEffect } from 'react'; // Import useEffect
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import proPic from './images/pro_pic.png'; // Ensure the path to the image is correct
import event1 from './images/details.png'; // Added image for the event
import Modal from '@mui/material/Modal'; // Import Modal from Material UI
import axios from 'axios';

const Notification = () => {
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalVisibleDecline, setModalVisibleDecline] = useState(false); // State for modal visibility
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event details
  const [serviceProviderRequests, setServiceProviderRequests] = useState([]); // Define state for service provider requests

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

  useEffect(() => {
    const fetchServiceProviderRequests = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pending'); // Replace with your actual endpoint
        setServiceProviderRequests(response.data); // Assuming the response data is an array
      } catch (error) {
        console.error('Error fetching service provider requests:', error);
      }
    };

    fetchServiceProviderRequests();
  }, []);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

function capitalizeWords(str) {
  return str
      .toLowerCase() // Convert the entire string to lowercase
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the words back into a single string
}

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
    'Service Provider Request': serviceProviderRequests.map((request) => ({
      id: request.id,
      name: `${request.name} ${request.lastname}`,
      role: capitalizeWords(request.role), // Capitalize the role here
      daysAgo: formatDate(request.created_at), // Format the date here
  })),
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
                <p className="notification-role">{notification.role}</p>
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
            <h2>{selectedEvent.title}</h2>
            <img src={selectedEvent.image} alt={selectedEvent.title} />
            <p>Date: {selectedEvent.date}</p>
            <p>Address: {selectedEvent.address}</p>
            <p>Pax: {selectedEvent.pax}</p>
            <button onClick={() => setSelectedEvent(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Accept Modal */}
      {modalVisible && (
        <Modal open={modalVisible} onClose={handleCloseModal}>
          <div className="modal-content">
            <h2>Booking Confirmed!</h2>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </Modal>
      )}

      {/* Decline Modal */}
      {modalVisibleDecline && (
        <Modal open={modalVisibleDecline} onClose={handleCloseModalDecline}>
          <div className="modal-content">
            <h2>Booking Declined!</h2>
            <button onClick={handleCloseModalDecline}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Notification;
