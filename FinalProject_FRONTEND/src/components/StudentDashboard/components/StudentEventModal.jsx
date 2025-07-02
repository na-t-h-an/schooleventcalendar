const StudentEventModal = ({ event, onJoin, onClose }) => {
  if (!event) return null;

  const start = event.start ? new Date(event.start).toLocaleString() : 'N/A';
  const end = event.end ? new Date(event.end).toLocaleString() : 'N/A';
  const location = event.extendedProps?.location || 'N/A';
  const description = event.extendedProps?.description || 'N/A';
  const status = event.extendedProps?.status || 'N/A';

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h4>{event.title || 'No Title'}</h4>
        <p><strong>Start:</strong> {start}</p>
        <p><strong>End:</strong> {end}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Description:</strong> {description}</p>
        <p><strong>Status:</strong> {status}</p>
        <div>
          <button className="joinButton" onClick={() => onJoin(event.id)}>Join</button>
          <button className="leaveButton" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default StudentEventModal;
