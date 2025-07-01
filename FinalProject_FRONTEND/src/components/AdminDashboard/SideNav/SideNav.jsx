import React from 'react';
import ViewEventManagers from './NavItems/ViewEventManager.jsx';
import CreateStudent from './NavItems/CreateStudent.jsx';
import ViewStudents from './NavItems/ViewStudents.jsx';
import CreateEvent from './NavItems/CreateEvent.jsx';
import ViewEvents from './NavItems/ViewEvents.jsx';
import { DashboardProvider } from '../DashboardContext.jsx';
import CreateEventManager from './NavItems/CreateEventManager.jsx';

const SideNav = ({ activeSection, onSectionChange, onLogout, onResetForms }) => {
  const handleNavClick = (section, shouldResetForms = false) => {
    if (shouldResetForms) {
      onResetForms();
    }
    onSectionChange(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'createEventManager':
        return <CreateEventManager />; // using already register form
      case 'viewEventManagers':
        return <ViewEventManagers />; // sing a shared table rendering function, likely called renderTable can be turned into a component
      case 'createStudent':
        return <CreateStudent />; // using already register form
      case 'viewStudents':
        return <ViewStudents />; // sing a shared table rendering function, likely called renderTable can be turned into a component
      case 'createEvent':
        return <CreateEvent />; // used ladas create event form
      case 'viewEvents':
        return <ViewEvents />; //  bug title date and location no data shown when created by admin but all goods if event manager nag himo
      default:
        return <p style={{ padding: '20px' }}>Welcome to Admin Dashboard</p>;
    }
  };

  return (
    <DashboardProvider activeSection={activeSection} setActiveSection={onSectionChange}>
      <div className="viewport" style={{ display: 'flex', height: '100vh' }}>
        
        {/* Sidebar - Only Navigation Buttons */}
        <div className="sidebar" style={{ width: '250px', backgroundColor: '#1a2b3c', color: 'white' }}>
          <header style={{ padding: '20px', fontWeight: 'bold' }}>
            <span className="admin-title">Admin Page</span>
          </header>
          <ul className="nav" style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <button
                className={`nav-button ${activeSection === 'createEventManager' ? 'active' : ''}`}
                onClick={() => handleNavClick('createEventManager', true)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: activeSection === 'createEventManager' ? '#3498db' : 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                Create EventManager
              </button>
            </li>
            
            <li>
              <button
                className={`nav-button ${activeSection === 'viewEventManagers' ? 'active' : ''}`}
                onClick={() => handleNavClick('viewEventManagers')}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: activeSection === 'viewEventManagers' ? '#3498db' : 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                View EventManagers
              </button>
            </li>

            <li>
              <button
                className={`nav-button ${activeSection === 'createStudent' ? 'active' : ''}`}
                onClick={() => handleNavClick('createStudent', true)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: activeSection === 'createStudent' ? '#3498db' : 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                Create Student
              </button>
            </li>

            <li>
              <button
                className={`nav-button ${activeSection === 'viewStudents' ? 'active' : ''}`}
                onClick={() => handleNavClick('viewStudents')}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: activeSection === 'viewStudents' ? '#3498db' : 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                View Students
              </button>
            </li>

            <li>
              <button
                className={`nav-button ${activeSection === 'createEvent' ? 'active' : ''}`}
                onClick={() => handleNavClick('createEvent', true)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: activeSection === 'createEvent' ? '#3498db' : 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                Create Event
              </button>
            </li>

            <li>
              <button
                className={`nav-button ${activeSection === 'viewEvents' ? 'active' : ''}`}
                onClick={() => handleNavClick('viewEvents')}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: activeSection === 'viewEvents' ? '#3498db' : 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                View Events
              </button>
            </li>

            <li>
              <button
                className="nav-button"
                onClick={onLogout}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area - Forms and Tables Display Here */}
        <div className="content" style={{ 
          flexGrow: 1, 
          padding: '30px', 
          overflowY: 'auto',
          backgroundColor: '#f8f9fa'
        }}>
          <div className="containerFluid">
            {renderContent()}
          </div>
        </div>
        
      </div>
    </DashboardProvider>
  );
};

export default SideNav;