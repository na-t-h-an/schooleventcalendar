const API_URL = 'http://localhost:8080/api';

export async function handleLeaveEvent(eventId, username, setMessage, fetchJoinedEvents) {
  if (!username) {
    setMessage('You must be logged in to leave events.');
    return;
  }
  try {
    const response = await fetch(`${API_URL}/leave/${eventId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const result = await response.text();
    if (response.ok) {
      setMessage('Successfully left event.');
      fetchJoinedEvents();
    } else {
      setMessage(`Leave failed: ${result}`);
    }
  } catch {
    setMessage('Network error while leaving event.');
  }
  setTimeout(() => setMessage(''), 3000);
}
