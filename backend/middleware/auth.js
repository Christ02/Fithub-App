// middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido.' });
    
  }

  // Extraer el token sin el prefijo "Bearer "
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token requerido.' });
  }
  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Adjunta los datos decodificados a la solicitud
    next();  // Continúa si el token es válido
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;
