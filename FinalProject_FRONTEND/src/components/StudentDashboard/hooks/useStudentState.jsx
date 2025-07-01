import { useState } from 'react';

export default function useStudentState() {
  const [activeSection, setActiveSection] = useState('calendar');
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editData, setEditData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  });

  return {
    activeSection, setActiveSection,
    events, setEvents,
    joinedEvents, setJoinedEvents,
    loading, setLoading,
    message, setMessage,
    selectedEvent, setSelectedEvent,
    editData, setEditData
  };
}
