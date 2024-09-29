const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Crear un nuevo registro de sueño
router.post('/', (req, res) => {
  const { userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date } = req.body;
  const sql = 'INSERT INTO sleep (userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Registro de sueño agregado' });
  });
});


// Obtener todos los registros de sueño de un usuario
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM sleep WHERE userId = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Actualizar un registro de sueño por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { bedTime, wakeUpTime, sleepDuration, sleepQuality } = req.body;
  
  const sql = 'UPDATE sleep SET bedTime = ?, wakeUpTime = ?, sleepDuration = ?, sleepQuality = ? WHERE id = ?';
  
  db.query(sql, [bedTime, wakeUpTime, sleepDuration, sleepQuality, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Registro de sueño actualizado' });
  });
});


// Eliminar un registro de sueño por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM sleep WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Registro de sueño eliminado');
  });
});

module.exports = router;
