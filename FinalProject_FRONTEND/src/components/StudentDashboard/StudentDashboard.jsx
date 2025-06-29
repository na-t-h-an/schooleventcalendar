import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { getEvents, getJoinedEvents, updateUser } from '../../services/api';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import '@fullcalendar/bootstrap5';

const API_URL = 'http://localhost:8080/api';

function StudentDashboard() {
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

  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username;

  useEffect(() => {
    setMessage('');
    if (activeSection === 'viewEvents' || activeSection === 'calendar') fetchEvents();
    if (activeSection === 'myRegistrations') fetchJoinedEvents();
    if (activeSection === 'profile') loadProfile();
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/schooleventcalendar/login';
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getEvents();
      const eventList = Array.isArray(response)
        ? response
        : Array.isArray(response.data)
        ? response.data
        : [];
      setEvents(eventList);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJoinedEvents = async () => {
    setLoading(true);
    if (!username) {
      setMessage('You must be logged in to view joined events.');
      setLoading(false);
      return;
    }
    try {
      const res = await getJoinedEvents(username);
      setJoinedEvents(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error('Error fetching joined events:', error);
      setJoinedEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!username) {
      setMessage('You must be logged in to join events.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const result = await response.text();
      if (response.ok) {
        setMessage('✅ Successfully joined event.');
        fetchJoinedEvents();
      } else {
        setMessage(`❌ Join failed: ${result}`);
      }
    } catch (error) {
      console.error('Error joining event:', error);
      setMessage('❌ Network error while joining event.');
    }
    setTimeout(() => setMessage(''), 3000);
    setSelectedEvent(null);
  };

  const handleLeaveEvent = async (eventId) => {
    if (!username) {
      setMessage('You must be logged in to leave events.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/leave/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const result = await response.text();
      if (response.ok) {
        setMessage('✅ Successfully left event.');
        fetchJoinedEvents();
      } else {
        setMessage(`❌ Leave failed: ${result}`);
      }
    } catch (error) {
      console.error('Error leaving event:', error);
      setMessage('❌ Network error while leaving event.');
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
      case 'viewEvents':
        return (
          <div>
            <h2>Browse Events</h2>
            {renderMessage}
            {loading ? <p>Loading...</p> : (
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>ID</th><th>Title</th><th>Date</th><th>Location</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.eventId}>
                      <td>{event.eventId}</td>
                      <td>{event.eventName}</td>
                      <td>{event.eventSchedule}</td>
                      <td>{event.eventLocation}</td>
                      <td>{event.eventIsActive ? 'Active' : 'Inactive'}</td>
                      <td>
                        <button className="joinButton" onClick={() => handleRegister(event.eventId)}>Join</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case 'myRegistrations':
        return (
          <div>
            <h2>Joined Events</h2>
            {renderMessage}
            {loading ? <p>Loading...</p> : joinedEvents.length === 0 ? <p>No joined events found.</p> : (
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>ID</th><th>Title</th><th>Date</th><th>Location</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {joinedEvents.map(event => (
                    <tr key={event.eventId}>
                      <td>{event.eventId}</td>
                      <td>{event.eventName}</td>
                      <td>{event.eventSchedule}</td>
                      <td>{event.eventLocation}</td>
                      <td>
                        <button className="leaveButton" onClick={() => handleLeaveEvent(event.eventId)}>Leave</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      case 'calendar':
        const calendarEvents = events.map(evt => ({
          id: evt.eventId,
          title: evt.eventName,
          start: `${evt.eventSchedule}T${evt.startTime}`,
          end: `${evt.eventSchedule}T${evt.endTime}`,
          extendedProps: {
            description: evt.eventDescription,
            location: evt.eventLocation,
            status: evt.eventIsActive ? 'Active' : 'Inactive'
          }
        }));
        return (
          <div>
            <h2>Event Calendar</h2>
            {renderMessage}
            <FullCalendar
              plugins={[bootstrap5Plugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              eventClick={(info) => setSelectedEvent(info.event)}
              headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
            />
            {selectedEvent && (
              <div className="modalOverlay">
                <div className="modalContent">
                  <h4>{selectedEvent.title}</h4>
                  <p><strong>Start:</strong> {selectedEvent.start.toLocaleString()}</p>
                  <p><strong>End:</strong> {selectedEvent.end.toLocaleString()}</p>
                  <p><strong>Location:</strong> {selectedEvent.extendedProps.location}</p>
                  <p><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
                  <p><strong>Status:</strong> {selectedEvent.extendedProps.status}</p>
                  <div>
                    <button className="joinButton" onClick={() => handleRegister(selectedEvent.id)}>Join</button>
                    <button className="leaveButton" onClick={() => setSelectedEvent(null)}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'profile':
        return (
          <div>
            <h2>My Profile ({username})</h2>
            {renderMessage}
            <form onSubmit={handleProfileUpdate} className="profileForm">
              <div className="formGroup">
                <label>First Name</label>
                <input type="text" name="firstname" value={editData.firstname} onChange={handleEditChange} required />
              </div>
              <div className="formGroup">
                <label>Middle Name</label>
                <input type="text" name="middlename" value={editData.middlename} onChange={handleEditChange} />
              </div>
              <div className="formGroup">
                <label>Last Name</label>
                <input type="text" name="lastname" value={editData.lastname} onChange={handleEditChange} required />
              </div>
              <div className="formGroup">
                <label>New Password</label>
                <input type="password" name="password" value={editData.password} onChange={handleEditChange} />
              </div>
              <div className="formGroup">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={editData.confirmPassword} onChange={handleEditChange} />
              </div>
            </form>
              <button onClick={handleProfileUpdate} className="studentdashboardUpdateProfileButton">Update</button>
              <br/>
              <button onClick={handleLogout} className="studentdashboardLogoutButton">Logout</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="landingPage">
      <header className="header">
        <div className="container">
          <div className="logo">Student Portal</div>
          <ul className="links">
            <li onClick={() => setActiveSection('viewEvents')}>Browse Events</li>
            <li onClick={() => setActiveSection('myRegistrations')}>Joined Events</li>
            <li onClick={() => setActiveSection('calendar')}>Calendar View</li>
            <li className="profileButton" onClick={() => setActiveSection('profile')}>{username}</li>
          </ul>
        </div>
      </header>
      <div className="content">
        <div className="wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
