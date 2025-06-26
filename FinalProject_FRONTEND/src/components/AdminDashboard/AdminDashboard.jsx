import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import {
  createEventManager, getEventManagers,
  createStudent, getStudents,
  updateUser, deleteUser,
  postEvent, getEvents, putEvent, deleteEvent
} from '../../services/api';

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [formData, setFormData] = useState({ username: '', password: '', firstname: '', middlename: '', lastname: '' });
  const [studentData, setStudentData] = useState({ username: '', password: '', firstname: '', middlename: '', lastname: '' });
  const [eventData, setEventData] = useState({ eventName: '', eventDescription: '', eventSchedule: '', startTime: '', endTime: '', eventLocation: '' });

  const [message, setMessage] = useState('');
  const [eventManagers, setEventManagers] = useState([]);
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editEntityType, setEditEntityType] = useState(null); // 'student' | 'eventManager' | 'event'

  // Initial data fetch
  useEffect(() => {
    if (activeSection === 'viewEventManagers') fetchEventManagers();
    else if (activeSection === 'viewStudents') fetchStudents();
    else if (activeSection === 'viewEvents') fetchEvents();
  }, [activeSection]);

  const fetchEventManagers = async () => {
    setLoading(true);
    try {
      setEventManagers(await getEventManagers());
    } catch (err) {
      setMessage('Error fetching event managers');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      setStudents(await getStudents());
    } catch (err) {
      setMessage('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      setEvents(await getEvents());
    } catch (err) {
      setMessage('Error fetching events');
    } finally {
      setLoading(false);
    }
  };

  const resetForms = () => {
    setFormData({ username: '', password: '', firstname: '', middlename: '', lastname: '' });
    setStudentData({ username: '', password: '', firstname: '', middlename: '', lastname: '' });
    setEventData({ eventName: '', eventDescription: '', eventSchedule: '', startTime: '', endTime: '', eventLocation: '' });
    setEditMode(false);
    setEditId(null);
    setEditEntityType(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/adminlogin');
  };

  const handleUserInput = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = async (e, isStudent) => {
    e.preventDefault();
    try {
      const data = isStudent ? studentData : formData;
      if (!data.username || !data.firstname || !data.lastname || (!editMode && !data.password)) {
        setMessage('Error: Fill all required fields');
        return;
      }

      const userPayload = { ...data, typeUser: isStudent ? 'S' : 'E' };
      const response = editMode
        ? await updateUser(editId, userPayload)
        : isStudent ? await createStudent(userPayload) : await createEventManager(userPayload);

      if (response) {
        setMessage(`${isStudent ? 'Student' : 'Event Manager'} ${editMode ? 'updated' : 'created'} successfully!`);
        resetForms();
        setActiveSection(isStudent ? 'viewStudents' : 'viewEventManagers');
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        eventName: eventData.eventName,
        eventDescription: eventData.eventDescription,
        eventSchedule: eventData.eventSchedule,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        eventLocation: eventData.eventLocation
      };

      const response = editMode
        ? await putEvent(editId, payload)
        : await postEvent(payload);

      if (response) {
        setMessage(`Event ${editMode ? 'updated' : 'created'} successfully!`);
        resetForms();
        setActiveSection('viewEvents');
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (item, type) => {
    setEditMode(true);
    setEditId(item.userId || item.eventId);
    setEditEntityType(type);

    if (type === 'student') {
      setStudentData({ ...item });
      setActiveSection('createStudent');
    } else if (type === 'eventManager') {
      setFormData({ ...item });
      setActiveSection('createEventManager');
    } else if (type === 'event') {
      setEventData({
        eventName: item.eventName,
        eventDescription: item.eventDescription,
        eventSchedule: item.eventSchedule,
        startTime: item.startTime,
        endTime: item.endTime,
        eventLocation: item.eventLocation
      });
      setActiveSection('createEvent');
    }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      if (type === 'event') await deleteEvent(id);
      else await deleteUser(id);

      setMessage(`${type} deleted successfully`);
      if (type === 'event') fetchEvents();
      else if (type === 'student') fetchStudents();
      else fetchEventManagers();
    } catch (err) {
      setMessage('Error deleting: ' + (err.response?.data?.message || err.message));
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const renderTable = (data, type) => (
    <table className="dataTable">
      <thead>
        <tr>
          {type === 'event' ? (
            <>
              <th>ID</th><th>Title</th><th>Date</th><th>Time</th><th>Location</th><th>Actions</th>
            </>
          ) : (
            <>
              <th>ID</th><th>Username</th><th>First</th><th>Middle</th><th>Last</th><th>Actions</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.userId || item.eventId}>
            {type === 'event' ? (
              <>
                <td>{item.eventId}</td>
                <td>{item.eventName}</td>
                <td>{item.eventSchedule}</td>
                <td>{item.startTime} - {item.endTime}</td>
                <td>{item.eventLocation}</td>
              </>
            ) : (
              <>
                <td>{item.userId}</td>
                <td>{item.username}</td>
                <td>{item.firstname}</td>
                <td>{item.middlename || '-'}</td>
                <td>{item.lastname}</td>
              </>
            )}
            <td className="actionButtons">
              <button className="editButton" onClick={() => handleEdit(item, type)}>Edit</button>
              <button className="deleteButton" onClick={() => handleDelete(item.userId || item.eventId, type)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderForm = () => {
    if (activeSection === 'createEventManager' || activeSection === 'createStudent') {
      const isStudent = activeSection === 'createStudent';
      const data = isStudent ? studentData : formData;
      const onChange = (e) => handleUserInput(e, isStudent ? setStudentData : setFormData);

      return (
        <form onSubmit={(e) => handleUserSubmit(e, isStudent)} className="eventManagerForm">
          <h2>{editMode ? 'Edit' : 'Create'} {isStudent ? 'Student' : 'Event Manager'}</h2>
          {['username', 'password', 'firstname', 'middlename', 'lastname'].map(field => (
            <div className="formGroup" key={field}>
              <label className="formLabel">{field}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={data[field]}
                onChange={onChange}
                required={!(field === 'middlename' || (field === 'password' && editMode))}
                className="formInput"
              />
            </div>
          ))}
          <div className="formActions">
            <button type="submit" className="submitButton">{editMode ? 'Update' : 'Create'}</button>
            {editMode && (
              <button type="button" className="cancelButton" onClick={() => {
                resetForms();
                setActiveSection(isStudent ? 'viewStudents' : 'viewEventManagers');
              }}>Cancel</button>
            )}
          </div>
        </form>
      );
    }

    if (activeSection === 'createEvent') {
      return (
        <form onSubmit={handleEventSubmit} className="eventManagerForm">
          <h2>{editMode ? 'Edit' : 'Create'} Event</h2>
          {['eventName', 'eventDescription', 'eventSchedule', 'startTime', 'endTime', 'eventLocation'].map(field => (
            <div className="formGroup" key={field}>
              <label className="formLabel">{field}</label>
              <input
                type={field.includes('Time') ? 'time' : field.includes('Schedule') ? 'date' : 'text'}
                name={field}
                value={eventData[field]}
                onChange={(e) => handleUserInput(e, setEventData)}
                required
                className="formInput"
              />
            </div>
          ))}
          <div className="formActions">
            <button type="submit" className="submitButton">{editMode ? 'Update' : 'Create'}</button>
            {editMode && (
              <button type="button" className="cancelButton" onClick={() => {
                resetForms();
                setActiveSection('viewEvents');
              }}>Cancel</button>
            )}
          </div>
        </form>
      );
    }

    if (activeSection === 'viewEventManagers') return loading ? <p>Loading...</p> : renderTable(eventManagers, 'eventManager');
    if (activeSection === 'viewStudents') return loading ? <p>Loading...</p> : renderTable(students, 'student');
    if (activeSection === 'viewEvents') return loading ? <p>Loading...</p> : renderTable(events, 'event');

    return <p>Welcome to the Admin Dashboard LADAV2</p>;
  };

  return (
    <div className="viewport">
      <div className="sidebar">
        <header><a href="#">Admin Page</a></header>
        <ul className="nav">
          <li><a href="#" onClick={() => { resetForms(); setActiveSection('createEventManager'); }}>Create EventManager</a></li>
          <li><a href="#" onClick={() => setActiveSection('viewEventManagers')}>View EventManagers</a></li>
          <li><a href="#" onClick={() => { resetForms(); setActiveSection('createStudent'); }}>Create Student</a></li>
          <li><a href="#" onClick={() => setActiveSection('viewStudents')}>View Students</a></li>
          <li><a href="#" onClick={() => { resetForms(); setActiveSection('createEvent'); }}>Create Event</a></li>
          <li><a href="#" onClick={() => setActiveSection('viewEvents')}>View Events</a></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
      <div className="content">
        <div className="containerFluid">
          {message && <div className={message.includes('Error') ? 'errorMessage' : 'successMessage'}>{message}</div>}
          {renderForm()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
