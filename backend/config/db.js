const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',  
    user: 'root',
    password: 'Lolipop1!',  
    database: 'fithub_app',
    port: 3307
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL de Docker');
});

module.exports = db;
