// src/api/userApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // URL de tu backend

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creando usuario:', error);
    throw error;
  }
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    throw error;
  }
};

// Función para actualizar un usuario por ID
export const updateUserById = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    throw error;
  }
};

// Función para eliminar un usuario por ID
export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/email/${email}`); 
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  };