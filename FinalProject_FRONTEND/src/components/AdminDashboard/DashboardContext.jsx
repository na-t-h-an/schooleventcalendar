import React, { createContext, useState } from 'react';
import {
  createEventManager, getEventManagers,
  createStudent, getStudents,
  updateUser, deleteUser,
  postEvent, getEvents, putEvent, deleteEvent
} from '../../services/api';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children, activeSection, setActiveSection }) => {
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
  const [editEntityType, setEditEntityType] = useState(null);

  const fetchEventManagers = async () => {
    setLoading(true);
    try {
      setEventManagers(await getEventManagers());
    } catch {
      setMessage('Error fetching event managers');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      setStudents(await getStudents());
    } catch {
      setMessage('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      setEvents(await getEvents());
    } catch {
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

  return (
    <DashboardContext.Provider value={{
      formData, setFormData,
      studentData, setStudentData,
      eventData, setEventData,
      editMode, resetForms, setActiveSection,
      handleUserInput, handleUserSubmit,
      handleEventSubmit, handleEdit, handleDelete,
      fetchStudents, fetchEventManagers, fetchEvents,
      events, students, eventManagers,
      loading, renderTable, message
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
