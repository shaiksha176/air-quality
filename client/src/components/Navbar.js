import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">W&A</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/aqi">Air</Link>
        <Link to="/weather">Weather</Link>
      </div>
    </div>
  );
};

export default Navbar;
