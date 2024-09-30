// routes/nutrition.js
const express = require('express');
const router = express.Router();
const {
  createNutritionRecord,
  getNutritionRecords,
  updateNutritionRecord,
  deleteNutritionRecord
} = require('../controllers/NutritionController');

// Crear un nuevo registro de nutrición
router.post('/', createNutritionRecord);

// Obtener todos los registros de nutrición de un usuario
router.get('/:userId', getNutritionRecords);

// Actualizar un registro nutricional por ID
router.put('/:id', updateNutritionRecord);

// Eliminar un registro nutricional por ID
router.delete('/:id', deleteNutritionRecord);

module.exports = router;
