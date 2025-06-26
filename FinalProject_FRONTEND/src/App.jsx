import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EventManager from './components/EventManager/EventManager';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/schooleventcalendar" replace />} />
      <Route path="/schooleventcalendar" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/eventmanager/*" element={<EventManager />} />
    </Routes>
  );
}

export default App;
