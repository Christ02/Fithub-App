// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode de forma nombrada

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token); // Usa jwtDecode en lugar de jwt_decode
          if (decoded && decoded.id) {
            setUserId(decoded.id);
          }
        }
      } catch (err) {
        console.error('Error decodificando el token:', err);
      }
    };

    fetchUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};
