import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // ✅ Use regular CSS
import { createStudent } from '../../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const studentData = {
        username,
        password,
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
      };

      console.log('Registering student:', studentData);

      const response = await createStudent(studentData);

      if (response && response.data) {
        setMessage('Registration successful! You can now login.');
        setUsername('');
        setPassword('');
        setFirstName('');
        setMiddleName('');
        setLastName('');

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(`Registration failed: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerWrapper">
      <div className="registerContainer">
        <form onSubmit={handleSubmit} className="registerForm">
          <div className="registerHeader">
            <h2>Student Registration</h2>
          </div>

          {message && (
            <div className={message.includes('failed') ? 'errorMessage' : 'successMessage'}>
              {message}
            </div>
          )}

          <div className="formGroup">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="formInput"
            />
          </div>

          <div className="formGroup">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="formInput"
            />
          </div>

          <div className="formGroup">
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="formInput"
            />
          </div>

          <div className="formGroup">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="formInput"
            />
          </div>

          <div className="formGroup">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formInput"
            />
          </div>

          <button type="submit" className="registerButton" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <div className="loginLink">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
