const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Nueva conexión para MongoDB
const exerciseRoutes = require('./routes/exercise');
const nutritionRoutes = require('./routes/nutrition');
const sleepRoutes = require('./routes/sleep');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a la base de datos MongoDB
connectDB(); // Llama a la función para conectar a MongoDB

// Rutas
app.use('/exercise', exerciseRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/sleep', sleepRoutes);
app.use('/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Fithub funcionando con MongoDB');
});

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal, por favor intenta de nuevo.');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
