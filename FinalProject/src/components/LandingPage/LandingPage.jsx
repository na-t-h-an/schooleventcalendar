import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="shadow-header">
        <div className="container">
          <Link to="/" className="logo">School <b>Event Planner</b></Link>
          <ul className="links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Sign-Up</Link></li>
          </ul>
        </div>
      </header>

      <main className="content">
        <div className="container">
          <div className="info">
            <h1>Effortless Event Planning, One Click at a Time!</h1>
            <p>Create, manage, and share events seamlessly with our easy-to-use event maker. Stay organized with built-in calendars, reminders, and RSVPs—all in one place!</p>
            <Link to="/login" className="purple-button">Try Now!</Link>
          </div>
          <div className="image">
            <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=400&fit=crop" alt="Event Planning" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
