// controllers/ExerciseController.js
const db = require('../config/db');

const createExerciseRecord = (req, res) => {
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
};

const getExerciseRecords = (req, res) => {
  const { userId } = req.params;
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
};

// Nueva función para obtener ejercicios de un usuario en una fecha específica
const getExerciseRecordsByDate = (req, res) => {
  const { userId } = req.params;
  const { date } = req.query; // Tomar la fecha del parámetro de consulta

  if (!userId || !date) {
    return res.status(400).json({ error: 'Se requiere el ID del usuario y la fecha' });
  }

  const sql = 'SELECT * FROM exercise WHERE userId = ? AND date = ?';
  
  db.query(sql, [userId, date], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ejercicios para esta fecha' });
    }
    res.json(results);
  });
};

const updateExerciseRecord = (req, res) => {
  const { id } = req.params;
  const { exerciseType, duration, caloriesBurned, date } = req.body;
  
  const sql = 'UPDATE exercise SET exerciseType = ?, duration = ?, caloriesBurned = ?, date = ? WHERE id = ?';
  
  db.query(sql, [exerciseType, duration, caloriesBurned, date, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.send('Ejercicio actualizado');
  });
};

const deleteExerciseRecord = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM exercise WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.send('Ejercicio eliminado');
  });
};

module.exports = {
  createExerciseRecord,
  getExerciseRecords,
  getExerciseRecordsByDate, 
  updateExerciseRecord,
  deleteExerciseRecord,
};
