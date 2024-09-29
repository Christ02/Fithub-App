const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Crear un nuevo usuario (POST)
router.post('/', (req, res) => {
    const { name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal } = req.body;
    const sql = `
      INSERT INTO users (name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    
    db.query(sql, [name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    });
  });
  

// Obtener un usuario por su ID (GET)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result[0]);
  });
});

// Actualizar un usuario por su ID (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal } = req.body;
  
  const sql = 'UPDATE users SET name = ?, email = ?, password = ?, dateOfBirth = ?, gender = ?, weight = ?, height = ?, dailyCaloriesGoal = ?, dailyProteinGoal = ?, dailyCarbohydratesGoal = ?, dailyFatsGoal = ? WHERE id = ?';
  
  db.query(sql, [name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
});

// Eliminar un usuario por su ID (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  });
});

module.exports = router;
