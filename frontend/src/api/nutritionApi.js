// src/api/nutritionApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/nutrition'; // URL de tu backend para Nutrition

// Función para crear un nuevo registro de nutrición
export const createNutritionRecord = async (nutritionData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, nutritionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error creando registro de nutrición:', error);
    throw error;
  }
};

// Función para obtener todos los registros de nutrición de un usuario
export const getNutritionRecords = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo registros de nutrición:', error);
    throw error;
  }
};

// Función para obtener registros de nutrición de un usuario en una fecha específica
export const getNutritionRecordsByDate = async (userId, date) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${userId}/by-date`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { date }, // La fecha se envía como parámetro de consulta
    });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo registros de nutrición por fecha:', error);
    throw error;
  }
};

// Función para actualizar un registro de nutrición por ID
export const updateNutritionRecord = async (id, nutritionData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, nutritionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error actualizando registro de nutrición:', error);
    throw error;
  }
};

// Función para eliminar un registro de nutrición por ID
export const deleteNutritionRecord = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error eliminando registro de nutrición:', error);
    throw error;
  }
};