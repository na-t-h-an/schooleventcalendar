import { getJoinedEvents } from '@/services/api';

export const fetchJoinedEventsWrapper = (username, setJoinedEvents, setLoading, setMessage) => {
  setLoading(true);
  getJoinedEvents(username)
    .then(res => {
      setJoinedEvents(Array.isArray(res) ? res : []);
    })
    .catch(() => {
      setMessage('Error: Failed to fetch joined events');
      setJoinedEvents([]);
    })
    .finally(() => setLoading(false));
};
