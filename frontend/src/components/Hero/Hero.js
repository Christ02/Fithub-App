import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import comidaInicial from '../../assets/comida_inicial.png';

const Hero = () => {
  const navigate = useNavigate(); // Cambiamos useHistory por useNavigate

  // Función para manejar el clic en el botón y redirigir
  const handleSignUpClick = () => {
    navigate('/signup'); // Redirigir a /signup
  };

  return (
    <section className="hero">
      <div className='hero-container'>
        <div className='hero-content'>
          <h1>Una buena salud empieza por una buena alimentación.</h1>
          <p>¿Quieres saber más sobre tu alimentación? Controla tus comidas, conoce tus hábitos y alcanza tus objetivos con Fithub.</p>
          <button className='btn' onClick={handleSignUpClick}>Empieza Gratis</button> {/* Botón redirige al signup */}
        </div>
        <div className='hero-image'>
          <img src={comidaInicial} alt='comida saludable' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
