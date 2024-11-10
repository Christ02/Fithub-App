// src/pages/exercise/ExercisePage.js
import React from 'react';
import ExerciseComponent from '../../components/Exercise/ExerciseComponent';
import Navbar from '../../components/Navbar/Navbar'; 

const ExercisePage = () => {
  const userId = 4; // Reemplaza esto con el userId actual

  return (
    <div >
      <Navbar /> 
      <ExerciseComponent userId={userId} />
    </div>
  );
};

export default ExercisePage;
