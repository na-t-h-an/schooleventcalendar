import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';

export default function CreateEventManager() {
  const {
    formData,
    setFormData,
    handleUserInput,
    handleUserSubmit,
    editMode,
    resetForms,
    setActiveSection,
    message,
  } = useContext(DashboardContext);

  const onChange = (e) => handleUserInput(e, setFormData);

  return (
    <form onSubmit={(e) => handleUserSubmit(e, false)} className="eventManagerForm">
      <h2>{editMode ? 'Edit' : 'Create'} Event Manager</h2>

      {['username', 'password', 'firstname', 'middlename', 'lastname'].map((field) => (
        <div className="formGroup" key={field}>
          <label className="formLabel">{field}</label>
          <input
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            value={formData[field]}
            onChange={onChange}
            required={!(field === 'middlename' || (field === 'password' && editMode))}
            className="formInput"
          />
        </div>
      ))}

      <div className="formActions">
        <button type="submit" className="submitButton">
          {editMode ? 'Update' : 'Create'}
        </button>

        {editMode && (
          <button
            type="button"
            className="cancelButton"
            onClick={() => {
              resetForms();
              setActiveSection('viewEventManagers');
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {message && (
        <div className={message.includes('Error') ? 'errorMessage' : 'successMessage'}>
          {message}
        </div>
      )}
    </form>
  );
}
