// routes/nutrition.js
const express = require('express');
const router = express.Router();
const {
  createNutritionRecord,
  getNutritionRecords,
  getNutritionRecordsByDate,
  updateNutritionRecord,
  deleteNutritionRecord
} = require('../controllers/NutritionController');

// Crear un nuevo registro de nutrición
router.post('/', createNutritionRecord);

// Obtener todos los registros de nutrición de un usuario
router.get('/:userId', getNutritionRecords);

// Obtener registros de nutrición de un usuario en una fecha específica
router.get('/:userId/by-date', getNutritionRecordsByDate);

// Actualizar un registro de nutrición por ID
router.put('/:id', updateNutritionRecord);

// Eliminar un registro de nutrición por ID
router.delete('/:id', deleteNutritionRecord);

module.exports = router;
