// src/pages/exercise/ExercisePage.js
import React from 'react';
import ExerciseComponent from '../../components/Exercise/ExerciseComponent';

const ExercisePage = () => {
  const userId = 1; // Reemplaza esto con el userId actual

  return (
    <div className="page-container">
      <ExerciseComponent userId={userId} />
    </div>
  );
};

export default ExercisePage;
