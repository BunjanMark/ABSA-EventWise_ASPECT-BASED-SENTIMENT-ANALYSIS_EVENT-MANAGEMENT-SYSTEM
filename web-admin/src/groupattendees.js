import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const initialGuests = [
  { id: '1', name: 'John Doe', role: 'Speaker', mobile: '123-456-7890', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', role: 'Attendee', mobile: '098-765-4321', email: 'jane.smith@example.com' },
  { id: '3', name: 'Emily Johnson', role: 'Organizer', mobile: '111-222-3333', email: 'emily.johnson@example.com' },
  { id: '4', name: 'Michael Brown', role: 'Organizer', mobile: '222-333-4444', email: 'michael.brown@example.com' },
  { id: '5', name: 'Sarah Wilson', role: 'Attendee', mobile: '555-666-7777', email: 'sarah.wilson@example.com' },
  { id: '6', name: 'David Lee', role: 'Speaker', mobile: '888-999-0000', email: 'david.lee@example.com' },
  { id: '7', name: 'Laura Smith', role: 'Attendee', mobile: '444-555-6666', email: 'laura.smith@example.com' },
  { id: '8', name: 'Peter Parker', role: 'Organizer', mobile: '777-888-9999', email: 'peter.parker@example.com' },
  { id: '9', name: 'Clark Kent', role: 'Speaker', mobile: '111-111-1111', email: 'clark.kent@example.com' },
  { id: '10', name: 'Bruce Wayne', role: 'Attendee', mobile: '222-222-2222', email: 'bruce.wayne@example.com' },
  { id: '11', name: 'Diana Prince', role: 'Organizer', mobile: '333-333-3333', email: 'diana.prince@example.com' },
  { id: '12', name: 'Barry Allen', role: 'Attendee', mobile: '444-444-4444', email: 'barry.allen@example.com' },
  { id: '13', name: 'Natasha Romanoff', role: 'Organizer', mobile: '555-555-5555', email: 'natasha.romanoff@example.com' },
  { id: '14', name: 'Wade Wilson', role: 'Attendee', mobile: '666-666-6666', email: 'wade.wilson@example.com' },
];

const GroupAttendees = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditGuestModalVisible, setEditGuestModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 10;

  const totalGuests = guests.length;
  const totalPages = Math.ceil(totalGuests / guestsPerPage);

  const handleEditGuest = () => {
    setEditModalVisible(true);
    setEditGuestModalVisible(true);
  };

  const handleDeleteGuest = () => {
    setDeleteModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedGuest) {
      setGuests(guests.map(guest =>
        guest.id === selectedGuest.id ? selectedGuest : guest
      ));
    }
    setEditGuestModalVisible(false);
    setEditModalVisible(false);
  };

  const handleConfirmDelete = () => {
    setGuests(guests.filter(guest => guest.id !== selectedGuest.id));
    setDeleteModalVisible(false);
    setEditModalVisible(false);
  };

  const renderItem = (item) => (
    <tr key={item.id} onClick={() => { setSelectedGuest(item); setEditModalVisible(true); }} className="row-groupattendee">
      <td className="cell-groupattendee cellNo-groupattendee">{item.id}</td>
      <td className="cell-groupattendee cellName-groupattendee">{item.name}</td>
      <td className="cell-groupattendee cellRole-groupattendee">{item.role}</td>
      <td className="cell-groupattendee cellMobile-groupattendee">{item.mobile}</td>
      <td className="cell-groupattendee cellEmail-groupattendee">{item.email}</td>
    </tr>
  );

  // Get current guests for the page
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest);

  return (
    <div className="container-groupattendee">
      <h1 className="headerText-groupattendee">Group Attendees</h1>
      <div className="line-groupattendee"></div>
      <h2 className="eventTypesText-groupattendee">People In Event</h2>
      <div className="tableContainer-groupattendee">
        <table className="table-groupattendee">
          <thead>
            <tr className="headerRow-groupattendee">
              <th className="headerCell-groupattendee headerNo-groupattendee">No.</th>
              <th className="headerCell-groupattendee headerName-groupattendee">Name</th>
              <th className="headerCell-groupattendee headerRole-groupattendee">Role</th>
              <th className="headerCell-groupattendee headerMobile-groupattendee">Mobile Number</th>
              <th className="headerCell-groupattendee headerEmail-groupattendee">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map(renderItem)}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &lt; 
        </button>
        <span className="pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
           &gt;
        </button>
      </div>

      {/* Edit/Delete Modal */}
      {isEditModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h2 className="modalTitle-groupattendee">Edit or Delete Guest</h2>
            <button onClick={handleEditGuest} className="edit">Edit Guest</button>
            <button onClick={handleDeleteGuest} className="delete">Delete Guest</button>
            <button onClick={() => setEditModalVisible(false)} className="close">Close</button>
          </div>
        </div>
      )}
      {/* Edit Guest Modal */}
      {isEditGuestModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h2 className="modalTitle-groupattendee">Edit Guest</h2>
            <input
              className="input-groupattendee"
              placeholder="Name"
              value={selectedGuest?.name || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, name: e.target.value })}
            />
            <input
              className="input-groupattendee"
              placeholder="Role"
              value={selectedGuest?.role || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, role: e.target.value })}
            />
            <input
              className="input-groupattendee"
              placeholder="Mobile Number"
              value={selectedGuest?.mobile || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, mobile: e.target.value })}
            />
            <input
              className="input-groupattendee"
              placeholder="Email"
              value={selectedGuest?.email || ''}
              onChange={(e) => setSelectedGuest({ ...selectedGuest, email: e.target.value })}
            />
            <button onClick={handleSaveEdit} className="edit">Save</button>
            <button onClick={() => setEditGuestModalVisible(false)} className="close">Close</button>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalVisible && (
        <div className="modal-groupattendee">
          <div className="modalContent-groupattendee">
            <h2 className="modalTitle-groupattendee">Are you sure you want to delete this guest?</h2>
            <button onClick={handleConfirmDelete} className="delete">Delete</button>
            <button onClick={() => setDeleteModalVisible(false)} className="close">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupAttendees;
