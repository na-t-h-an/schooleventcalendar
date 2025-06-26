import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { login } from '../../services/api'; // adjust this path based on your project

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(username, password);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token || '');

      switch (userData.typeUser) {
        case 'S':
          navigate('/studentdashboard');
          break;
        case 'E':
          navigate('/eventmanager');
          break;
        default:
          setError('Invalid account type');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
      }
    } catch (error) {
      setError('Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="loginHeader">
            <h2>Login to your account</h2>
            <p>Enter your credentials to access your student or event manager dashboard</p>
          </div>

          {error && <div className="errorMessage">{error}</div>}

          <div className="formGroup">
            <label htmlFor="username" className="boldLabel">Username</label>
            <input
              type="text"
              id="username"
              className="formInput"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="boldLabel">Password</label>
            <input
              type="password"
              id="password"
              className="formInput"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="signupLink">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
