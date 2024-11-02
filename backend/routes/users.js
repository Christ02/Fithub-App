// routes/user.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Iniciar sesión (no requiere autenticación)
router.post('/login', userController.loginUser);

// Rutas protegidas (requieren autenticación)
router.get('/user/:id', userController.verifyToken, userController.getUserById);

// Ruta para obtener un usuario por su ID
router.get('/:id', userController.getUserById);

// Ruta para actualizar un usuario por su ID
router.put('/:id', userController.updateUserById);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', userController.deleteUserById);

router.get('/email/:email', userController.getUserByEmail);

router.get('/', userController.getAllUsers);


module.exports = router;
