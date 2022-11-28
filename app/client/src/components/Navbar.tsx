import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/components/Navbar/Navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logout from './Logout';
import useWindowDimesions from '../hooks/useWindowDimesions';
import { FaTimes, FaBars } from 'react-icons/fa';

function Navbar() {
  const navRef = useRef<any>();

  const showNavbar = () => navRef.current.classList.toggle('responsive_nav');
  const { loggedInUser } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span>Tenty</span>NOTES
        </Link>
        <nav ref={navRef} className="nav-links">
          {!localStorage.getItem('token') ? (
            <>
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
              <Link to="/login" onClick={showNavbar}>
                Login
              </Link>
              <Link to="/register" onClick={showNavbar}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" onClick={showNavbar}>
                Dashboard
              </Link>
              <Link
                to={`/dashboard/profile/?id=${loggedInUser?.id}`}
                onClick={showNavbar}
              >
                Profile
              </Link>
              <Logout />
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </>
          )}
        </nav>
        <button className="nav-btn nav-open-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
