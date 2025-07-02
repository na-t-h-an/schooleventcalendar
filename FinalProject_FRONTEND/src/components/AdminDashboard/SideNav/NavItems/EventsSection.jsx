import React, { useState, useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';
import CreateEvent from './CreateEvent';
import MessageAlert from '../../../EventManager/components/MessageAlert';

export default function EventsSection() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const {
    events,
    fetchEvents,
    loading,
    message,
    handleEdit,
    handleDelete,
    editMode,
    resetForms
  } = useContext(DashboardContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateNew = () => {
    resetForms();
    setShowCreateForm(true);
  };

  const handleBackToList = () => {
    setShowCreateForm(false);
    resetForms();
  };

  if (showCreateForm || editMode) {
    return (
      <div className="section-container">
        <div className="section-header">
          <button className="back-btn" onClick={handleBackToList}>
            ← Back to Events
          </button>
        </div>
        <CreateEvent 
          onBack={handleBackToList} 
          onSuccessUpdate={handleBackToList} 
        />
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="section-header">
        <div className="header-left">
          <h1 className="section-title">Events</h1>
          <p className="section-subtitle">Manage your events and schedules</p>
        </div>
        <button className="create-new-btn" onClick={handleCreateNew}>
          + CREATE NEW
        </button>
      </div>

      <MessageAlert message={message} />

      <div className="content-card">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No Events Found</h3>
            <p>Create your first event to get started.</p>
            <button className="create-new-btn" onClick={handleCreateNew}>
              + CREATE NEW
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.eventId}>
                    <td>{event.eventId}</td>
                    <td>{event.eventName}</td>
                    <td>{event.eventSchedule}</td>
                    <td>
                      <div className="time-cell">
                        <span className="time-range">
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                    </td>
                    <td>{event.eventLocation}</td>
                    <td>
                      <span className={`status-badge ${event.eventIsActive ? 'active' : 'inactive'}`}>
                        {event.eventIsActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            handleEdit(event, 'event');
                            setShowCreateForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(event.eventId, 'event')}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
