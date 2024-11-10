// controllers/ExerciseController.js
const db = require('../config/db');

const createExerciseRecord = (req, res) => {
  const { userId, exerciseType, duration, caloriesBurned, date } = req.body;

  const exerciseDate = date ? date : new Date().toISOString().split('T')[0];

  const sql = 'INSERT INTO exercise (userId, exerciseType, duration, caloriesBurned, date) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [userId, exerciseType, duration, caloriesBurned, exerciseDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Registro de ejercicio creado exitosamente' });
  });
};

// Obtener todos los registros de ejercicio de un usuario
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

// Obtener registros de ejercicio por usuario y fecha
const getExerciseRecordsByDate = (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  const sql = 'SELECT * FROM exercise WHERE userId = ? AND DATE(date) = ?';

  db.query(sql, [userId, date], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de ejercicio' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron registros de ejercicio para esta fecha' });
    }
    res.json(results);
  });
};

module.exports = {
  createExerciseRecord,
  getExerciseRecords,
  getExerciseRecordsByDate,
};
