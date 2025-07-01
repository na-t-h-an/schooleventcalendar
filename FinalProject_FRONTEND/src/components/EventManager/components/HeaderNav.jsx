import { useNavigate } from 'react-router-dom';

function HeaderNav({ username }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Event Manager Portal</div>
        <ul className="links">
          <li onClick={() => navigate('/schooleventcalendar/eventmanager/createvent')}>Create Event</li>
          <li onClick={() => navigate('/schooleventcalendar/eventmanager/managevent')}>Manage Events</li>
          <li onClick={() => navigate('/schooleventcalendar/eventmanager/calendarview')}>Calendar View</li>
          <li onClick={() => navigate('/schooleventcalendar/eventmanager/profile')}>{'User'}</li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderNav;
