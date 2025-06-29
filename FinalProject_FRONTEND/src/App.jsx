import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EventManager from './components/EventManager/EventManager';
import About from './components/LandingPage/components/About';
import Contact from './components/LandingPage/components/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/schooleventcalendar/landing" replace />} />
      <Route path="/schooleventcalendar/landing" element={<LandingPage />} />
      <Route path="/schooleventcalendar/about" element={<About />} />
      <Route path="/schooleventcalendar/contact" element={<Contact />} />
      <Route path="/schooleventcalendar/login" element={<Login />} />
      <Route path="/schooleventcalendar/register" element={<Register />} />
      <Route path="/schooleventcalendar/studentdashboard" element={<StudentDashboard />} />
      <Route path="/schooleventcalendar/adminlogin" element={<AdminLogin />} />
      <Route path="/schooleventcalendar/admindashboard" element={<AdminDashboard />} />
      <Route path="/schooleventcalendar/eventmanager/*" element={<EventManager />} />
    </Routes>
  );
}

export default App;
