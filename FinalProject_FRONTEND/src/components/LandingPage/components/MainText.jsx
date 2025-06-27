import React from 'react';
import { Link } from 'react-router-dom';
import './MainText.css';

const MainText = () => {
  return (
    <main className="content">
      <div className="container">
        <section className="info">
          <h1>Effortless Event Planning, One Click at a Time!</h1>
          <p>
            Create, manage, and share events seamlessly with our easy-to-use event maker.
            Stay organized with built-in calendars, reminders, and RSVPs—all in one place!
          </p>
          <Link to="/login" className="purple-button">
            Try Now!
          </Link>
        </section>

        <div className="image">
          <img
            src="https://i.postimg.cc/65QxYYzh/001234.png"
            alt="Event Planning Illustration"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
};

export default MainText;
