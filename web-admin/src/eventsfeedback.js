import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2'; 
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend } from 'chart.js';
import API_URL from './apiconfig';

// Register the necessary chart elements
ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

function EventsFeedback() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]); 
  const [feedbacks, setFeedbacks] = useState([]); 
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [showModal, setShowModal] = useState(false); 
  const [selectedEventFeedback, setSelectedEventFeedback] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventsAndFeedbacks = async () => {
      try {
        const eventResponse = await axios.get(`${API_URL}/api/events`);
        const feedbackResponse = await axios.get('https://eventwise-eventmanagementsystem.onrender.com/get_feedback');
        
        setEvents(eventResponse.data);
        setFeedbacks(feedbackResponse.data);
        setFilteredEvents(eventResponse.data);  
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsAndFeedbacks();
  }, []); 

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const newData = events.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
    } else {
      setFilteredEvents(events);  
    }
  };

  const handleDelete = (eventId) => {
    const newData = filteredEvents.filter((item) => item.id !== eventId);
    setFilteredEvents(newData);
  };

  const handleOpenModal = (eventId) => {
    const feedbackForEvent = feedbacks.find(feedback => feedback.event_id === eventId);
    setSelectedEventFeedback(feedbackForEvent);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEventFeedback(null); 
  };

  const renderEventItem = (item) => {
    const feedback = feedbacks.find(f => f.event_id === item.id);
  
    const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
  
    if (feedback && feedback.overall_sentiment) {
      sentimentCounts[feedback.overall_sentiment] = 1; 
    }
  
    return (
      <div key={item.id} className="item-container-eventfeedback">
        <div className="pie-chart-container-eventfeedback">
          {feedback ? (
            <Pie
              data={{
                labels: ['Positive', 'Negative', 'Neutral'],
                datasets: [
                  {
                    data: [
                      sentimentCounts.positive,
                      sentimentCounts.negative,
                      sentimentCounts.neutral,
                    ],
                    backgroundColor: ['green', 'red', 'yellow'],
                    hoverBackgroundColor: ['green', 'red', 'yellow'],
                  },
                ],
              }}
              options={{
                width: 150,
                height: 150,
                maintainAspectRatio: false,
              }}
            />
          ) : (
            <div className="no-feedback-message">No feedback available</div>
          )}
        </div>
        <h3 className="title-eventfeedback">{item.name}</h3>
        <div className="detail-container-eventfeedback">
          <div className="detail-row-eventfeedback">
            <FontAwesomeIcon icon={faCalendar} size="lg" color="#eeba2b" />
            <span className="detail-text-eventfeedback">{item.date}</span>
          </div>
          <div className="detail-row-eventfeedback">
            <FontAwesomeIcon icon={faMapMarker} size="lg" color="#eeba2b" />
            <span className="detail-text-eventfeedback">{item.location}</span>
          </div>
        </div>
        <div className="buttons-container-eventfeedback">
          <button
            className="button-eventfeedback"
            onClick={() => handleOpenModal(item.id)} 
          >
            Feedback
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="gradient-container-eventfeedback">
      <div className="container-eventfeedback">
        <div className="search-container-eventfeedback">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon-eventfeedback" />
          <input
            type="text"
            className="search-box-eventfeedback"
            placeholder="Search Event"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="event-list-eventfeedback">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>

      {/* Modal Overlay for Feedback */}
      {showModal && selectedEventFeedback && (
  <div className="overlay-feedback">
    <div className="modal-feedback">
      <button className="close-button-feedback" onClick={handleCloseModal}>X</button>
      <div className="feedback-content">
        {/* Find the event by event_id */}
        {events && events.length > 0 &&
          events.map(event => {
            if (event.id === selectedEventFeedback.event_id) {
              return (
                <div key={event.id}>
                  <h3>Feedback for Event: {event.name}</h3>
                  
                  {/* Dynamically Render All Service Providers and Their Sentiments */}
                  {Object.entries(selectedEventFeedback).map(([key, value]) => {
                    if (key.includes('sentiment') && value?.label) {
                      const serviceName = key.replace('_sentiment', '').replace(/([A-Z])/g, ' $1'); // Make it more readable
                      const formattedServiceName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1); // Capitalize first letter of serviceName

                      let sentimentColor;
                      if (value.label === 'positive') sentimentColor = 'green';
                      else if (value.label === 'negative') sentimentColor = 'red';
                      else if (value.label === 'neutral') sentimentColor = '#e9d700';

                      const formattedLabel = value.label.charAt(0).toUpperCase() + value.label.slice(1); // Capitalize first letter of label

                      return (
                        <div key={key}>
                          <h4>
                            {`${formattedServiceName} Sentiment: `}
                            <span style={{ color: sentimentColor }}>
                              {formattedLabel || "N/A"}
                            </span>
                          </h4>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            }
            return null;
          })
        }
      </div>
    </div>
  </div>
)}




    </div>
  );
}

export default EventsFeedback;
