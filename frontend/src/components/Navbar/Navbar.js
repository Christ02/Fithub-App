// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../../utils/auth';  
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Fithub</Link>  {/* Nombre de la app */}
      </div>
      <ul className="navbar-menu">
        {isLoggedIn() ? (
          <>
            {/* Si el usuario está autenticado */}
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Mi Perfil</Link></li>
            <li><button onClick={logout}>Cerrar Sesión</button></li>
          </>
        ) : (
          <>
            {/* Si el usuario no está autenticado */}
            <li><Link to="/login">Iniciar Sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
