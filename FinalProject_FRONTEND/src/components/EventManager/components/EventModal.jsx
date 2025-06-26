import React from 'react';

const EventModal = ({ event, onClose, onEdit }) => {
  if (!event) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>×</button>
        <h3>{event.eventName}</h3>
        <p><strong>Start:</strong> {event.eventSchedule} {event.startTime}</p>
        <p><strong>End:</strong> {event.eventSchedule} {event.endTime}</p>
        <p><strong>Location:</strong> {event.eventLocation}</p>
        <p><strong>Description:</strong> {event.eventDescription}</p>
        <p><strong>Status:</strong> {event.eventIsActive ? 'Active' : 'Inactive'}</p>
        <div style={{ marginTop: '15px' }}>
          <button className="editButton" onClick={onEdit}>Edit</button>
          <button className="deleteButton" onClick={onClose} style={{ marginLeft: '10px' }}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
