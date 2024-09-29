import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className='features'>
      <h2 className='features__title'>Las herramientas para tus objetivos</h2>
      <p className='features__subtitle'>
        ¿Quieres llevar un mejor control de tu salud? Fithub te ofrece las herramientas necesarias para alcanzar tus metas de salud y bienestar.
      </p>
      <div className='features__container'>
        <div className='feature'>
          <img src='/assets/icon1.png' alt='Icono de conteo de calorías' className='feature__icon' />
          <h3 className='feature__title'>Conteo de calorías</h3>
          <p className='feature__text'>
            Registra todas tus comidas diarias y mantén el control de tus calorías para lograr tus objetivos nutricionales.
          </p>
        </div>

        <div className='feature'>
          <img src='/assets/icon2.png' alt='Icono de ejercicio' className='feature__icon' />
          <h3 className='feature__title'>Registro de ejercicio</h3>
          <p className='feature__text'>
            Monitorea tus entrenamientos y las calorías quemadas para mejorar tu rendimiento físico.
          </p>
        </div>

        <div className='feature'>
          <img src='/assets/icon3.png' alt='Icono de sueño' className='feature__icon' />
          <h3 className='feature__title'>Seguimiento del sueño</h3>
          <p className='feature__text'>
            Lleva un registro detallado de tus horas de sueño y mejora la calidad de tu descanso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
