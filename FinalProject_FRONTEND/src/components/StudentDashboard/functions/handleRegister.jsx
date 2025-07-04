const API_URL = 'http://localhost:8080/api';

export async function handleRegister(eventId, username, setMessage, setMessageType, fetchJoinedEvents) {
  if (!username) {
    setMessage('You must be logged in to join events.');
    setMessageType('error');
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
      setMessageType('success');
      fetchJoinedEvents();
    } else {
      if (result.includes('already registered')) {
        setMessage('You are already registered for this event.');
        setMessageType('error');
      } else {
        setMessage(`Join failed: ${result}`);
        setMessageType('error');
      }
      setMessageType('error');
    }
  } catch (error) {
    setMessage('Network error while joining event.');
    setMessageType('error');
  }

  setTimeout(() => {
    setMessage('');
    setMessageType('');
  }, 3000);
}

