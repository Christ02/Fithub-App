// src/pages/nutrition/NutritionPage.js
import React from 'react';
import NutritionComponent from '../../components/Nutrition/NutritionComponent';


const NutritionPage = () => {
  const userId = 4; // Cambia esto con el ID del usuario actualmente logueado

  return (
    <div>
      <h1>Nutrición</h1>
      <NutritionComponent userId={userId} />
    </div>
  );
};

export default NutritionPage;
