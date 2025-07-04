import React from 'react';
import EventManagerSection from './NavItems/EventManagerSection.jsx';
import StudentSection from './NavItems/StudentSection.jsx';
import EventsSection from './NavItems/EventsSection.jsx';
import { DashboardProvider } from '../../context/DashboardContext.jsx';

const SideNav = ({ activeSection, onSectionChange, onLogout, onResetForms }) => {
  const handleNavClick = (section, shouldResetForms = false) => {
    if (shouldResetForms) {
      onResetForms();
    }
    onSectionChange(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'eventManager':
        return <EventManagerSection />;
      case 'student':
        return <StudentSection />;
      case 'events':
        return <EventsSection />;
      default:
        return (
        <div className="section-container">
          <div className="content-card" style={{ padding: "40px", textAlign: "center" }}>
            <h2>Welcome to Admin Dashboard</h2>
            <p>Select a section from the sidebar to get started.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <DashboardProvider activeSection={activeSection} setActiveSection={onSectionChange}>
      <div className="dashboard-container">
        
        {/* Modern Sidebar */}
        <div className="modern-sidebar">
          <header className="sidebar-header">
            <div className="logo-section">
              <div className="logo-icon">📊</div>
              <span className="admin-title">Admin Panel</span>
            </div>
          </header>
          
          <nav className="sidebar-nav">
            <ul className="nav-list">
              <li>
                <button
                  className={`nav-item ${activeSection === 'eventManager' ? 'active' : ''}`}
                  onClick={() => handleNavClick('eventManager')}
                >
                  <span className="nav-icon">👥</span>
                  <span className="nav-text">EventManager</span>
                </button>
              </li>
              
              <li>
                <button
                  className={`nav-item ${activeSection === 'student' ? 'active' : ''}`}
                  onClick={() => handleNavClick('student')}
                >
                  <span className="nav-icon">🎓</span>
                  <span className="nav-text">Student</span>
                </button>
              </li>

              <li>
                <button
                  className={`nav-item ${activeSection === 'events' ? 'active' : ''}`}
                  onClick={() => handleNavClick('events')}
                >
                  <span className="nav-icon">📅</span>
                  <span className="nav-text">Events</span>
                </button>
              </li>
            </ul>
            
            <div className="sidebar-footer">
              <button className="logout-btn" onClick={onLogout}>
                <span className="nav-icon">🚪</span>
                <span className="nav-text">Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {renderContent()}
        </div>
        
      </div>
    </DashboardProvider>
  );
};

export default SideNav;