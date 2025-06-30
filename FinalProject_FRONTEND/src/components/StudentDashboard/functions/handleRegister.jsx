const API_URL = 'http://localhost:8080/api';

export async function handleRegister(eventId, username, setMessage, fetchJoinedEvents) {
  if (!username) {
    setMessage('You must be logged in to join events.');
    return;
  }
  try {
    const response = await fetch(`${API_URL}/register/${eventId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
    const result = await response.text();
    if (response.ok) {
      setMessage('Successfully joined event.');
      fetchJoinedEvents();
    } else {
      setMessage(`Join failed: ${result}`);
    }
  } catch {
    setMessage('Network error while joining event.');
  }
  setTimeout(() => setMessage(''), 3000);
}
