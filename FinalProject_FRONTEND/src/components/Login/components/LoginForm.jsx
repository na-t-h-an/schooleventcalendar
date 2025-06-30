import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import LoadingButton from './LoadingButton';

export default function LoginForm({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  error, 
  loading, 
  onSubmit,
  headerTitle = 'Login to your account',
  headerSubtitle = 'Enter your credentials to access your student or event manager dashboard',
  hideSignupLink = false
}) {
  return (
    <form onSubmit={onSubmit} className="loginForm">
      <div className="loginHeader">
        <h2>{headerTitle}</h2>
        <p>{headerSubtitle}</p>
      </div>

      <ErrorMessage message={error} />

      <FormInput
        id="username"
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        required
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required
      />

      <LoadingButton 
        type="submit" 
        loading={loading}
        loadingText="Logging in..."
      >
        Login
      </LoadingButton>

      {!hideSignupLink && (
        <div className="signupLink">
          Don't have an account? <Link to="/schooleventcalendar/register">Sign Up</Link>
        </div>
      )}
    </form>
  );
}
