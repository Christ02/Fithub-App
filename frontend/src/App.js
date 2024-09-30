import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage'; 
// import Login from './pages/Login/Login'; 
// import SignUpPage from './pages/SignUp/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Pagina principal */}

        <Route path="/dashboard" element={<DashboardPage/>} /> {/* Ruta de dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
