// routes/exercise.js
const express = require('express');
const router = express.Router();
const {
  createExerciseRecord,
  getExerciseRecords,
  updateExerciseRecord,
  deleteExerciseRecord
} = require('../controllers/ExerciseController');

// Crear un nuevo ejercicio
router.post('/', createExerciseRecord);

// Obtener todos los ejercicios de un usuario
router.get('/:userId', getExerciseRecords);

// Actualizar un ejercicio por ID
router.put('/:id', updateExerciseRecord);

// Eliminar un ejercicio por ID
router.delete('/:id', deleteExerciseRecord);

module.exports = router;
