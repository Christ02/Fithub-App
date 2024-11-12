const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// Verificar el token de autorización
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

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const existingUser = await UserRepository.findUserByEmail(req.body.email);
    if (existingUser) return res.status(400).json({ success: false, message: 'El usuario ya existe' });

    const user = await UserRepository.createUser(req.body);
    const token = createToken(user.insertId);
    res.status(201).json({ success: true, message: 'Usuario creado exitosamente', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Iniciar sesión de usuario
exports.loginUser = async (req, res) => {
  try {
    const user = await UserRepository.findUserByEmail(req.body.email);
    if (!user) return res.status(400).json({ success: false, message: 'El usuario no existe' });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });

    const token = createToken(user.id);
    res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await UserRepository.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario por email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await UserRepository.findUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserRepository.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario por ID
exports.updateUserById = async (req, res) => {
  try {
    await UserRepository.updateUserById(req.params.id, req.body);
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar usuario por ID
exports.deleteUserById = async (req, res) => {
  try {
    await UserRepository.deleteUserById(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
