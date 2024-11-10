// src/pages/nutrition/NutritionPage.js
import React from 'react';
import NutritionComponent from '../../components/Nutrition/NutritionComponent';
import Navbar from '../../components/Navbar/Navbar';

const NutritionPage = () => {
  const userId = 4; // Cambia esto con el ID del usuario actualmente logueado

  return (
    <div>
      <Navbar />
      <NutritionComponent userId={userId} />
    </div>
  );
};

export default NutritionPage;