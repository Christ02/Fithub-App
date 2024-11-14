// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Crear un nuevo usuario
router.post('/', userController.createUser);

// Iniciar sesión (no requiere autenticación)
router.post('/login', userController.loginUser);

// Rutas protegidas (requieren autenticación)
router.get('/user/:id', userController.verifyToken, userController.getUserById);

// Obtener un usuario por su ID
router.get('/:id', userController.getUserById);

// Actualizar un usuario por su ID
router.put('/:id', userController.updateUserById);

// Eliminar un usuario por su ID
router.delete('/:id', userController.deleteUserById);

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

module.exports = router;
