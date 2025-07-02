import React, { useState, useContext, useEffect } from 'react';
import { DashboardContext } from '../../DashboardContext';
import CreateEventManager from './CreateEventManager';
import MessageAlert from '../../../EventManager/components/MessageAlert';

export default function EventManagerSection() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const {
    eventManagers,
    fetchEventManagers,
    loading,
    message,
    handleEdit,
    handleDelete,
    editMode,
    resetForms
  } = useContext(DashboardContext);

  useEffect(() => {
    fetchEventManagers();
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
            ← Back to Event Managers
          </button>
        </div>
        <CreateEventManager onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="section-header">
        <div className="header-left">
          <h1 className="section-title">Event Managers</h1>
          <p className="section-subtitle">Manage your event manager accounts</p>
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
            <p>Loading event managers...</p>
          </div>
        ) : eventManagers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No Event Managers Found</h3>
            <p>Create your first event manager to get started.</p>
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
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {eventManagers.map(manager => (
                  <tr key={manager.userId}>
                    <td>{manager.userId}</td>
                    <td>{manager.username}</td>
                    <td>{manager.firstname}</td>
                    <td>{manager.middlename || '-'}</td>
                    <td>{manager.lastname}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn"
                          onClick={() => {
                            handleEdit(manager, 'eventManager');
                            setShowCreateForm(true);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDelete(manager.userId, 'eventManager')}
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
