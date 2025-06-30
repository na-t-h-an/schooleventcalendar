import React from 'react';

const EventForm = ({ formData, onChange, onSubmit, onClear, editMode }) => (
  <form onSubmit={onSubmit} className="formContainer">
    <input name="title" value={formData.title} onChange={onChange} placeholder="Title" required />
    <textarea name="description" value={formData.description} onChange={onChange} placeholder="Description" rows="3" required />
    <input type="date" name="eventDate" value={formData.eventDate} onChange={onChange} required />
    <input type="time" name="startTime" value={formData.startTime} onChange={onChange} required />
    <input type="time" name="endTime" value={formData.endTime} onChange={onChange} required />
    <input name="location" value={formData.location} onChange={onChange} placeholder="Location" required />
    
    <div className="formActions">
      <button type="submit" className="submitButton">{editMode ? 'Update' : 'Create'} Event</button>
      <button type="button" onClick={onClear} className="clearButton">Clear</button>
    </div>
  </form>
);

export default EventForm;
