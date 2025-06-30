import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav/SideNav';
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
    navigate('/schooleventcalendar/adminlogin');
  };

  return (
    <SideNav
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      onResetForms={handleResetForms}
      onLogout={handleLogout}
    />
  );
}
