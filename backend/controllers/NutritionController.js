// controllers/NutritionController.js
const db = require('../config/db');

// Crear un nuevo registro de nutrición
const createNutritionRecord = (req, res) => {
  const { userId, calories, protein, carbohydrates, fats, date, mealDescription } = req.body;

  if (!userId || !calories || !protein || !carbohydrates || !fats || !date || !mealDescription) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = 'INSERT INTO nutritionalcount (userId, calories, protein, carbohydrates, fats, date, mealDescription) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [userId, calories, protein, carbohydrates, fats, date, mealDescription], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al agregar el registro de nutrición' });
    }
    res.status(201).json({ message: 'Registro de nutrición agregado', id: result.insertId });
  });
};

// Obtener todos los registros de nutrición de un usuario
const getNutritionRecords = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Se requiere el ID del usuario' });
  }

  const sql = 'SELECT id, userId, calories, protein, carbohydrates, fats, DATE_FORMAT(date, "%Y-%m-%d") AS date, mealDescription FROM nutritionalcount WHERE userId = ?';

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de nutrición' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron registros de nutrición para este usuario' });
    }
    res.json(results);
  });
};

// Obtener registros de nutrición por usuario y fecha
const getNutritionRecordsByDate = (req, res) => {
  const { userId } = req.params;
  const { date } = req.query;

  if (!userId || !date) {
    return res.status(400).json({ error: 'Se requiere el ID del usuario y la fecha' });
  }

  const sql = 'SELECT * FROM nutritionalcount WHERE userId = ? AND DATE(date) = ?';

  db.query(sql, [userId, date], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de nutrición' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron registros de nutrición para esta fecha' });
    }
    res.json(results);
  });
};

module.exports = {
  createNutritionRecord,
  getNutritionRecords,
  getNutritionRecordsByDate,
};
