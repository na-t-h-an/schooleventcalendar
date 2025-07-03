import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';
import CreateEvent from './CreateEvent';
import Section from '../../components/Section';

export default function EventsSection() {
  const {
    events, fetchEvents, loading, message, handleEdit,
    handleDelete, editMode, resetForms
  } = useContext(DashboardContext);

  return (
    <Section
      title="Events"
      subtitle="Manage your events and schedules"
      icon="📅"
      data={events}
      loading={loading}
      message={message}
      fetchData={fetchEvents}
      resetForms={resetForms}
      editMode={editMode}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      onEditType="event"
      CreateFormComponent={CreateEvent}
      renderTable={(item, actions) => {
        if (!item) {
          return {
            thead: (
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            )
          };
        }

        const { onEdit, onDelete } = actions || {};

        return (
          <tr key={item.eventId}>
            <td>{item.eventId}</td>
            <td>{item.eventName}</td>
            <td>{item.eventSchedule}</td>
            <td>{item.startTime} - {item.endTime}</td>
            <td>{item.eventLocation}</td>
            <td>
              <span className={`status-badge ${item.eventIsActive ? 'active' : 'inactive'}`}>
                {item.eventIsActive ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td>
              <div className="action-buttons">
                <button className="edit-btn" onClick={onEdit}>Edit</button>
                <button className="delete-btn" onClick={onDelete}>Delete</button>
              </div>
            </td>
          </tr>
        );
      }}
    />
  );
}
