import axios from 'axios';

const API_URL = '/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

// =======================
// USER API FUNCTIONS
// =======================

export const createUser = async (userData) => {
  try {
    const res = await apiClient.post('/postusers', userData);
    return res.data;
  } catch (err) {
    console.error('❌ createUser failed:', err);
    throw err;
  }
};

export const getUsers = async (type) => {
  try {
    const url = type ? `/getusers?type=${type}` : '/getusers';
    const res = await apiClient.get(url);
    return res.data;
  } catch (err) {
    console.error('❌ getUsers failed:', err.message);
    console.error('Full error object:', err);
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const res = await apiClient.get(`/getusers/${id}`);
    return res.data;
  } catch (err) {
    console.error('❌ getUserById failed:', err);
    throw err;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const res = await apiClient.put(`/updateusers/${id}`, userData);
    return res.data;
  } catch (err) {
    console.error('❌ updateUser failed:', err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await apiClient.delete(`/deleteusers/${id}`);
    return res.data;
  } catch (err) {
    console.error('❌ deleteUser failed:', err);
    throw err;
  }
};

export const login = async (username, password) => {
  try {
    const res = await apiClient.post(`/users/login`, { username, password });
    return res;
  } catch (err) {
    console.error('❌ login failed:', err);
    throw err;
  }
};

export const createEventManager = async (userData) => {
  return createUser({ ...userData, typeUser: 'E' });
};

export const createStudent = async (userData) => {
  return createUser({ ...userData, typeUser: 'S' });
};

export const getEventManagers = async () => {
  return getUsers('E');
};

export const getStudents = async () => {
  return getUsers('S');
};

// =======================
// EVENT API FUNCTIONS
// =======================

export const postEvent = async (eventData) => {
  try {
    const res = await apiClient.post('/postEvent', eventData);
    return res.data;
  } catch (err) {
    console.error('❌ postEvent failed:', err);
    throw err;
  }
};

export const getEvents = async () => {
  try {
    const res = await apiClient.get('/getEvents');
    return res.data;
  } catch (err) {
    console.error('❌ getEvents failed:', err);
    throw err;
  }
};

export const putEvent = async (id, eventData) => {
  try {
    const res = await apiClient.put(`/putEvent/${id}`, eventData);
    return res.data;
  } catch (err) {
    console.error('❌ putEvent failed:', err);
    throw err;
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await apiClient.delete(`/deleteEvent/${id}`);
    return res.data;
  } catch (err) {
    console.error('❌ deleteEvent failed:', err);
    throw err;
  }
};

export const getJoinedEvents = async (username) => {
  try {
    const res = await apiClient.get(`/joined/${username}`);
    return res.data;
  } catch (err) {
    console.error('❌ getJoinedEvents failed:', err);
    throw err;
  }
};

export const registerForEvent = async (eventId, username) => {
  try {
    const res = await apiClient.post(`/register/${eventId}`, { username });
    return res.data;
  } catch (err) {
    console.error('❌ registerForEvent failed:', err);
    throw err;
  }
};

export const leaveEvent = async (eventId, username) => {
  try {
    const res = await apiClient.post(`/leave/${eventId}`, { username });
    return res.data;
  } catch (err) {
    console.error('❌ leaveEvent failed:', err);
    throw err;
  }
};
