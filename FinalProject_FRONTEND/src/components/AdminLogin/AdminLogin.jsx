import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // ✅ Regular CSS

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/schooleventcalendar/admindashboard'), 1000);
    } else {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div className="loginHeader">
          <h2>Admin Login</h2>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <form className="loginForm" onSubmit={handleLogin}>
          <div className="formGroup">
            <label className="boldLabel" htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="formInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label className="boldLabel" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="formInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgotPassword">
            Go back to Landing page <a href="/">click here</a>
          </div>

          <button className="loginButton" type="submit">Login</button>
        </form>

        {message && <p className="signupLink">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
