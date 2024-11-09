import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNutritionRecord, getNutritionRecordsByDate, updateNutritionRecord, deleteNutritionRecord } from '../../api/nutritionApi';
import './NutritionComponent.css';

const NutritionComponent = ({ userId }) => {
  const [nutritionRecords, setNutritionRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    calories: '',
    protein: '',
    carbohydrates: '',
    fats: '',
    date: '',
    mealDescription: ''
  });
  const [filterDate, setFilterDate] = useState(''); // Nueva variable para la fecha de filtro
  
  const navigate = useNavigate();

  const formatDateForBackend = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const fetchNutritionRecordsByDate = async () => {
    console.log("Botón de Ver Alimentos del Día presionado"); // Verificación
    if (!filterDate) {
      console.warn("No se ha seleccionado una fecha"); // Agrega una advertencia si no hay fecha seleccionada
      return;
    }

    try {
      const formattedDate = formatDateForBackend(filterDate);
      const records = await getNutritionRecordsByDate(userId, formattedDate);
      setNutritionRecords(records);
    } catch (error) {
      console.error('Error obteniendo registros de nutrición por fecha:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleCreateRecord = async () => {
    try {
      await createNutritionRecord({ ...newRecord, userId });
      fetchNutritionRecordsByDate(); // Actualiza la lista de registros para la fecha seleccionada
      setNewRecord({ calories: '', protein: '', carbohydrates: '', fats: '', date: '', mealDescription: '' });
    } catch (error) {
      console.error('Error creando registro de nutrición:', error);
    }
  };

  const handleUpdateRecord = async (id) => {
    try {
      await updateNutritionRecord(id, newRecord);
      fetchNutritionRecordsByDate(); // Actualiza la lista de registros después de la actualización
    } catch (error) {
      console.error('Error actualizando registro de nutrición:', error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await deleteNutritionRecord(id);
      fetchNutritionRecordsByDate(); // Actualiza la lista de registros después de la eliminación
    } catch (error) {
      console.error('Error eliminando registro de nutrición:', error);
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="nutrition-wrapper">
      <div className="nutrition-container">
        <h2>Registros de Nutrición</h2>

        {/* Botón para volver al Dashboard */}
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          Volver al Menú
        </button>

        {/* Campo de filtro de fecha */}
        <div className="filter-container">
          <label>Filtrar por fecha:</label>
          <input 
            type="date" 
            value={filterDate} 
            onChange={(e) => setFilterDate(e.target.value)} 
          />
          <button onClick={fetchNutritionRecordsByDate}>Ver Alimentos del Día</button>
        </div>

        {/* Formulario para agregar un nuevo registro */}
        <div>
          <h3>Agregar Registro</h3>
          <input name="calories" placeholder="Calorías" value={newRecord.calories} onChange={handleChange} />
          <input name="protein" placeholder="Proteínas" value={newRecord.protein} onChange={handleChange} />
          <input name="carbohydrates" placeholder="Carbohidratos" value={newRecord.carbohydrates} onChange={handleChange} />
          <input name="fats" placeholder="Grasas" value={newRecord.fats} onChange={handleChange} />
          <input 
            type="date" 
            name="date" 
            placeholder="Fecha" 
            value={newRecord.date} 
            onChange={handleChange} 
          />
          <input name="mealDescription" placeholder="Descripción de la comida" value={newRecord.mealDescription} onChange={handleChange} />
          <button onClick={handleCreateRecord}>Agregar</button>
        </div>

        {/* Lista de registros de nutrición */}
        <ul>
          {nutritionRecords.map((record) => (
            <li key={record.id} className="record-item">
              <p>{record.mealDescription}</p>
              <p>Calorías: {record.calories}, Proteínas: {record.protein}, Carbohidratos: {record.carbohydrates}, Grasas: {record.fats}</p>
              <p>Fecha: {formatDate(record.date)}</p>
              <button onClick={() => handleUpdateRecord(record.id)}>Actualizar</button>
              <button onClick={() => handleDeleteRecord(record.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutritionComponent;
