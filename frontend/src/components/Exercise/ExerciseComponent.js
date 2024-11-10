// src/components/exercise/ExerciseComponent.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createExerciseRecord, 
  getExerciseRecords, // Asegúrate de tener esta función en tu API
  updateExerciseRecord, 
  deleteExerciseRecord 
} from '../../api/exerciseApi';
import './ExerciseComponent.css';

const ExerciseComponent = ({ userId }) => {
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    exerciseType: '',
    duration: '',
    caloriesBurned: '',
    date: ''
  });

  const navigate = useNavigate();

  const formatDateForBackend = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const fetchExerciseRecords = async () => {
    console.log("Fetching all exercise records"); // Verificación
    try {
      const records = await getExerciseRecords(userId); // Obtener todos los registros
      setExerciseRecords(records);
    } catch (error) {
      console.error('Error fetching exercise records:', error);
    }
  };

  useEffect(() => {
    fetchExerciseRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleCreateRecord = async () => {
    // Validación antes de crear el registro
    if (!newRecord.exerciseType || !newRecord.date) {
      alert('Por favor, completa el tipo de ejercicio y la fecha.');
      return;
    }

    // Validar que los campos numéricos sean números
    const { duration, caloriesBurned } = newRecord;
    if (
      (duration && isNaN(duration)) ||
      (caloriesBurned && isNaN(caloriesBurned))
    ) {
      alert('Por favor, ingresa valores numéricos válidos para duración y calorías quemadas.');
      return;
    }

    try {
      await createExerciseRecord({ 
        ...newRecord, 
        userId,
        date: formatDateForBackend(newRecord.date) // Asegurar formato correcto
      });
      fetchExerciseRecords(); // Actualiza la lista de registros
      setNewRecord({ exerciseType: '', duration: '', caloriesBurned: '', date: '' });
    } catch (error) {
      console.error('Error creando registro de ejercicio:', error);
    }
  };

  const handleUpdateRecord = async (id) => {
    // Puedes implementar una lógica similar de validación aquí si es necesario
    try {
      await updateExerciseRecord(id, { ...newRecord, date: formatDateForBackend(newRecord.date) });
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

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <div className="exercise-wrapper">
      <div className="exercise-container">
        <h2>Registros de Ejercicio</h2>

        {/* Botón para volver al Dashboard */}
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          Volver al Menú
        </button>

        {/* Formulario para agregar un nuevo registro */}
        <div className="section-info">
          <h3>Agregar Registro</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleCreateRecord(); }}>
            <div className="form-group">
              <label htmlFor="exerciseType">Tipo de Ejercicio:</label>
              <input 
                type="text" 
                id="exerciseType"
                name="exerciseType" 
                placeholder="Tipo de ejercicio" 
                value={newRecord.exerciseType} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duración (minutos):</label>
              <input 
                type="number" 
                id="duration"
                name="duration" 
                placeholder="Duración en minutos" 
                value={newRecord.duration} 
                onChange={handleChange} 
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="caloriesBurned">Calorías Quemadas:</label>
              <input 
                type="number" 
                id="caloriesBurned"
                name="caloriesBurned" 
                placeholder="Calorías quemadas" 
                value={newRecord.caloriesBurned} 
                onChange={handleChange} 
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Fecha:</label>
              <input 
                type="date" 
                id="date"
                name="date" 
                placeholder="Fecha" 
                value={newRecord.date} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="submit-button">Agregar</button>
          </form>
        </div>

        {/* Lista de registros de ejercicio */}
        <div className="section-records">
          <h3>Lista de Registros</h3>
          <ul className="records-list">
            {exerciseRecords.map((record) => (
              <li key={record.id} className="record-item">
                <p><strong>Tipo:</strong> {record.exerciseType}</p>
                <p>
                  <strong>Duración:</strong> {record.duration} mins, 
                  <strong> Calorías Quemadas:</strong> {record.caloriesBurned}
                </p>
                <p><strong>Fecha:</strong> {formatDate(record.date)}</p>
                <div className="record-actions">
                  <button onClick={() => handleUpdateRecord(record.id)} className="update-button">Actualizar</button>
                  <button onClick={() => handleDeleteRecord(record.id)} className="delete-button">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
