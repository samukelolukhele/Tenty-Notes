import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span>Tenty</span>NOTES
        </Link>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
