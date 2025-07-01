import { deleteEvent } from '@/services/api';

export const handleDelete = async (eventId, setMessage, fetchEventsWrapper) => {
  if (!window.confirm('Are you sure you want to delete this event?')) return;
  try {
    await deleteEvent(eventId);
    setMessage('Event deleted successfully!');
    await fetchEventsWrapper();
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
  setTimeout(() => setMessage(''), 3000);
};
