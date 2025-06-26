import { useNavigate } from 'react-router-dom';

function HeaderNav({ username }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Event Manager Portal</div>
        <ul className="links">
          <li onClick={() => navigate('/eventmanager/createvent')}>Create Event</li>
          <li onClick={() => navigate('/eventmanager/managevent')}>Manage Events</li>
          <li onClick={() => navigate('/eventmanager/calendarview')}>Calendar View</li>
          <li onClick={() => navigate('/eventmanager/profile')}>{username || 'My Profile'}</li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderNav;
