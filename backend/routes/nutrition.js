const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Crear un nuevo registro de nutrición
router.post('/', (req, res) => {
  const { userId, calories, protein, carbohydrates, fats, date, mealDescription } = req.body;
  const sql = 'INSERT INTO nutritionalcount (userId, calories, protein, carbohydrates, fats, date, mealDescription) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [userId, calories, protein, carbohydrates, fats, date, mealDescription], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Registro de nutrición agregado' });
  });
});

// Obtener todos los registros de nutrición de un usuario
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM nutritionalcount WHERE userId = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Actualizar un registro nutricional por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { calories, protein, carbohydrates, fats, date, mealDescription } = req.body;
  
  const sql = 'UPDATE nutritionalcount SET calories = ?, protein = ?, carbohydrates = ?, fats = ?, date = ?, mealDescription = ? WHERE id = ?';
  
  db.query(sql, [calories, protein, carbohydrates, fats, date, mealDescription, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Registro de nutrición actualizado' });
  });
});


// Eliminar un registro nutricional por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM nutritionalcount WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Conteo nutricional eliminado');
  });
});

module.exports = router;
