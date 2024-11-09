// src/components/exercise/ExerciseComponent.js
import React, { useEffect, useState } from 'react';
import { createExerciseRecord, getExerciseRecords, getExerciseRecordsByDate, updateExerciseRecord, deleteExerciseRecord } from '../../api/exerciseApi';
import './ExerciseComponent.css';

const ExerciseComponent = ({ userId }) => {
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    exerciseType: '',
    duration: '',
    caloriesBurned: '',
    date: ''
  });
  const [filterDate, setFilterDate] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    fetchExerciseRecords();
  }, [userId]);

  const fetchExerciseRecords = async () => {
    try {
      const records = await getExerciseRecords(userId);
      setExerciseRecords(records);
    } catch (error) {
      console.error('Error obteniendo registros de ejercicio:', error);
    }
  };

  const handleFilterByDate = async () => {
    try {
      const records = await getExerciseRecordsByDate(userId, filterDate);
      setFilteredRecords(records);
    } catch (error) {
      console.error('Error filtrando registros de ejercicio por fecha:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleCreateRecord = async () => {
    try {
      await createExerciseRecord({ ...newRecord, userId });
      fetchExerciseRecords(); // Actualiza la lista de registros
      setNewRecord({ exerciseType: '', duration: '', caloriesBurned: '', date: '' });
    } catch (error) {
      console.error('Error creando registro de ejercicio:', error);
    }
  };

  const handleUpdateRecord = async (id) => {
    const updatedRecord = {
      exerciseType: newRecord.exerciseType,
      duration: newRecord.duration,
      caloriesBurned: newRecord.caloriesBurned,
      date: newRecord.date
    };

    try {
      await updateExerciseRecord(id, updatedRecord);
      fetchExerciseRecords(); // Actualiza la lista de registros después de la actualización
      setNewRecord({ exerciseType: '', duration: '', caloriesBurned: '', date: '' });
    } catch (error) {
      console.error('Error actualizando registro de ejercicio:', error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await deleteExerciseRecord(id);
      fetchExerciseRecords(); // Actualiza la lista de registros después de la eliminación
    } catch (error) {
      console.error('Error eliminando registro de ejercicio:', error);
    }
  };

  return (
    <div className="exercise-container">
      <h2>Registros de Ejercicio</h2>

      {/* Filtro por fecha */}
      <div className="filter-section">
        <label>Filtrar por fecha:</label>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
        <button onClick={handleFilterByDate}>Ver Ejercicios del Día</button>
      </div>

      {/* Formulario para agregar un nuevo registro */}
      <div className="form-section">
        <h3>Agregar Registro</h3>
        <input name="exerciseType" placeholder="Tipo de Ejercicio" value={newRecord.exerciseType} onChange={handleChange} />
        <input name="duration" placeholder="Duración (minutos)" value={newRecord.duration} onChange={handleChange} />
        <input name="caloriesBurned" placeholder="Calorías Quemadas" value={newRecord.caloriesBurned} onChange={handleChange} />
        <input type="date" name="date" placeholder="Fecha" value={newRecord.date} onChange={handleChange} />
        <button onClick={handleCreateRecord}>Agregar</button>
      </div>

      {/* Lista de registros de ejercicio */}
      <ul>
        {(filterDate ? filteredRecords : exerciseRecords).map((record) => (
          <li key={record.id} className="record-item">
            <p>{record.exerciseType}</p>
            <p>Duración: {record.duration} mins, Calorías: {record.caloriesBurned}</p>
            <p>Fecha: {record.date}</p>
            <button onClick={() => handleUpdateRecord(record.id)}>Actualizar</button>
            <button onClick={() => handleDeleteRecord(record.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseComponent;
