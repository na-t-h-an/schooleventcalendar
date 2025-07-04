import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          School <b>Event Planner</b>
        </Link>
          <ul className="links">
            <li><Link to="/schooleventcalendar/login" className="nav-link">Login</Link></li>
            <li><Link to="/schooleventcalendar/register" className="nav-link">Sign-Up</Link></li>
          </ul>
      </div>
    </header>
  );
};

export default Header;