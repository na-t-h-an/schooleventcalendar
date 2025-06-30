const StudentEventTable = ({ events, type, onAction }) => (
  <table className="dataTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Date</th>
        <th>Location</th>
        {type === 'joined' ? <th>Actions</th> : <th>Status</th>}
        {type !== 'joined' && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {events.map(event => (
        <tr key={event.eventId}>
          <td>{event.eventId}</td>
          <td>{event.eventName}</td>
          <td>{event.eventSchedule}</td>
          <td>{event.eventLocation}</td>
          {type === 'joined' ? (
            <>
              <td>
                <button className="leaveButton" onClick={() => onAction(event.eventId)}>
                  Leave
                </button>
              </td>
            </>
          ) : (
            <>
              <td>{event.eventIsActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="joinButton" onClick={() => onAction(event.eventId)}>
                  Join
                </button>
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default StudentEventTable;
