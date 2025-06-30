import { useState } from 'react';

const useEventManagerState = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const [editData, setEditData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  });

  return {
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

export default useEventManagerState;
