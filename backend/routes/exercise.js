// routes/exercise.js
const express = require('express');
const router = express.Router();
const {
  createExerciseRecord,
  getExerciseRecords,
  getExerciseRecordsByDate,
  updateExerciseRecord,
  deleteExerciseRecord
} = require('../controllers/ExerciseController');

// Crear un nuevo ejercicio
router.post('/', createExerciseRecord);

// Obtener todos los ejercicios de un usuario
router.get('/:userId', getExerciseRecords);

// Obtener ejercicios de un usuario en una fecha específica
router.get('/:userId/by-date', getExerciseRecordsByDate);

// Actualizar un ejercicio por ID
router.put('/:id', updateExerciseRecord);

// Eliminar un ejercicio por ID
router.delete('/:id', deleteExerciseRecord);

module.exports = router;
