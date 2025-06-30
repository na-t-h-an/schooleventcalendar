import { getJoinedEvents } from '@/services/api';

export async function fetchJoinedEvents(username, setJoinedEvents, setLoading, setMessage) {
  setLoading(true);
  if (!username) {
    setMessage('You must be logged in to view joined events.');
    setLoading(false);
    return;
  }
  try {
    const res = await getJoinedEvents(username);
    setJoinedEvents(Array.isArray(res) ? res : []);
  } catch {
    setMessage('Error fetching joined events.');
    setJoinedEvents([]);
  } finally {
    setLoading(false);
  }
}
