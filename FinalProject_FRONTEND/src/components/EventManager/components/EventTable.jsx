const EventTable = ({ events, onEdit, onDelete }) => (
  <table className="dataTable">
    <thead>
      <tr>
        <th>ID</th><th>Title</th><th>Date</th><th>Start</th><th>End</th><th>Location</th><th>Status</th><th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {events.map(event => (
        <tr key={event.eventId}>
          <td>{event.eventId}</td>
          <td>{event.eventName}</td>
          <td>{event.eventSchedule}</td>
          <td>{event.startTime}</td>
          <td>{event.endTime}</td>
          <td>{event.eventLocation}</td>
          <td>{event.eventIsActive ? 'Active' : 'Inactive'}</td>
          <td className="actionButtons">
            <button className="editButton" onClick={() => onEdit(event)}>Edit</button>
            <button className="deleteButton" onClick={() => onDelete(event.eventId)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EventTable;
