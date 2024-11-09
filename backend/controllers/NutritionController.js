// controllers/NutritionController.js
const db = require('../config/db');

// Crear un nuevo registro de nutrición
const createNutritionRecord = (req, res) => {
  const { userId, calories, protein, carbohydrates, fats, date, mealDescription } = req.body;

  // Validación de datos
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


// Actualizar un registro de nutrición por ID
const updateNutritionRecord = (req, res) => {
  const { id } = req.params;
  const { calories, protein, carbohydrates, fats, date, mealDescription } = req.body;

  if (!id || !calories || !protein || !carbohydrates || !fats || !date || !mealDescription) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios para la actualización' });
  }

  const sql = 'UPDATE nutritionalcount SET calories = ?, protein = ?, carbohydrates = ?, fats = ?, date = ?, mealDescription = ? WHERE id = ?';

  db.query(sql, [calories, protein, carbohydrates, fats, date, mealDescription, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el registro de nutrición' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No se encontró el registro de nutrición para actualizar' });
    }
    res.status(200).json({ message: 'Registro de nutrición actualizado' });
  });
};


// Eliminar un registro de nutrición por ID
const deleteNutritionRecord = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Se requiere el ID del registro para eliminar' });
  }

  const sql = 'DELETE FROM nutritionalcount WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el registro de nutrición' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No se encontró el registro de nutrición para eliminar' });
    }
    res.status(200).json({ message: 'Registro de nutrición eliminado' });
  });
};

// Obtener registros de nutrición por usuario y fecha
const getNutritionRecordsByDate = (req, res) => {
  const { userId } = req.params;
  const { date } = req.query; // Tomamos la fecha desde el parámetro de consulta

  if (!userId || !date) {
    return res.status(400).json({ error: 'Se requiere el ID del usuario y la fecha' });
  }

  const sql = 'SELECT * FROM nutritionalcount WHERE userId = ? AND date = ?';

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
  updateNutritionRecord,
  deleteNutritionRecord,
  getNutritionRecordsByDate,
};

