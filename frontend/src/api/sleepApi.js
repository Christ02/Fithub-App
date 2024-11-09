// src/api/sleepApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/sleep';

// Función para crear un nuevo registro de sueño
export const createSleepRecord = async (sleepData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, sleepData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creando registro de sueño:', error);
    throw error;
  }
};

// Función para obtener todos los registros de sueño de un usuario
export const getAllSleepRecords = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo registros de sueño:', error);
    throw error;
  }
};

// Función para actualizar un registro de sueño por ID
export const updateSleepRecord = async (id, sleepData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, sleepData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error actualizando registro de sueño:', error);
    throw error;
  }
};

// Función para eliminar un registro de sueño por ID
export const deleteSleepRecord = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error eliminando registro de sueño:', error);
    throw error;
  }
};
