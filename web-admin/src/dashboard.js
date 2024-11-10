import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";

// Packages data
const packageImages = [
  require('./images/event1.png'),
  require('./images/event2.png'),
  require('./images/event3.png')
];

const packageDescriptions = [
  "This package offers a comprehensive solution for your event needs. With top-notch services and amenities, Package ensures a memorable experience for all your guests.",
  "Package provides premium services tailored to your event's specific needs. From catering to decoration, we've got you covered.",
  "A versatile package offering everything from entertainment to venue setup. Perfect for all types of events and gatherings."
];

function Dashboard() {
  const [packages, setPackages] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsOverlay, setShowDetailsOverlay] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPackageOverlay, setShowPackageOverlay] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/packages')
      .then((response) => {
        // Randomly assign images and descriptions to the fetched packages
        const updatedPackages = response.data.map((pkg) => ({
          ...pkg,
          image: packageImages[Math.floor(Math.random() * packageImages.length)],
          description: packageDescriptions[Math.floor(Math.random() * packageDescriptions.length)],
        }));

        setPackages(updatedPackages);
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
      });

    axios.get('http://localhost:8000/api/events')
      .then((response) => {
        const today = new Date();
        const currentMonthIndex = today.getMonth();
        const eventDates = response.data
          .filter((event) => new Date(event.date).getMonth() === currentMonthIndex)
          .map((event) => new Date(event.date).getDate());

        setMonthlyBookings(eventDates);
        setCurrentMonth(`${today.toLocaleString('default', { month: 'long' })} ${today.getFullYear()}`);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const fetchEventsForDay = (day) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Month is zero-indexed, so November is 10
  
    // Format the date for the selected day in the current month and year
    const selectedDate = new Date(currentYear, currentMonth, day);
  
    axios.get('http://localhost:8000/api/events', { params: { date: selectedDate.toISOString().split('T')[0] } })
      .then((response) => {
        // Filter events that match the exact date, not just the day of the month
        const filteredEvents = response.data.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getFullYear() === currentYear &&
            eventDate.getMonth() === currentMonth &&
            eventDate.getDate() === day
          );
        });
  
        setEvents(filteredEvents);
        setSelectedDayEvents(filteredEvents.length > 0 ? filteredEvents : [{ name: 'No events on this day', venue: '' }]);
        setSelectedDay(day);
      })
      .catch((error) => {
        console.error('Error fetching events for day:', error);
        setEvents([]);
        setSelectedDayEvents([{ name: 'No events on this day', venue: '' }]);
      });
  };

  const handleDayClick = (day) => {
    fetchEventsForDay(day);
    setSelectedDay(day)
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowDetailsOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowDetailsOverlay(false);
    setSelectedEvent(null);
  };

  const handlePackageClick = (item) => {
    setSelectedPackage(item);
    setShowPackageOverlay(true);
  };

  const handleClosePackageOverlay = () => {
    setShowPackageOverlay(false);
    setSelectedPackage(null);
  };

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Move the renderPackageItem function inside the Dashboard component
  const renderPackageItem = (item) => (
    <div className="package-item-dashboard" key={item.id} onClick={() => handlePackageClick(item)}>
      <img src={item.image} alt={item.packageName} className="image-dashboard" />
      <div className="packagename-dashboard">{item.packageName}</div>
      <div className="detail-container-dashboard">
        <div className="detail-row-dashboard">
          <span className="detail-text-dashboard">{item.totalPrice}</span>
        </div>
        <div className="detail-row-dashboard">
          <span className="detail-text-dashboard">{item.eventType}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-content"> 
      <div className="left-side">
  {selectedDay ? (
    <div className="event-list-dashboard">
      <h3 className="event-list-title">Event List for {`${currentMonth}`}</h3>
      <div className="events-list-container-dashboard-left">
        {selectedDayEvents.map((event, index) => (
          <div className="event-card-dashboard" key={index}>
            <img src={event.cover_photo} alt="Event Cover" className="event-cover-dashboard" />
            <div className="event-info-dashboard">
              <p className="event-name-dashboard">{event.name.charAt(0).toUpperCase() + event.name.slice(1)}</p>
              <div className="event-detail-dashboard">
                <FaCalendar className="event-icon-dashboard" />
                <p className="event-date-dashboard">
                  {new Date(event.date).toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="event-detail-dashboard">
                <IoLocationSharp className="event-icon-dashboard" />
                <p className="event-venue-dashboard">{event.venue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>No events selected</p>
  )}
</div>

        <div className="right-side">
          <div className="calendar">
            <div className="calendar-header">
              <span>{currentMonth}</span>
            </div>
            <div className="calendar-body">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-day-name">
                  {day}
                </div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
  <div
    key={day}
    className={`calendar-day ${monthlyBookings.includes(day) ? 'has-booking' : ''} ${selectedDay === day ? 'selected' : ''}`}
    onClick={() => handleDayClick(day)}
    style={{ position: 'relative' }}
  >
    <span>{day}</span>
    {monthlyBookings.includes(day) && <div className="calendar-booking-dot"></div>}
  </div>
))}

            </div>
          </div>
          <button className="create-event-button" onClick={() => navigate('/create-event')}>
            Create an Event
          </button>
          <button className="events-button" onClick={() => navigate('/events')}>
            Events
          </button>
        </div>
      </div>
      <div className="packages-section-dashboard">
        <h2>Packages</h2>
        <div className="events-list-container-dashboard">
          {packages.map((item) => renderPackageItem(item))}
        </div>
      </div>


      {/* Event Details Overlay */}
      {showDetailsOverlay && selectedEvent && (
        <div className="details-overlay-dashboard">
          <div className="overlay-content-dashboard">
            <div className="event-details-dashboard">
              <h3>{selectedEvent.name}</h3>
              <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p>Pax: {selectedEvent.pax}</p>
              <p>Venue: {selectedEvent.venue}</p>
              <button className="close-button-dashboard" onClick={handleCloseOverlay}>
                Close
              </button>
            </div>
            <div className="image-section-dashboard">
              <img src={require('./images/details.png')} alt="Event Details" style={{ width: '100%', borderRadius: '10px' }} />
            </div>
          </div>
        </div>
      )}

      {/* Package Overlay */}
      {showPackageOverlay && selectedPackage && (
        <div className="details-overlay-dashboard-overlay">
          <div className="overlay-content-dashboard-overlay">
            <button className="close-button-dashboard-overlay" onClick={handleClosePackageOverlay}>
              X
            </button>
            <img src={selectedPackage.image} alt={selectedPackage.packageName} className="image-dashboard-overlay" />
            <h3>{selectedPackage.packageName}</h3>
            <h3>Price: {selectedPackage.totalPrice}</h3>
            <p>{selectedPackage.description}</p>
            <h4>Inclusions:</h4>
            <ul>
              {selectedPackage.services && selectedPackage.services.length > 0 ? (
                selectedPackage.services.map((service, index) => (
                  <li key={index}>{service.serviceName} - ${service.basePrice}</li>
                ))
              ) : (
                <li>No services available</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
