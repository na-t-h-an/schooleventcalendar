import { useState } from 'react';

// Hook to centralize and manage all state for the Event Manager dashboard
const useEventManagerState = () => {
  // Retrieve the current user object from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Extract the user's type (e.g., "E" or "S")
  const typeUser = user?.typeUser;

  // State to hold the list of all events managed by the event manager
  const [events, setEvents] = useState([]);

  // Message used for displaying feedback (e.g., errors, confirmations)
  const [message, setMessage] = useState('');

  // Loading flag used during API requests
  const [loading, setLoading] = useState(false);

  // Selected event (e.g., for viewing or editing a specific event)
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Form data for creating a new event
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  // Boolean flag to indicate whether the form is in edit mode
  const [editMode, setEditMode] = useState(false);

  // Holds the ID of the event currently being edited (if any)
  const [editEventId, setEditEventId] = useState(null);

  // Form data for editing the event manager's profile
  const [editData, setEditData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  });

  // Return all state variables and their corresponding setters
  return {
    typeUser, 
    events, setEvents,
    message, setMessage,
    loading, setLoading,
    selectedEvent, setSelectedEvent,
    formData, setFormData,
    editMode, setEditMode,
    editEventId, setEditEventId,
    editData, setEditData
  };
};

// Export the hook to be used in the Event Manager dashboard component
export default useEventManagerState;
