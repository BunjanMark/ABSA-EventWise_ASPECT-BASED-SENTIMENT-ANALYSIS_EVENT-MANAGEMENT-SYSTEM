import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faHeart, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Events() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('All'); // New state for sorting option
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events data:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to handle sorting/filtering events
  const filterEventsByDate = (option) => {
    setSortOption(option);

    if (option === 'This Week') {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.date);
        const today = new Date();
        const weekEnd = new Date();
        weekEnd.setDate(today.getDate() + 7);
        return eventDate >= today && eventDate <= weekEnd;
      });
      setFilteredEvents(filtered);
    } else if (option === 'Next Week') {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.date);
        const today = new Date();
        const nextWeekStart = new Date();
        nextWeekStart.setDate(today.getDate() + 7);
        const nextWeekEnd = new Date();
        nextWeekEnd.setDate(today.getDate() + 14);
        return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
      });
      setFilteredEvents(filtered);
    } else {
      // "All" option
      setFilteredEvents(events);
    }
  };

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

  const toggleLike = (eventId) => {
    setLikedEvents((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const isFutureEvent = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj > today;
  };

  const isPastEvent = (eventDate) => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < today;
  };

  const handleEquipmentClick = (eventId) => {
    navigate('/equipment', { state: { eventId } });
  };

  const renderEventItem = (item) => {
    const sampleImage = item.id % 3 === 0 ? 'event1.png' : (item.id % 2 === 0 ? 'event2.png' : 'event3.png');

    return (
      <div key={item.id} className="item-container">
        <img src={require(`./images/${sampleImage}`)} alt={item.name} className="image" />
        <h3 className="title">{item.name}</h3>
        <div className="detail-container">
          <div className="detail-row">
            <FontAwesomeIcon icon={faCalendar} size="lg" color="#2A93D5" />
            <span className="detail-text">{item.date}</span>
          </div>
          <div className="detail-row">
            <FontAwesomeIcon icon={faMapMarker} size="lg" color="#2A93D5" />
            <span className="detail-text">{item.venue}</span>
          </div>
        </div>
        <button
          className={`heart-icon ${likedEvents[item.id] ? 'heart-liked' : ''}`}
          onClick={() => toggleLike(item.id)}
        >
          <FontAwesomeIcon icon={likedEvents[item.id] ? faHeart : faHeart} size="lg" />
        </button>
        <div className="buttons-container">
          {isFutureEvent(item.date) && (
            <>
              <button
                className="button"
                onClick={() => navigate('/edit')}
              >
                Edit
              </button>
              <button
                className="button"
                onClick={() => handleEquipmentClick(item.id)}
              >
                Equipment
              </button>
            </>
          )}
          {isPastEvent(item.date) && (
            <>
              <button
                className="button"
                onClick={() => navigate('/inventory')}
              >
                Inventory
              </button>
              <button
                className="button"
                onClick={() => navigate('/attendees')}
              >
                Attendees
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gradient-container-events">
      <div className="container">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon" />
          <input
            type="text"
            className="search-box"
            placeholder="Search Event"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <div className="dropdown-container">
            <button className="dropdown-btn">
              Sort by: {sortOption} <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="dropdown-content">
              <div onClick={() => filterEventsByDate('All')}>All</div>
              <div onClick={() => filterEventsByDate('This Week')}>This Week</div>
              <div onClick={() => filterEventsByDate('Next Week')}>Next Week</div>
            </div>
          </div>
        </div>
        <div className="event-list">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>
    </div>
  );
}

export default Events;
