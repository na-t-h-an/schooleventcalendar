import React, { useState, useEffect } from 'react';
import './EventManager.css';
import { getEvents, postEvent, putEvent, deleteEvent, updateUser } from '../../services/api';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const API_URL = 'http://localhost:8080/api';

function EventManager() {
  const [activeSection, setActiveSection] = useState('calendar');
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', eventDate: '', startTime: '', endTime: '', location: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username;
  const [editData, setEditData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  });

  // Add debug logging to useEffect
  useEffect(() => {
    console.log('🔄 useEffect triggered, activeSection:', activeSection);
    console.log('📊 Current events state:', events);
    
    if (['viewEvents', 'calendar'].includes(activeSection)) {
      console.log('📅 Should fetch events for section:', activeSection);
      fetchEvents();
    }
    if (activeSection === 'profile') loadProfile();
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Enhanced fetchEvents with debug logging
  const fetchEvents = async () => {
  setLoading(true);
  try {
    const response = await getEvents();
    // Handle both response formats
    const eventsData = Array.isArray(response) ? response : (Array.isArray(response.data) ? response.data : []);
    setEvents(eventsData);
  } catch (error) {
    setMessage('Error: Failed to fetch events');
    setEvents([]);
  } finally {
    setLoading(false);
  }
};

  const handleEventClick = (clickInfo) => {
    console.log('🖱️ Event clicked:', clickInfo.event.id);
    const clicked = events.find(evt => evt.eventId.toString() === clickInfo.event.id);
    console.log('🎯 Found clicked event:', clicked);
    setSelectedEvent(clicked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 Submitting form data:', formData);
    try {
      const payload = {
        eventName: formData.title,
        eventDescription: formData.description,
        eventSchedule: formData.eventDate,
        startTime: formData.startTime + ":00",
        endTime: formData.endTime + ":00",
        eventLocation: formData.location,
        eventIsActive: true
      };
      console.log('📤 Payload to send:', payload);
      
      if (editMode && editEventId) {
        await putEvent(editEventId, payload);
        setMessage('Event updated successfully!');
      } else {
        const response = await postEvent(payload);
        console.log('✅ Event created, response:', response);
        setMessage('Event created successfully!');
      }
      
      console.log('🔄 Fetching events after submit...');
      await fetchEvents();
      setActiveSection('viewEvents');
      clearForm();
    } catch (error) {
      console.error('❌ Submit error:', error);
      setMessage(`Error: ${error.message}`);
    }

    setTimeout(() => setMessage(''), 3000);
  };

  const clearForm = () => {
    setFormData({ title: '', description: '', eventDate: '', startTime: '', endTime: '', location: '' });
    setEditMode(false);
    setEditEventId(null);
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
    setActiveSection('postEvent');
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

  const loadProfile = () => {
    setEditData({
      firstname: user.firstname || '',
      middlename: user.middlename || '',
      lastname: user.lastname || '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
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
        setMessage('✅ Profile updated successfully.');
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      setMessage('❌ Failed to update profile');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const renderMessage = message && (
    <div className={message.includes('Error') || message.includes('❌') ? 'errorMessage' : 'successMessage'}>
      {message}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'calendar':
        console.log('🗓️ Rendering calendar view with events:', events);
        
        // Transform events for FullCalendar with debug logging
        const calendarEvents = events.map(evt => {
          const eventObj = {
            id: evt.eventId.toString(),
            title: evt.eventName,
            start: `${evt.eventSchedule}T${evt.startTime}`,
            end: `${evt.eventSchedule}T${evt.endTime}`
          };
          console.log('📅 Calendar event transformed:', eventObj);
          return eventObj;
        });
        
        console.log('📅 All calendar events:', calendarEvents);
        
        return (
          <div>
            <h2>📅 Event Calendar</h2>
            <div style={{marginBottom: '10px', fontSize: '14px', color: '#666'}}>

            </div>
            <FullCalendar
              plugins={[bootstrap5Plugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              height="auto"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              eventClick={handleEventClick}
            />
            {selectedEvent && (
              <div className="modalOverlay">
                <div className="modalContent">
                  <button className="closeButton" onClick={() => setSelectedEvent(null)}>×</button>
                  <h3>{selectedEvent.eventName}</h3>
                  <p><strong>Start:</strong> {selectedEvent.eventSchedule} {selectedEvent.startTime}</p>
                  <p><strong>End:</strong> {selectedEvent.eventSchedule} {selectedEvent.endTime}</p>
                  <p><strong>Location:</strong> {selectedEvent.eventLocation}</p>
                  <p><strong>Description:</strong> {selectedEvent.eventDescription}</p>
                  <p><strong>Status:</strong> {selectedEvent.eventIsActive ? 'Active' : 'Inactive'}</p>
                  <div style={{ marginTop: '15px' }}>
                    <button className="editButton" onClick={() => { setSelectedEvent(null); handleEdit(selectedEvent); }}>Edit</button>
                    <button className="deleteButton" onClick={() => setSelectedEvent(null)} style={{ marginLeft: '10px' }}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'postEvent':
        return (
          <div>
            <h2>{editMode ? '✏️ Edit Event' : '📝 Create New Event'}</h2>
            {renderMessage}
            <form onSubmit={handleSubmit} className="formContainer">
              <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required />
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" rows="3" required />
              <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required />
              <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required />
              <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required />
              <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Location" required />
              <div className="formActions">
                <button type="submit" className="submitButton">{editMode ? 'Update' : 'Create'} Event</button>
                <button type="button" onClick={clearForm} className="clearButton">Clear</button>
              </div>
            </form>
          </div>
        );
        
      case 'viewEvents':
        console.log('📋 Rendering manage events view with events:', events);
        return (
          <div>
            <h2>📋 Manage Events</h2>
            {renderMessage}
            <div style={{marginBottom: '10px', fontSize: '14px', color: '#666'}}>
              Debug: Loading={loading.toString()} | Events count: {events.length}
            </div>
            {loading ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <div>
                <p>No events found. Create one first.</p>
                <button onClick={() => {
                  console.log('🔄 Manual refresh clicked');
                  fetchEvents();
                }} style={{marginTop: '10px', padding: '5px 10px'}}>
                  🔄 Refresh Events
                </button>
              </div>
            ) : (
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => {
                    console.log('📋 Rendering table row for event:', event);
                    return (
                      <tr key={event.eventId}>
                        <td>{event.eventId}</td>
                        <td>{event.eventName}</td>
                        <td>{event.eventSchedule}</td>
                        <td>{event.startTime}</td>
                        <td>{event.endTime}</td>
                        <td>{event.eventLocation}</td>
                        <td>{event.eventIsActive ? 'Active' : 'Inactive'}</td>
                        <td className="actionButtons">
                          <button className="editButton" onClick={() => handleEdit(event)}>Edit</button>
                          <button className="deleteButton" onClick={() => handleDelete(event.eventId)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
        
      case 'profile':
        return (
          <div>
            <h2>🙍 My Profile ({username})</h2>
            {renderMessage}
            <form onSubmit={handleProfileUpdate} className="profileForm">
              <div className="formGroup">
                <label>First Name</label>
                <input name="firstname" value={editData.firstname} onChange={handleEditChange} placeholder="First Name" required />
              </div>
              <div className="formGroup">
                <label>Middle Name</label>
                <input name="middlename" value={editData.middlename} onChange={handleEditChange} placeholder="Middle Name" />
              </div>
              <div className="formGroup">
                <label>Last Name</label>
                <input name="lastname" value={editData.lastname} onChange={handleEditChange} placeholder="Last Name" required />
              </div>
              <div className="formGroup">
                <label>New Password</label>
                <input type="password" name="password" value={editData.password} onChange={handleEditChange} placeholder="New Password" />
              </div>
              <div className="formGroup">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={editData.confirmPassword} onChange={handleEditChange} placeholder="Confirm Password" />
              </div>
              <button type="submit" className="updateProfileButton">Update Profile</button>
            </form>
            <button onClick={handleLogout} className="logoutButton">Logout</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="event-manager-container">
      <header className="header">
        <div className="container">
          <div className="logo">Event Manager Portal</div>
          <ul className="links">
            <li onClick={() => setActiveSection('postEvent')}>Create Event</li>
            <li onClick={() => setActiveSection('viewEvents')}>Manage Events</li>
            <li onClick={() => setActiveSection('calendar')}>Calendar View</li>
            <li onClick={() => setActiveSection('profile')}>{username || 'My Profile'}</li>
          </ul>
        </div>
      </header>
      <main className="content">
        <div className="wrapper">
          {renderMessage}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default EventManager;