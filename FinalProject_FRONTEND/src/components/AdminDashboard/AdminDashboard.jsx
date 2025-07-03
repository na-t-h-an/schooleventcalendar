import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from './components/SideNav/SideNav';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleResetForms = () => {
    // form reset logic (if needed) 
  };

  const handleLogout = () => {
  localStorage.removeItem('admin_token'); // ✅ Remove token
  navigate('/schooleventcalendar/adminlogin'); // ✅ Redirect to login
};

  return (
    <SideNav
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onResetForms={handleResetForms}
      onLogout={handleLogout}
    />
  );
}
