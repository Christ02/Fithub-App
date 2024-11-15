const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await mongoose.connect('mongodb://root:123a@mongo:27017/fithub', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin', // Usa la base de datos 'admin' para la autenticación
      });
      console.log('Conectado a la base de datos MongoDB de Docker');
      break;
    } catch (err) {
      console.error('Error conectando a la base de datos:', err);
      retries -= 1;
      console.log(`Reintentando conexión. Intentos restantes: ${retries}`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  if (!retries) process.exit(1); // Si no puede conectar después de varios intentos, se detiene
};

module.exports = connectDB;
