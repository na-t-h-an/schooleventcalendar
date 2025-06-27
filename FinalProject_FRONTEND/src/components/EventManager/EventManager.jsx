import React, { useState, useEffect } from 'react';
import './EventManager.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  getEvents,
  postEvent,
  putEvent,
  deleteEvent,
  updateUser
} from '../../services/api';

import CalendarView from './components/CalendarView';
import EventForm from './components/EventForm';
import EventTable from './components/EventTable';
import EventModal from './components/EventModal';
import ProfileForm from './components/ProfileForm';
import HeaderNav from './components/HeaderNav';
import MessageAlert from './components/MessageAlert';

function EventManager() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    window.location.href = '/login';
    return null;
  }

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

  useEffect(() => {
    fetchEvents();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setEditData({
        firstname: storedUser.firstname || '',
        middlename: storedUser.middlename || '',
        lastname: storedUser.lastname || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getEvents();
      const eventsData = Array.isArray(response)
        ? response
        : Array.isArray(response.data)
        ? response.data
        : [];
      setEvents(eventsData);
    } catch (error) {
      setMessage('Error: Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (clickInfo) => {
    const clicked = events.find(evt => evt.eventId.toString() === clickInfo.event.id);
    setSelectedEvent(clicked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      eventDate: '',
      startTime: '',
      endTime: '',
      location: ''
    });
    setEditMode(false);
    setEditEventId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventName: formData.title,
      eventDescription: formData.description,
      eventSchedule: formData.eventDate,
      startTime: formData.startTime + ":00",
      endTime: formData.endTime + ":00",
      eventLocation: formData.location,
      eventIsActive: true
    };

    try {
      if (editMode && editEventId) {
        await putEvent(editEventId, payload);
        setMessage('Event updated successfully!');
      } else {
        await postEvent(payload);
        setMessage('Event created successfully!');
      }
      await fetchEvents();
      clearForm();
      navigate('/eventmanager/managevent');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }

    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (event) => {
    const formatTime = (timeStr) => timeStr.slice(0, 5);

    setFormData({
      title: event.eventName,
      description: event.eventDescription,
      eventDate: event.eventSchedule,
      startTime: formatTime(event.startTime),
      endTime: formatTime(event.endTime),
      location: event.eventLocation
    });

    setEditMode(true);
    setEditEventId(event.eventId);
    navigate('/eventmanager/createvent');
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteEvent(eventId);
      setMessage('Event deleted successfully!');
      await fetchEvents();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (editData.password && editData.password !== editData.confirmPassword) {
      setMessage('Error: Passwords do not match');
      return;
    }

    try {
      const updatedUser = {
        ...user,
        firstname: editData.firstname,
        middlename: editData.middlename,
        lastname: editData.lastname,
        ...(editData.password && { password: editData.password })
      };
      const response = await updateUser(user.userId, updatedUser);
      if (response?.data) {
        setMessage('Profile updated successfully.');
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      setMessage('Failed to update profile');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="event-manager-container">
      <HeaderNav username={user.username} />

      <main className="content">
        <div className="wrapper">
          <EventModal event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onEdit={() => {
              setSelectedEvent(null);
              handleEdit(selectedEvent);
            }}
          />

          <Routes>
            <Route index element={<Navigate to="calendarview" replace />} />
              <Route path="createvent" element={
                <>
                  <h2>{editMode ? 'Edit Event' : 'Create New Event'}</h2>
                  <MessageAlert message={message} />
                  <EventForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onClear={clearForm}
                    editMode={editMode}
                  />
                </>
              }
            />

            <Route path="managevent" element={
                <>
                  <h2>Manage Events</h2>
                  <MessageAlert message={message} />
                  {loading ? (
                    <p>Loading events...</p>
                  ) : events.length === 0 ? (
                    <p>No events found.</p>
                  ) : (
                    <EventTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
                  )}
                </>
              }
            />

            <Route path="calendarview" element={
                <CalendarView events={events} onEventClick={handleEventClick} />
              }
            />

            <Route path="profile" element={
                <>
                  <MessageAlert message={message} />
                  <ProfileForm
                    editData={editData}
                    onChange={handleEditChange}
                    onSubmit={handleProfileUpdate}
                    username={user.username}
                  />
                  <button onClick={handleLogout} className="logoutButton">Logout</button>
                </>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default EventManager;
