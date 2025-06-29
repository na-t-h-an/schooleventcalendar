import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/api';

export const useLoginHandler = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
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

  return { handleLogin, error, loading };
};