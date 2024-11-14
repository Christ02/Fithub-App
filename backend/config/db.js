// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://root:Lolipop1!@localhost:27017/fithub_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin', 
    });
    console.log('Conectado a la base de datos MongoDB de Docker');
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
