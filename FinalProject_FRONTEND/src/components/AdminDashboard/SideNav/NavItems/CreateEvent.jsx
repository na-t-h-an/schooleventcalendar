import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../DashboardContext';
import { postEvent, putEvent } from '../../../../services/api';
import EventForm from '../../components/EventForm';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        eventName: eventData.title,
        eventDescription: eventData.description,
        eventSchedule: eventData.eventDate,
        startTime: eventData.startTime + ':00',
        endTime: eventData.endTime + ':00',
        eventLocation: eventData.location,
        eventIsActive: true
      };

      if (editMode) {
        await putEvent(editId, payload);
        setMessage('✅ Event updated successfully!');
      } else {
        await postEvent(payload);
        setMessage('✅ Event created successfully!');
      }

      resetForms();
      fetchEvents();
      setActiveSection('events');
      onBack(); // ✅ go back to table view
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('❌ Something went wrong.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleClear = () => {
    resetForms();
    setActiveSection('events');
    onBack();
  };

  return (
    <EventForm
      formData={eventData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClear={handleClear}
      editMode={editMode}
    />
  );
}
