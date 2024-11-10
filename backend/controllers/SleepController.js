// controllers/SleepController.js
const db = require('../config/db');

const createSleepRecord = (req, res) => {
  const { userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date } = req.body;
  const sql = 'INSERT INTO sleep (userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Registro de sueño agregado' });
  });
};

// Obtener todos los registros de sueño de un usuario
const getAllSleepRecords = (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM sleep WHERE userId = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Obtener registros de sueño por usuario y fecha
const getSleepRecordsByDate = (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  const sql = 'SELECT * FROM sleep WHERE userId = ? AND DATE(date) = ?';

  db.query(sql, [userId, date], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de sueño' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron registros de sueño para esta fecha' });
    }
    res.json(results);
  });
};

module.exports = {
  createSleepRecord,
  getAllSleepRecords,
  getSleepRecordsByDate,
};
