// controllers/userController.js

const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Función para crear un token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Crear un nuevo usuario con hashing de contraseña y token de autenticación
exports.createUser = async (req, res) => {
  const { name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal } = req.body;

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = `
      INSERT INTO users (name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal, createdAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    const result = await db.promise().query(sql, [name, email, hashedPassword, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal]);

    // Crear y enviar el token
    const token = createToken(result[0].insertId);
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      token,
      user: { name, email }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Iniciar sesión y generar un token
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ success: false, message: 'El usuario no existe' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Crear y enviar el token
    const token = createToken(result[0].insertId);
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      token,  // Aquí se incluye el token en la respuesta
      user: { name, email }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Middleware para verificar el token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token no válido' });
    }
    req.userId = decoded.id;
    next();
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

exports.getUserByEmail = (req, res) => {
  const { email } = req.params;
  console.log('Email recibido:', email);  // Depuración para verificar si el email llega correctamente
  
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result[0]);
  });
};

// Función para obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM users';  // Consulta para obtener todos los usuarios
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);  // Devolver todos los usuarios en formato JSON
  });
};