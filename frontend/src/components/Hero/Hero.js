import React from 'react';
import './Hero.css';
import comidaInicial from '../../assets/comida_inicial.png';

const Hero = () => {
  return (
    <section className="hero">
<div className='hero-container'>
  <div className='hero-content'>
    <h1>Una buena salud empieza por una buena alimentación.</h1>
    <p>¿Quieres saber más sobre tu alimentación? Controla tus comidas, conoce tus hábitos y alcanza tus objetivos con Fithub.</p>
    <button className='btn'>Empieza Gratis</button>
  </div>
  <div className='hero-image'>
    <img src={comidaInicial} alt='comida saludable' />
  </div>
</div>

    </section>
  );
};

export default Hero;
