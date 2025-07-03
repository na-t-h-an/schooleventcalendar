import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';
import CreateEventManager from './CreateEventManager';
import Section from '../../components/Section';

export default function EventManagerSection() {
  const {
    eventManagers, fetchEventManagers, loading, message, handleEdit,
    handleDelete, editMode, resetForms
  } = useContext(DashboardContext);

  return (
    <Section
      title="Event Managers"
      subtitle="Manage your event manager accounts"
      icon="👥"
      data={eventManagers}
      loading={loading}
      message={message}
      fetchData={fetchEventManagers}
      resetForms={resetForms}
      editMode={editMode}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      onEditType="eventManager"
      CreateFormComponent={CreateEventManager}
      renderTable={(item, actions) => {
        if (!item) {
          return {
            thead: (
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            )
          };
        }

        const { onEdit, onDelete } = actions || {};

        return (
          <tr key={item.userId}>
            <td>{item.userId}</td>
            <td>{item.username}</td>
            <td>{item.firstname}</td>
            <td>{item.middlename || '-'}</td>
            <td>{item.lastname}</td>
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
