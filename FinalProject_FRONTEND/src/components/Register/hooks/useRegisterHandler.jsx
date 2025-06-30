import { useState } from 'react';
import { createStudent,getUsers } from '../../../services/api';


export const useRegisterHandler = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (userData) => {
    setLoading(true);
    setMessage('');

    try {
      // Check if username already exists
      const allUsers = await getUsers();
      const userExists = allUsers.some(user => user.username === userData.username);

      if (userExists) {
        setMessage('Username already exists. Please choose a different one.');
        setLoading(false);
        return { success: false };
      }

      const studentData = {
        typeUser: 'S',
        username: userData.username,
        password: userData.password,
        firstname: userData.firstName,
        middlename: userData.middleName,
        lastname: userData.lastName,
      };

      console.log('Registering student:', studentData);

      const response = await createStudent(studentData);

      if (response) {
        setMessage('Registration successful! You can now login.');
        
        // Redirect to login page after 1 second
        setTimeout(() => {
          window.location.href = '/schooleventcalendar/login';
        }, 2000);

        return { success: true, data: response };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(`Registration failed: ${error.response?.data?.message || error.message}`);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage('');
  };

  return { 
    handleRegister, 
    message, 
    loading, 
    clearMessage 
  };
};