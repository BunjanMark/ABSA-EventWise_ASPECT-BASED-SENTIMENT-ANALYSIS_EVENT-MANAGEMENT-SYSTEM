import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling

// Import images using require
const eventsData = [
  { id: '1', title: 'Mr. & Mrs. Malik Wedding', image: require('./images/event1.png'), date: '2024-07-01', address: 'CDO', attendees: 150 },
  { id: '2', title: 'Elizabeth Birthday', image: require('./images/event2.png'), date: '2024-08-12', address: 'CDO', attendees: 80 },
  { id: '3', title: 'Class of 1979 Reunion', image: require('./images/event3.png'), date: '2024-09-25', address: 'CDO', attendees: 200 },
  { id: '4', title: 'Corporate Party', image: require('./images/event1.png'), date: '2024-10-30', address: 'CDO', attendees: 120 },
  { id: '5', title: 'Annual Gala', image: require('./images/event2.png'), date: '2024-11-15', address: 'CDO', attendees: 300 },
  { id: '6', title: 'New Year Celebration', image: require('./images/event3.png'), date: '2024-12-31', address: 'CDO', attendees: 500 },
  { id: '7', title: 'Music Festival', image: require('./images/event1.png'), date: '2024-06-22', address: 'CDO', attendees: 1000 },
  { id: '8', title: 'Art Exhibition', image: require('./images/event2.png'), date: '2024-07-05', address: 'CDO', attendees: 150 },
];

const Group = () => {
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate('/group-attendees');
  };

  return (
    <div className="container-group">
      <h1 className="title-group">Groups</h1>
      <div className="fading-line-group"></div>
      <div className="content-group">
        <div className="left-section-group">
          {eventsData.slice(0, 5).map(event => (
            <div key={event.id} className="event-item-group" onClick={handleEventClick}>
              <img src={event.image} alt={event.title} className="event-image-group" />
              <div className="event-details-group">
                <h3 className="event-title-group">{event.title}</h3>
                <p className="event-date-group">
                  <span className="icon-group">&#128197;</span> {/* Calendar icon */}
                  {event.date}
                </p>
                <div className="event-location-group">
                  <span className="icon-group">&#127968;</span> {/* Location icon */}
                  <p className="event-address-group">{event.address}</p>
                </div>
              </div>
              <div className="attendance-container-group">
                <p className="attendance-text-group">{event.attendees} Attendees</p>
              </div>
            </div>
          ))}
        </div>

        <div className="middle-line-group"></div>

        <div className="right-section-group">
          {eventsData.slice(5).map(event => (
            <div key={event.id} className="event-item-group" onClick={handleEventClick}>
              <img src={event.image} alt={event.title} className="event-image-group" />
              <div className="event-details-group">
                <h3 className="event-title-group">{event.title}</h3>
                <p className="event-date-group">
                  <span className="icon-group">&#128197;</span> {/* Calendar icon */}
                  {event.date}
                </p>
                <div className="event-location-group">
                  <span className="icon-group">&#127968;</span> {/* Location icon */}
                  <p className="event-address-group">{event.address}</p>
                </div>
              </div>
              <div className="attendance-container-group">
                <p className="attendance-text-group">{event.attendees} Attendees</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
