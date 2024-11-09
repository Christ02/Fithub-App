// src/api/exerciseApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/exercise'; // URL de tu backend para Exercise

// Función para crear un nuevo registro de ejercicio
export const createExerciseRecord = async (exerciseData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, exerciseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creando registro de ejercicio:', error);
    throw error;
  }
};

// Función para obtener todos los registros de ejercicio de un usuario
export const getExerciseRecords = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo registros de ejercicio:', error);
    throw error;
  }
};

// Función para obtener registros de ejercicio de un usuario en una fecha específica
export const getExerciseRecordsByDate = async (userId, date) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}/by-date`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo registros de ejercicio por fecha:', error);
    throw error;
  }
};

// Función para actualizar un registro de ejercicio por ID
export const updateExerciseRecord = async (id, exerciseData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, exerciseData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error actualizando registro de ejercicio:', error);
    throw error;
  }
};

// Función para eliminar un registro de ejercicio por ID
export const deleteExerciseRecord = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error eliminando registro de ejercicio:', error);
    throw error;
  }
};
