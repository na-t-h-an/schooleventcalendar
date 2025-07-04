import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EventManager from './components/EventManager/EventManager';
import ProtectedRoute from './components/AdminDashboard/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/schooleventcalendar/landing"/>} />
      <Route path="/schooleventcalendar/landing" element={<LandingPage />} />
      <Route path="/schooleventcalendar/login" element={<Login />} />
      <Route path="/schooleventcalendar/register" element={<Register />} />
      <Route path="/schooleventcalendar/adminlogin" element={<AdminLogin />} />
     <Route path="/schooleventcalendar/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/schooleventcalendar/eventmanager/*" element={<EventManager />} />
      <Route path="/schooleventcalendar/studentdashboard/*" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App; //     
