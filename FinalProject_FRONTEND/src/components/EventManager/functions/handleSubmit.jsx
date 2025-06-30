import { postEvent, putEvent } from '@/services/api';

export const handleSubmit = async ({
  e,
  formData,
  editMode,
  editEventId,
  setMessage,
  fetchEventsWrapper,
  clearForm,
  navigate
}) => {
  e.preventDefault();

  const payload = {
    eventName: formData.title,
    eventDescription: formData.description,
    eventSchedule: formData.eventDate,
    startTime: formData.startTime + ":00",
    endTime: formData.endTime + ":00",
    eventLocation: formData.location,
    eventIsActive: true
  };

  try {
    if (editMode && editEventId) {
      await putEvent(editEventId, payload);
      setMessage('Event updated successfully!');
    } else {
      await postEvent(payload);
      setMessage('Event created successfully!');
    }

    await fetchEventsWrapper();
    clearForm();
    navigate('/schooleventcalendar/eventmanager/managevent');
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }

  setTimeout(() => setMessage(''), 3000);
};
