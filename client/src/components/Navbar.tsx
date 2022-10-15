import React, { useContext } from "react";
import "../styles/components/Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

interface AProps {
  loggedIn: React.MutableRefObject<boolean>;
}

function Navbar() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span>Tenty</span>NOTES
        </Link>
        {loggedIn?.current ? (
          <Logout />
        ) : (
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
