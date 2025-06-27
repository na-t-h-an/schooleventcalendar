import React from 'react';
import './LandingPage.css';
import Header from './components/Header';
import MainText from './components/MainText';


const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />     
      <MainText />   
    </div>
  );
};

export default LandingPage;