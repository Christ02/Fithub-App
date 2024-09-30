const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const exerciseRoutes = require('./routes/exercise');
const nutritionRoutes = require('./routes/nutrition');
const sleepRoutes = require('./routes/sleep');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(bodyParser.json());  
app.use(cors());  

// Verificar conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
    process.exit(1); // Termina si hay error
  } else {
    console.log('Conexión a la base de datos establecida');
  }
});

// Rutas
app.use('/exercise', exerciseRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/sleep', sleepRoutes);
app.use('/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Fithub funcionando');
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
