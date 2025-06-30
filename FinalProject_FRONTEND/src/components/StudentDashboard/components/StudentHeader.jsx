import { useNavigate } from 'react-router-dom';

function StudentHeader({ username }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Student Portal</div>
        <ul className="links">
          <li onClick={() => navigate('/schooleventcalendar/studentdashboard/browseevents')}>Browse Events</li>
          <li onClick={() => navigate('/schooleventcalendar/studentdashboard/joinedevents')}>Joined Events</li>
          <li onClick={() => navigate('/schooleventcalendar/studentdashboard/calendarview')}>Calendar View</li>
          <li onClick={() => navigate('/schooleventcalendar/studentdashboard/profile')}>
            {username || 'My Profile'}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default StudentHeader;
