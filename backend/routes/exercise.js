const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta para crear un nuevo ejercicio
router.post('/', (req, res) => {
  const { userId, exerciseType, duration, caloriesBurned, date } = req.body;
  
  const exerciseDate = date ? date : new Date().toISOString().split('T')[0];  // Usar la fecha actual si no se proporciona

  const sql = `
    INSERT INTO exercise (userId, exerciseType, duration, caloriesBurned, date) 
    VALUES (?, ?, ?, ?, ?)
  `;
  
  db.query(sql, [userId, exerciseType, duration, caloriesBurned, exerciseDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Registro de ejercicio creado exitosamente' });
  });
});


// Obtener todos los ejercicios de un usuario específico
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM exercise WHERE userId = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ejercicios para este usuario' });
    }
    res.json(results);
  });
});

// Actualizar un ejercicio por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { exerciseType, duration, caloriesBurned, date } = req.body;
  const sql = 'UPDATE exercise SET exerciseType = ?, duration = ?, caloriesBurned = ?, date = ? WHERE id = ?';
  db.query(sql, [exerciseType, duration, caloriesBurned, date, id], (err, result) => {
    if (err) throw err;
    res.send('Ejercicio actualizado');
  });
});

// Eliminar un ejercicio por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM exercise WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Ejercicio eliminado');
  });
});

module.exports = router;
