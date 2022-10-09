import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/home/Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="text-container">
          <h1 className="main-text">
            Welcome To <span className="logo-small">Tenty</span>
            <span className="logo-bold">Notes</span>
          </h1>
          <h4 className="secondary-text">
            Capture important notes to help you learn or just to keep track of
            things.
          </h4>
        </div>
        <div className="btn-container">
          <Link to="/login" className="btn-primary">
            Log In
          </Link>
          <Link to="/register" className="btn-secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
