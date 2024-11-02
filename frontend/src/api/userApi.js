// src/api/userApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // URL de tu backend

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);

    // Verifica si hay un token en la respuesta y lo almacena en el local storage
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      console.log('Token almacenado en local storage:', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Error creando usuario:', error);
    throw error;
  }
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
};

// Función para actualizar un usuario por ID
export const updateUserById = async (id, userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    throw error;
  }
};

// Función para eliminar un usuario por ID
export const deleteUserById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/email/${email}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
};