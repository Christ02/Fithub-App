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

const getAllSleepRecords = (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM sleep WHERE userId = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const updateSleepRecord = (req, res) => {
  const { id } = req.params;
  const { bedTime, wakeUpTime, sleepDuration, sleepQuality } = req.body;
  
  const sql = 'UPDATE sleep SET bedTime = ?, wakeUpTime = ?, sleepDuration = ?, sleepQuality = ? WHERE id = ?';
  
  db.query(sql, [bedTime, wakeUpTime, sleepDuration, sleepQuality, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Registro de sueño actualizado' });
  });
};

const deleteSleepRecord = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM sleep WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Registro de sueño eliminado');
  });
};

module.exports = {
  createSleepRecord,
  getAllSleepRecords,
  updateSleepRecord,
  deleteSleepRecord,
};
