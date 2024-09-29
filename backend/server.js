const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const exerciseRoutes = require('./routes/exercise');
const nutritionRoutes = require('./routes/nutrition');
const sleepRoutes = require('./routes/sleep');
const userRoutes = require('./routes/users');  // Asegúrate de que esta ruta está correctamente conectada.

const app = express();

// Middleware
app.use(bodyParser.json());  // Habilita el procesamiento de JSON
app.use(cors());  // Permite CORS

// Rutas
app.use('/exercise', exerciseRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/sleep', sleepRoutes);
app.use('/users', userRoutes);  // Asegúrate de que esta línea está activa.

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Fithub funcionando');
});

// Iniciar servidor
app.listen(5000, () => {
  console.log('Servidor ejecutándose en el puerto 5000');
});
