import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Login/components/LoginForm';
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        navigate('/schooleventcalendar/admindashboard');
      } else {
        setError('Invalid admin credentials. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
          loading={loading}
          onSubmit={handleLogin}
          headerTitle="Admin Login"
          headerSubtitle=""
          hideSignupLink={true}
        />

        <div className="landingpageback">
          Go back to Landing page <a href="/">click here</a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
