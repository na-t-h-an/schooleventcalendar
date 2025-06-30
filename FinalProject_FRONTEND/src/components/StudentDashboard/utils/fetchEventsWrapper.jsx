import { getEvents } from '@/services/api';

export const fetchEventsWrapper = (setEvents, setLoading, setMessage) => {
  setLoading(true);
  getEvents()
    .then(res => {
      const eventsData = Array.isArray(res)
        ? res
        : Array.isArray(res.data)
        ? res.data
        : [];
      setEvents(eventsData);
    })
    .catch(() => {
      setMessage('Error: Failed to fetch events');
      setEvents([]);
    })
    .finally(() => setLoading(false));
};
