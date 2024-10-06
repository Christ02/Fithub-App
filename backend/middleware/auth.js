// middleware/auth.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_clave_secreta';  // Asegúrate de que sea la misma clave que usas en el controlador

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido.' });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Añade los datos decodificados del usuario a la solicitud
    next();  // Continúa si el token es válido
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;
