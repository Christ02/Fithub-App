import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage'; 
import Login from './pages/Login/Login';  
import SignUpPage from './pages/SignUp/SignUpPage'; 
import DashboardPage from './pages/dashboard/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Página principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta del login */}
        <Route path="/dashboard" element={<DashboardPage/>} /> {/* Ruta del dashboard */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Ruta del signup */}
      </Routes>
    </Router>
  );
}

export default App;
