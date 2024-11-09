const express = require('express');
const router = express.Router();
const {
  createNutritionRecord,
  getNutritionRecords,
  updateNutritionRecord,
  deleteNutritionRecord,
  getNutritionRecordsByDate
} = require('../controllers/NutritionController');

// Ruta para crear un nuevo registro de nutrición
router.post('/', createNutritionRecord);

// Ruta para obtener todos los registros de nutrición de un usuario
router.get('/:userId', getNutritionRecords);

// Ruta para actualizar un registro de nutrición por ID
router.put('/:id', updateNutritionRecord);

// Ruta para eliminar un registro de nutrición por ID
router.delete('/:id', deleteNutritionRecord);

// Ruta para obtener registros de nutrición por usuario y fecha
router.get('/:userId/by-date', getNutritionRecordsByDate);

module.exports = router;
