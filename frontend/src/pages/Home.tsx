import React from "react";
import "./page-styles/home.css";
import logo from "../assets/screenshot.jpg"; // Use the logo you uploaded

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logo} alt="Dixie Technical College Logo" className="logo" />
      </div>
      <div className="welcome-message">
        <h1 className="welcome-title">Welcome to Dixie Tech</h1>
        <a href="/patients" className="cta-button">Get Started</a>
      </div>
    </div>
  );
};

export default Home;

