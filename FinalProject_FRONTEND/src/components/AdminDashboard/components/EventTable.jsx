import React from 'react';

const EventTable = ({ items = [], type, onEdit, onDelete }) => (
  <table className="dataTable">
    <thead>
      <tr>
        {type === 'event' ? (
          <>
            <th>ID</th><th>Title</th><th>Date</th><th>Start</th><th>End</th><th>Location</th><th>Status</th><th>Actions</th>
          </>
        ) : (
          <>
            <th>ID</th><th>Username</th><th>First</th><th>Middle</th><th>Last</th><th>Actions</th>
          </>
        )}
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.eventId ?? item.userId ?? Math.random()}>
          {type === 'event' ? (
            <>
              <td>{item.eventId}</td>
              <td>{item.eventName}</td>
              <td>{item.eventSchedule}</td>
              <td>{item.startTime}</td>
              <td>{item.endTime}</td>
              <td>{item.eventLocation}</td>
              <td>{item.eventIsActive ? 'Active' : 'Inactive'}</td>
            </>
          ) : (
            <>
              <td>{item.userId}</td>
              <td>{item.username}</td>
              <td>{item.firstname}</td>
              <td>{item.middlename || '-'}</td>
              <td>{item.lastname}</td>
            </>
          )}
          <td className="actionButtons">
            <button className="editButton" onClick={() => onEdit(item)}>Edit</button>
            <button className="deleteButton" onClick={() => onDelete(item.eventId ?? item.userId)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EventTable;
