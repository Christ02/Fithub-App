import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1>Bienvenido a tu Dashboard</h1>
      <div className="dashboard-widgets">
        <div className="widget">
          <h2>Progreso de Calorías</h2>
          <p>Meta diaria: 2000 kcal</p>
          <p>Consumido hoy: 1500 kcal</p>
        </div>
        <div className="widget">
          <h2>Ejercicio</h2>
          <p>Ejercicio semanal: 3 sesiones</p>
          <p>Calorías quemadas hoy: 300 kcal</p>
        </div>
        <div className="widget">
          <h2>Sueño</h2>
          <p>Horas dormidas hoy: 7h</p>
          <p>Meta de sueño: 8h</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
