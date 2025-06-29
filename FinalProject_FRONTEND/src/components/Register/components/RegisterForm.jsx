import React from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../../Login/components/FormInput';
import LoadingButton from '../../Login/components/LoadingButton';
import MessageDisplay from './MessageDisplay';

export default function RegisterForm({
  username,
  setUsername,
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  password,
  setPassword,
  message,
  loading,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="registerForm">
      <div className="registerHeader">
        <h2>Student Registration</h2>
      </div>

      <MessageDisplay message={message} />

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

      <LoadingButton
        type="submit"
        className="registerButton"
        loading={loading}
        loadingText="Registering..."
      >
        Register
      </LoadingButton>

      <div className="loginLink">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </form>
  );
}