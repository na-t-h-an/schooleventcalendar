import { getEvents } from '@/services/api';

export async function fetchEvents(setEvents, setLoading, setMessage) {
  setLoading(true);
  try {
    const response = await getEvents();
    const eventList = Array.isArray(response)
      ? response
      : Array.isArray(response.data)
      ? response.data
      : [];
    setEvents(eventList);
  } catch {
    setMessage('Error fetching events');
    setEvents([]);
  } finally {
    setLoading(false);
  }
}
