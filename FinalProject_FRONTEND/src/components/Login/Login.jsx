import React, { useState } from 'react';
import './Login.css';
import Header from '../LandingPage/components/Header'; // global
import BackButton from './components/BackButton';
import LoginForm from './components/LoginForm';
import { useLoginHandler } from './hooks/useLoginHandler';
import { useNavigation } from './hooks/useNavigation'; // global

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, error, loading } = useLoginHandler();
  const { navigateToHome } = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
  };

  return (
    <>
      <Header />
      <div className="loginWrapper">
        <div className="loginContainer">
          <BackButton onClick={navigateToHome} />
          
          <LoginForm        // dont need to add these props loading or hideSignupLink={false} 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}