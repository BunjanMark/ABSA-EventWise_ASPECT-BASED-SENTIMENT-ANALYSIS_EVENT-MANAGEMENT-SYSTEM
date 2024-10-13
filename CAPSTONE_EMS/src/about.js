import React, { useState } from 'react';
import './App.css';

const About = () => {
  const [selectedEvent, setSelectedEvent] = useState('A&A Events');
  const [fade, setFade] = useState(false); // State to handle fade animation

  const descriptions = {
    'A&A Events': 'A&A Events is committed to providing the best possible experience for both customers and service providers. I am Dedicated to creating a welcoming inclusive atmosphere that celebrates diversity & promotes cultural exchange. With continuing to set the standard for event organization and curation in the world event community.',
    'EventWise': 'EventWise is committed to providing the best possible experience for both customers and service providers. I am Dedicated to creating a welcoming inclusive atmosphere that celebrates diversity & promotes cultural exchange. With continuing to set the standard for event organization and curation in the world event community.'
  };

  const handleEventChange = (event) => {
    setFade(true);
    setTimeout(() => {
      setSelectedEvent(event);
      setFade(false); // Remove fade class after the new description is set
    }, 500); // Duration matches the fade-out animation
  };

  return (
    <div className="about-container-about">
      <h1 className="about-header-about">About</h1>
      <div className="event-buttons-about">
        <button
          onClick={() => handleEventChange('A&A Events')}
          className={selectedEvent === 'A&A Events' ? 'active-button-about' : ''}
        >
          A&A Events
        </button>
        <button
          onClick={() => handleEventChange('EventWise')}
          className={selectedEvent === 'EventWise' ? 'active-button-about' : ''}
        >
          EventWise
        </button>
      </div>
      <div className={`description-container-about ${fade ? 'fade-out-about' : 'fade-in-about'}`}>
        <p className="description-text-about">
          {descriptions[selectedEvent]}
        </p>
      </div>
    </div>
  );
};

export default About;
