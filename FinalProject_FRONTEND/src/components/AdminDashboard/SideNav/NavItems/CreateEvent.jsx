import React, { useContext } from 'react';
import { DashboardContext } from '../../DashboardContext';
import { CreateEventPage } from '../../../EventManager/pages';

export default function CreateEvent() {
  const {
    eventData,
    setEventData,
    message,
    editMode,
    handleEventSubmit,
    resetForms
  } = useContext(DashboardContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CreateEventPage
      editMode={editMode}
      message={message}
      formData={eventData}
      handleInputChange={handleInputChange}
      submitHandler={handleEventSubmit}
      clearAll={resetForms}
    />
  );
}
