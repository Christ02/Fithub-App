import React from 'react';
import Header from '../../components/Header/Header';  // Ruta hacia el Header
import Hero from '../../components/Hero/Hero';        // Ruta hacia el Hero
import Features from '../../components/Features/Features';  // Ruta hacia los Features

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
    </div>
  );
};

export default LandingPage;
