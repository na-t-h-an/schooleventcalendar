import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <main className="content">
        <div className="container">
          <h1>About Us</h1>
          <section className="about-content">
            <h2>Welcome to School Event Planner</h2>
            <p>
              We are dedicated to making school event planning easier and more efficient. 
              Our platform helps educational institutions organize, manage, and execute 
              memorable events that bring communities together.
            </p>
            
            <h3>Our Mission</h3>
            <p>
              To provide schools with the tools they need to create engaging, 
              well-organized events that enhance the educational experience and 
              foster community connections.
            </p>
            
            <h3>What We Offer</h3>
            <ul>
              <li>Easy event creation and management</li>
              <li>Student and parent communication tools</li>
              <li>Budget tracking and resource allocation</li>
              <li>Volunteer coordination</li>
              <li>Event promotion and marketing</li>
            </ul>
            
            <h3>Our Team</h3>
            <p>
              Our team consists of education professionals, software developers, 
              and event planning experts who understand the unique challenges 
              schools face when organizing events.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;