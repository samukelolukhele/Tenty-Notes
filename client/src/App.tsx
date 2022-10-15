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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* <Card title="Fikanum!!!" body="Based god is the GOAT" author="Lil B" /> */}
      </Router>
    </AuthContextProvider>
  );
}

export default App;
