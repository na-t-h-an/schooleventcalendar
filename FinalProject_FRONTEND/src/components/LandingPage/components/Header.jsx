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
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Sign-Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;