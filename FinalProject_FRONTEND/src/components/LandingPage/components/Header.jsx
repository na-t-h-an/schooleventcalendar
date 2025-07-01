import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="shadow-header">
      <div className="container">
        <Link to="/" className="logo">
          School <b>Event Planner</b>
        </Link>
        <nav>
          <ul className="links">
            <li><Link to="/schooleventcalendar/about" className="nav-link">About Us</Link></li>
            <li><Link to="/schooleventcalendar/contact" className="nav-link">Contact Us</Link></li>
            <li><Link to="/schooleventcalendar/login" className="nav-link">Login</Link></li>
            <li><Link to="/schooleventcalendar/register" className="nav-link">Sign-Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;