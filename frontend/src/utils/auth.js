// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';

// Función para verificar si el usuario tiene sesión activa
export const isLoggedIn = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return false;  // No hay sesión activa
  }

  try {
    // Decodificar el token
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;  // Tiempo actual en segundos

    // Verificar si el token ha expirado
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('authToken');  // Eliminar token expirado
      return false;
    }

    return true;  // Token válido, sesión activa
  } catch (error) {
    localStorage.removeItem('authToken');
    return false;  // Token inválido
  }
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('authToken');  // Eliminar el token de localStorage
  window.location.href = '/login';  // Redirigir al login
};
