const StudentEventModal = ({ event, onJoin, onClose }) => {
  if (!event) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h4>{event.title}</h4>
        <p><strong>Start:</strong> {event.start.toLocaleString()}</p>
        <p><strong>End:</strong> {event.end.toLocaleString()}</p>
        <p><strong>Location:</strong> {event.extendedProps.location}</p>
        <p><strong>Description:</strong> {event.extendedProps.description}</p>
        <p><strong>Status:</strong> {event.extendedProps.status}</p>
        <div>
          <button className="joinButton" onClick={() => onJoin(event.id)}>Join</button>
          <button className="leaveButton" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default StudentEventModal;
