import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext.jsx';
import { handleSubmit } from '../../EventManager/functions'; // ✅ Import shared handleSubmit
import EventForm from '../../EventManager/components/EventForm';

export default function CreateEvent({ onBack }) {
  const {
    eventData,
    setEventData,
    editMode,
    editId,
    resetForms,
    fetchEvents,
    setActiveSection,
    message,
    setMessage
  } = useContext(DashboardContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Setup form fields correctly for both create and edit
  useEffect(() => {
    if (editMode) {
      setEventData(prev => ({
        title: prev.eventName || '',
        description: prev.eventDescription || '',
        eventDate: prev.eventSchedule || '',
        startTime: prev.startTime || '',
        endTime: prev.endTime || '',
        location: prev.eventLocation || ''
      }));
    } else {
      setEventData({
        title: '',
        description: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        location: ''
      });
    }
  }, [editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    resetForms();
    setActiveSection('events');
    onBack();
  };

  return (
    <div className="section-container">
      <div className="create-event-form-wrapper">
        <EventForm
          formData={eventData}
          onChange={handleChange}
          onSubmit={(e) =>
            handleSubmit({
              e,
              formData: eventData,
              editMode,
              editEventId: editId,
              setMessage,
              fetchEventsWrapper: fetchEvents,
              clearForm: handleClear,
              navigate: () => {} // fix to stop me to going into // navigate('/schooleventcalendar/eventmanager/managevent');
            })
          }
          onClear={handleClear}
          editMode={editMode}
        />
      </div>
    </div>
  );
}
