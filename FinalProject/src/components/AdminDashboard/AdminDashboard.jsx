import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import {
  createEventManager,
  getEventManagers,
  createStudent,
  getStudents,
  updateUser,
  deleteUser
} from '../../services/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [formData, setFormData] = useState({ username: '', password: '', firstname: '', middlename: '', lastname: '' });
  const [studentData, setStudentData] = useState({ username: '', password: '', firstname: '', middlename: '', lastname: '' });
  const [message, setMessage] = useState('');
  const [eventManagers, setEventManagers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    if (activeSection === 'viewEventManagers') fetchEventManagers();
    else if (activeSection === 'viewStudents') fetchStudents();
  }, [activeSection]);

  const fetchEventManagers = async () => {
    setLoading(true);
    try {
      const data = await getEventManagers();
      setEventManagers(data);
    } catch (err) {
      console.error('Error fetching event managers:', err);
      setMessage('Error: Failed to fetch event managers');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setMessage('Error: Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/adminlogin');
  };

  const resetForm = () => setFormData({ username: '', password: '', firstname: '', middlename: '', lastname: '' });
  const resetStudentForm = () => setStudentData({ username: '', password: '', firstname: '', middlename: '', lastname: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (editMode && editUserId) {
        const updated = { ...formData, typeUser: 'E' };
        data = await updateUser(editUserId, updated);
        setMessage('Event Manager updated successfully!');
      } else {
        data = await createEventManager(formData);
        setMessage('Event Manager created successfully!');
      }

      if (data) {
        resetForm();
        setEditMode(false);
        setEditUserId(null);
        setActiveSection('viewEventManagers');
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!studentData.username || !studentData.firstname || !studentData.lastname || (!editMode && !studentData.password)) {
      setMessage('Error: Fill all required fields');
      return;
    }
    try {
      let data;
      if (editMode && editUserId) {
        const updated = { ...studentData, typeUser: 'S' };
        data = await updateUser(editUserId, updated);
        setMessage('Student updated successfully!');
      } else {
        data = await createStudent(studentData);
        setMessage('Student created successfully!');
      }

      if (data) {
        resetStudentForm();
        setEditMode(false);
        setEditUserId(null);
        setActiveSection('viewStudents');
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (user, type) => {
    if (type === 'eventManager') {
      setFormData({ ...user });
      setActiveSection('createEventManager');
    } else {
      setStudentData({ ...user });
      setActiveSection('createStudent');
    }
    setEditMode(true);
    setEditUserId(user.userId);
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteUser(id);
      setMessage(`${type === 'eventManager' ? 'Event Manager' : 'Student'} deleted!`);
      type === 'eventManager' ? fetchEventManagers() : fetchStudents();
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const renderTable = (data, type) => (
    <table className="dataTable">
      <thead>
        <tr>
          <th>ID</th><th>Username</th><th>First</th><th>Middle</th><th>Last</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.username}</td>
            <td>{user.firstname}</td>
            <td>{user.middlename || '-'}</td>
            <td>{user.lastname}</td>
            <td className="actionButtons">
              <button className="editButton" onClick={() => handleEdit(user, type)}>Edit</button>
              <button className="deleteButton" onClick={() => handleDelete(user.userId, type)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderContent = () => {
    if (activeSection === 'createEventManager' || activeSection === 'createStudent') {
      const isStudent = activeSection === 'createStudent';
      const data = isStudent ? studentData : formData;
      const changeHandler = isStudent ? handleStudentInputChange : handleInputChange;
      const submitHandler = isStudent ? handleStudentSubmit : handleSubmit;

      return (
        <div className="formContainer">
          <h2>{editMode ? 'Edit' : 'Create'} {isStudent ? 'Student' : 'Event Manager'}</h2>
          <form onSubmit={submitHandler} className="eventManagerForm">
            {['username', 'password', 'firstname', 'middlename', 'lastname'].map(field => (
              <div className="formGroup" key={field}>
                <label className="formLabel">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  value={data[field]}
                  onChange={changeHandler}
                  className="formInput"
                  required={!(field === 'middlename' || (field === 'password' && editMode))}
                />
              </div>
            ))}
            <div className="formActions">
              <button type="submit" className="submitButton">{editMode ? 'Update' : 'Create'}</button>
              {editMode && (
                <button type="button" className="cancelButton" onClick={() => {
                  setEditMode(false);
                  setEditUserId(null);
                  isStudent ? resetStudentForm() : resetForm();
                  setActiveSection(isStudent ? 'viewStudents' : 'viewEventManagers');
                }}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      );
    } else if (activeSection === 'viewEventManagers') {
      return loading ? <p>Loading...</p> : renderTable(eventManagers, 'eventManager');
    } else if (activeSection === 'viewStudents') {
      return loading ? <p>Loading...</p> : renderTable(students, 'student');
    }
    return <p>Welcome to the Admin Dashboard</p>;
  };

  return (
    <div className="viewport">
      <div className="sidebar">
        <header><a href="#">Admin Page</a></header>
        <ul className="nav">
          <li><a href="#" onClick={() => { resetForm(); setActiveSection('createEventManager'); }}>Create EventManager</a></li>
          <li><a href="#" onClick={() => setActiveSection('viewEventManagers')}>View EventManagers</a></li>
          <li><a href="#" onClick={() => { resetStudentForm(); setActiveSection('createStudent'); }}>Create Student</a></li>
          <li><a href="#" onClick={() => setActiveSection('viewStudents')}>View Students</a></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
      <div className="content">

        <div className="containerFluid">
          {message && <div className={message.includes('Error') ? 'errorMessage' : 'successMessage'}>{message}</div>}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
