import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';

export default function CreateEvent() {
  const {
    eventData, setEventData, handleUserInput,
    handleEventSubmit, editMode, resetForms, setActiveSection
  } = useContext(DashboardContext);

  return (
    <form onSubmit={handleEventSubmit} className="eventManagerForm">
      <h2>{editMode ? 'Edit' : 'Create'} Event</h2>
      {['eventName', 'eventDescription', 'eventSchedule', 'startTime', 'endTime', 'eventLocation'].map(field => (
        <div className="formGroup" key={field}>
          <label className="formLabel">{field}</label>
          <input
            type={field.includes('Time') ? 'time' : field.includes('Schedule') ? 'date' : 'text'}
            name={field}
            value={eventData[field]}
            onChange={(e) => handleUserInput(e, setEventData)}
            required
            className="formInput"
          />
        </div>
      ))}
      <div className="formActions">
        <button type="submit" className="submitButton">{editMode ? 'Update' : 'Create'}</button>
        {editMode && (
          <button type="button" className="cancelButton" onClick={() => {
            resetForms();
            setActiveSection('viewEvents');
          }}>Cancel</button>
        )}
      </div>
    </form>
  );
}
