import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarker, faHeart, faSearch, faChevronDown, faEllipsisV, faUser, faClipboardCheck, faBox, faCommentDots, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Events() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('All');
  const [showMenu, setShowMenu] = useState({});
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
      setFilteredEvents(events);
    }
  };

  const handleEquipmentClick = (eventId) => {
    navigate('/equipment', { state: { eventId } });
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

  const toggleMenu = (eventId) => {
    setShowMenu((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const renderEventItem = (item) => {
    const sampleImage = item.id % 3 === 0 ? 'event1.png' : (item.id % 2 === 0 ? 'event2.png' : 'event3.png');

    return (
      <div key={item.id} className="item-container-events">
        <img src={require(`./images/${sampleImage}`)} alt={item.name} className="image-events" />
        <h3 className="title-events">{item.name}</h3>
        <div className="detail-container-events">
          <div className="detail-row-events">
            <FontAwesomeIcon icon={faCalendar} size="lg" color="#2A93D5" />
            <span className="detail-text-events">{item.date}</span>
          </div>
          <div className="detail-row-events">
            <FontAwesomeIcon icon={faMapMarker} size="lg" color="#2A93D5" />
            <span className="detail-text-events">{item.venue}</span>
          </div>
        </div>
        <button
          className={`heart-icon-events ${likedEvents[item.id] ? 'heart-liked-events' : ''}`}
          onClick={() => toggleLike(item.id)}
        >
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </button>

        {/* Three Dots Menu for each event */}
        <div className="dots-container-events" onClick={() => toggleMenu(item.id)}>
          <FontAwesomeIcon icon={faEllipsisV} size="lg" />
        </div>
        {showMenu[item.id] && (
          <div className="menu-overlay-events">
            <div className="menu-item-events" onClick={() => navigate('/attendees')}>
              <FontAwesomeIcon icon={faUser} /> Attendee
            </div>
            <div className="menu-item-events" onClick={() => navigate('/inventory')}>
              <FontAwesomeIcon icon={faBox} /> Inventory
            </div>
            <div className="menu-item-events" onClick={() => handleEquipmentClick(item.id)}>
              <FontAwesomeIcon icon={faBox} /> Equipment
            </div>
            <div className="menu-item-events" onClick={() => navigate('/feedback/feedback-events')}>
              <FontAwesomeIcon icon={faCommentDots} /> Feedback
            </div>
            <div className="menu-item-events" onClick={() => navigate('/group-attendees')}>
              <FontAwesomeIcon icon={faUserFriends} /> Guest
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gradient-container-events">
      <div className="container-events">
        <div className="search-container-events">
          <FontAwesomeIcon icon={faSearch} size="lg" color="#888" className="search-icon-events" />
          <input
            type="text"
            className="search-box-events"
            placeholder="Search Event"
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <div className="dropdown-container-events">
            <button className="dropdown-btn-events">
              Sort by: {sortOption} <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <div className="dropdown-content-events">
              <div onClick={() => filterEventsByDate('All')}>All</div>
              <div onClick={() => filterEventsByDate('This Week')}>This Week</div>
              <div onClick={() => filterEventsByDate('Next Week')}>Next Week</div>
            </div>
          </div>
        </div>
        <div className="event-list-events">
          {filteredEvents.map(renderEventItem)}
        </div>
      </div>
    </div>
  );
}

export default Events;
