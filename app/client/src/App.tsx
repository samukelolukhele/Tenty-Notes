import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AuthContextProvider from './context/AuthContext';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Note from './components/pages/Note';
import Profile from './components/pages/Profile';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="note/" element={<PrivateRoute component={Note} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
