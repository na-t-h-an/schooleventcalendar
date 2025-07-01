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
            <li><Link to="/schooleventcalendar/about">About Us</Link></li>
            <li><Link to="/schooleventcalendar/contact">Contact Us</Link></li>
            <li><Link to="/schooleventcalendar/login">Login</Link></li>
            <li><Link to="/schooleventcalendar/register">Sign-Up</Link></li>
          </ul>
      </div>
    </header>
  );
};

export default Header;