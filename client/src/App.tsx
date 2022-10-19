import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AuthContextProvider from "./context/AuthContext";
import Card from "./components/Card";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

export const LoginContext = React.createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn: false) => {},
});

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
