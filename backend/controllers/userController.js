// controllers/userController.js

const db = require('../config/db');

// Crear un nuevo usuario
exports.createUser = (req, res) => {
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
};

// Obtener un usuario por su ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result[0]);
  });
};

// Actualizar un usuario por su ID
exports.updateUserById = (req, res) => {
  const { id } = req.params;
  const { name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal } = req.body;

  const sql = `
    UPDATE users 
    SET name = ?, email = ?, password = ?, dateOfBirth = ?, gender = ?, weight = ?, height = ?, dailyCaloriesGoal = ?, dailyProteinGoal = ?, dailyCarbohydratesGoal = ?, dailyFatsGoal = ?
    WHERE id = ?
  `;
  
  db.query(sql, [name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
};

// Eliminar un usuario por su ID
exports.deleteUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  });
};
