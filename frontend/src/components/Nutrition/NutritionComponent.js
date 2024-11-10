// src/pages/dashboard/NutritionComponent.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createNutritionRecord, 
  getNutritionRecords, // Suponiendo que tienes una función para obtener todos los registros
  updateNutritionRecord, 
  deleteNutritionRecord 
} from '../../api/nutritionApi';
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

  const navigate = useNavigate();

  const formatDateForBackend = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const fetchNutritionRecords = async () => {
    console.log("Fetching all nutrition records"); // Verificación
    try {
      const records = await getNutritionRecords(userId); // Obtener todos los registros
      setNutritionRecords(records);
    } catch (error) {
      console.error('Error fetching nutrition records:', error);
    }
  };

  useEffect(() => {
    fetchNutritionRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleCreateRecord = async () => {
    // Validación antes de crear el registro
    if (!newRecord.mealDescription || !newRecord.date) {
      alert('Por favor, completa la descripción de la comida y la fecha.');
      return;
    }

    // Validar que los campos numéricos sean números
    const { calories, protein, carbohydrates, fats } = newRecord;
    if (
      (calories && isNaN(calories)) ||
      (protein && isNaN(protein)) ||
      (carbohydrates && isNaN(carbohydrates)) ||
      (fats && isNaN(fats))
    ) {
      alert('Por favor, ingresa valores numéricos válidos para calorías, proteínas, carbohidratos y grasas.');
      return;
    }

    try {
      await createNutritionRecord({ 
        ...newRecord, 
        userId,
        date: formatDateForBackend(newRecord.date) // Asegurar formato correcto
      });
      fetchNutritionRecords(); // Actualiza la lista de registros
      setNewRecord({ calories: '', protein: '', carbohydrates: '', fats: '', date: '', mealDescription: '' });
    } catch (error) {
      console.error('Error creating nutrition record:', error);
    }
  };

  const handleUpdateRecord = async (id) => {
    // Puedes implementar una lógica similar de validación aquí si es necesario
    try {
      await updateNutritionRecord(id, newRecord);
      fetchNutritionRecords(); // Actualiza la lista de registros después de la actualización
    } catch (error) {
      console.error('Error updating nutrition record:', error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await deleteNutritionRecord(id);
      fetchNutritionRecords(); // Actualiza la lista de registros después de la eliminación
    } catch (error) {
      console.error('Error deleting nutrition record:', error);
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

        {/* Formulario para agregar un nuevo registro */}
        <div className="form-container">
          <h3>Agregar Registro</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleCreateRecord(); }}>
            <div className="form-group">
              <label htmlFor="mealDescription">Descripción de la Comida:</label>
              <input 
                type="text" 
                id="mealDescription"
                name="mealDescription" 
                placeholder="Descripción de la comida" 
                value={newRecord.mealDescription} 
                onChange={handleChange} 
                required 
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

            <div className="form-group">
              <label htmlFor="calories">Calorías:</label>
              <input 
                type="number" 
                id="calories"
                name="calories" 
                placeholder="Calorías" 
                value={newRecord.calories} 
                onChange={handleChange} 
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="protein">Proteínas (g):</label>
              <input 
                type="number" 
                id="protein"
                name="protein" 
                placeholder="Proteínas" 
                value={newRecord.protein} 
                onChange={handleChange} 
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="carbohydrates">Carbohidratos (g):</label>
              <input 
                type="number" 
                id="carbohydrates"
                name="carbohydrates" 
                placeholder="Carbohidratos" 
                value={newRecord.carbohydrates} 
                onChange={handleChange} 
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fats">Grasas (g):</label>
              <input 
                type="number" 
                id="fats"
                name="fats" 
                placeholder="Grasas" 
                value={newRecord.fats} 
                onChange={handleChange} 
                min="0"
              />
            </div>

            <button type="submit" className="submit-button">Agregar</button>
          </form>
        </div>

        {/* Lista de registros de nutrición */}
        <ul className="records-list">
          {nutritionRecords.map((record) => (
            <li key={record.id} className="record-item">
              <div className="record-details">
                <p><strong>Descripción:</strong> {record.mealDescription}</p>
                <p>
                  <strong>Calorías:</strong> {record.calories}, 
                  <strong> Proteínas:</strong> {record.protein}g, 
                  <strong> Carbohidratos:</strong> {record.carbohydrates}g, 
                  <strong> Grasas:</strong> {record.fats}g
                </p>
                <p><strong>Fecha:</strong> {formatDate(record.date)}</p>
              </div>
              <div className="record-actions">
                <button onClick={() => handleUpdateRecord(record.id)} className="update-button">Actualizar</button>
                <button onClick={() => handleDeleteRecord(record.id)} className="delete-button">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NutritionComponent;
