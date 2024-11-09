import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage'; 
import Login from './pages/Login/Login';  
import SignUpPage from './pages/SignUp/SignUpPage'; 
import DashboardPage from './pages/dashboard/DashboardPage';
import NutritionPage from './pages/nutrition/NutritionPage';
import ExercisePage from './pages/Exercise/ExercisePage';
import SleepPage from './pages/Sleep/SleepPage'; 



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Página principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta del login */}
        <Route path="/dashboard" element={<DashboardPage/>} /> {/* Ruta del dashboard */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Ruta del signup */}
        <Route path="/nutrition" element={<NutritionPage />} /> {/* ruta nutrition */}
        <Route path="/exercise" element={<ExercisePage />} /> {/* ejercicios */}
        <Route path="/sleep" element={<SleepPage userId={1} />} /> {/* Ruta para SleepPage */}



      </Routes>
    </Router>
  );
}

export default App;
