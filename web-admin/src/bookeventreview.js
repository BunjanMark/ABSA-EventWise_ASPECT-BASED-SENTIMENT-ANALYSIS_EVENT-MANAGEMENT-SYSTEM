import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import './App.css';

const BookEventReview = () => {
    const [eventDetails, setEventDetails] = useState({
        eventName: 'Birthday Celebration',
        eventType: 'Private Party',
        date: '2024-12-31',
        pax: 100,
        venue: 'City Hall',
    });

    const [isEditing, setIsEditing] = useState(false);

    const packageDetails = {
        id: '1',
        packagename: 'Package A',
        image: require('./images/package1.png'),
    };

    const renderEditableField = (label, value, field) => (
        <div className="field-reviewevent">
            <span className="label-reviewevent">{label}:</span>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(field, e.target.value)}
                        className="editable-input-reviewevent"
                    />
                </>
            ) : (
                <div className="value-reviewevent">{value}</div>
            )}
            <FaPencilAlt
                className="edit-icon-reviewevent"
                onClick={() => setIsEditing(!isEditing)}
            />
        </div>
    );

    const handleFieldChange = (field, value) => {
        setEventDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

    return (
        <div className="book-event-review-container-reviewevent">
            <h2 className="event-details-title-reviewevent">Event Details</h2>
            <div className="content-reviewevent">
                {/* Left side: Editable event details */}
                <div className="event-details-left-reviewevent">
                    {renderEditableField("Event Name", eventDetails.eventName, "eventName")}
                    {renderEditableField("Event Type", eventDetails.eventType, "eventType")}
                    {renderEditableField("Date", eventDetails.date, "date")}
                    {renderEditableField("Pax", eventDetails.pax, "pax")}
                    {renderEditableField("Venue", eventDetails.venue, "venue")}
                    {isEditing && (
                        <button onClick={handleSaveChanges} className="save-button-reviewevent">
                            Save Changes
                        </button>
                    )}
                </div>

                {/* Right side: Package details */}
                <div className="event-details-right-reviewevent">
                    <h3>{packageDetails.packagename}</h3>
                    <img
                        src={packageDetails.image}
                        alt={packageDetails.packagename}
                        className="package-image-reviewevent"
                    />
                </div>
            </div>
        </div>
    );
};

export default BookEventReview;
