// src/components/Navbar/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Fithub</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard" activeClassName="active-link" exact>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/exercise" activeClassName="active-link">
            Ejercicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/nutrition" activeClassName="active-link">
            Nutrición
          </NavLink>
        </li>
        <li>
          <NavLink to="/sleep" activeClassName="active-link">
            Sueño
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
