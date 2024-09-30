// routes/sleep.js
const express = require('express');
const router = express.Router();
const {
  createSleepRecord,
  getAllSleepRecords,
  updateSleepRecord,
  deleteSleepRecord,
} = require('../controllers/SleepController');

// Crear un nuevo registro de sueño
router.post('/', createSleepRecord);

// Obtener todos los registros de sueño de un usuario
router.get('/:userId', getAllSleepRecords);

// Actualizar un registro de sueño por ID
router.put('/:id', updateSleepRecord);

// Eliminar un registro de sueño por ID
router.delete('/:id', deleteSleepRecord);

module.exports = router;
