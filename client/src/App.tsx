import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AuthContextProvider from "./context/AuthContext";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Note from "./components/pages/Note";
import Profile from "./components/pages/Profile";

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
          <Route
            path="/dashboard/profile/"
            element={<PrivateRoute component={Profile} />}
          />
          <Route path="note/" element={<Note />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
