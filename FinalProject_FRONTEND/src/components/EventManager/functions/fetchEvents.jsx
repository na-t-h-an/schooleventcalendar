import { getEvents } from '@/services/api';

export const fetchEvents = async (setEvents, setLoading, setMessage) => {
  setLoading(true);
  try {
    const response = await getEvents();
    const eventsData = Array.isArray(response)
      ? response
      : Array.isArray(response.data)
      ? response.data
      : [];
    setEvents(eventsData);
  } catch (error) {
    setMessage('Error: Failed to fetch events');
    setEvents([]);
  } finally {
    setLoading(false);
  }
};
