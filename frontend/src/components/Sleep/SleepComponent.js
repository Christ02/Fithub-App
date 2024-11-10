// src/components/sleep/SleepComponent.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createSleepRecord, 
  getAllSleepRecords, 
  updateSleepRecord, 
  deleteSleepRecord 
} from '../../api/sleepApi';
import './SleepComponent.css';

const SleepComponent = ({ userId }) => {
  const [sleepRecords, setSleepRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    date: '',
    bedTime: '',
    wakeUpTime: '',
    sleepDuration: 0, // Inicializado como número
    sleepQuality: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentRecordId, setCurrentRecordId] = useState(null);

  const navigate = useNavigate();

  // Función para formatear la fecha para el backend
  const formatDateForBackend = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  // Función para formatear la fecha para la visualización
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Función para calcular la duración del sueño y la calidad
  const calculateSleepDetails = (date, bedTime, wakeUpTime) => {
    if (date && bedTime && wakeUpTime) {
      const bedTimeDate = new Date(`${date}T${bedTime}`);
      const wakeUpDate = new Date(`${date}T${wakeUpTime}`);

      if (wakeUpDate <= bedTimeDate) {
        wakeUpDate.setDate(wakeUpDate.getDate() + 1); // Manejar despertarse al día siguiente
      }

      const diffMs = wakeUpDate - bedTimeDate;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      const sleepDuration = hours + minutes / 60; // Total horas como número decimal

      // Determinar la calidad del sueño
      let sleepQuality = 'Mala';
      if (hours >= 7 && hours <= 9) {
        sleepQuality = 'Excelente';
      } else if ((hours >= 6 && hours < 7) || (hours > 9 && hours <= 10)) {
        sleepQuality = 'Buena';
      } else if ((hours >= 5 && hours < 6) || (hours > 10 && hours <= 11)) {
        sleepQuality = 'Regular';
      }

      return { sleepDuration, sleepQuality };
    }
    return { sleepDuration: 0, sleepQuality: '' };
  };

  // Fetch todos los registros de sueño
  const fetchSleepRecords = async () => {
    try {
      const records = await getAllSleepRecords(userId);
      setSleepRecords(records);
    } catch (error) {
      console.error('Error obteniendo registros de sueño:', error);
      alert('Error obteniendo registros de sueño');
    }
  };

  useEffect(() => {
    fetchSleepRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleCreateRecord = async () => {
    const { date, bedTime, wakeUpTime } = newRecord;
    const { sleepDuration, sleepQuality } = calculateSleepDetails(date, bedTime, wakeUpTime);

    // Validación antes de crear el registro
    if (!date || !bedTime || !wakeUpTime) {
      alert('Por favor, completa la fecha, hora de acostarse y hora de despertarse.');
      return;
    }

    try {
      await createSleepRecord({ 
        userId,
        date: formatDateForBackend(date),
        bedTime,
        wakeUpTime,
        sleepDuration,
        sleepQuality
      });
      fetchSleepRecords(); // Actualiza la lista de registros
      setNewRecord({ date: '', bedTime: '', wakeUpTime: '', sleepDuration: 0, sleepQuality: '' });
      alert('Registro de sueño agregado correctamente');
    } catch (error) {
      console.error('Error agregando el registro de sueño:', error);
      alert('Error agregando el registro de sueño');
    }
  };

  const handleUpdateRecord = async (id) => {
    const { date, bedTime, wakeUpTime } = newRecord;
    const { sleepDuration, sleepQuality } = calculateSleepDetails(date, bedTime, wakeUpTime);

    // Validación antes de actualizar el registro
    if (!date || !bedTime || !wakeUpTime) {
      alert('Por favor, completa la fecha, hora de acostarse y hora de despertarse.');
      return;
    }

    try {
      await updateSleepRecord(id, { 
        userId,
        date: formatDateForBackend(date),
        bedTime,
        wakeUpTime,
        sleepDuration,
        sleepQuality
      });
      fetchSleepRecords(); // Actualiza la lista de registros después de la actualización
      setNewRecord({ date: '', bedTime: '', wakeUpTime: '', sleepDuration: 0, sleepQuality: '' });
      setIsUpdating(false);
      setCurrentRecordId(null);
      alert('Registro de sueño actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando el registro de sueño:', error);
      alert('Error actualizando el registro de sueño');
    }
  };

  const handleDeleteRecord = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      try {
        await deleteSleepRecord(id);
        fetchSleepRecords(); // Actualiza la lista de registros después de la eliminación
        alert('Registro de sueño eliminado correctamente');
      } catch (error) {
        console.error('Error eliminando el registro de sueño:', error);
        alert('Error eliminando el registro de sueño');
      }
    }
  };

  const initiateUpdate = (record) => {
    setIsUpdating(true);
    setCurrentRecordId(record.id);
    setNewRecord({
      date: formatDate(record.date),
      bedTime: record.bedTime,
      wakeUpTime: record.wakeUpTime,
      sleepDuration: record.sleepDuration,
      sleepQuality: record.sleepQuality
    });
  };

  const cancelUpdate = () => {
    setIsUpdating(false);
    setCurrentRecordId(null);
    setNewRecord({ date: '', bedTime: '', wakeUpTime: '', sleepDuration: 0, sleepQuality: '' });
  };

  // Función para formatear la duración del sueño para la visualización
  const formatSleepDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="sleep-wrapper">
      <div className="sleep-container">
        <h2>Registros de Sueño</h2>

        {/* Botón para volver al Dashboard */}
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          Volver al Menú
        </button>

        {/* Formulario para agregar o actualizar un registro */}
        <div className="section-info">
          <h3>{isUpdating ? 'Actualizar Registro' : 'Agregar Registro'}</h3>
          <form onSubmit={(e) => { e.preventDefault(); isUpdating ? handleUpdateRecord(currentRecordId) : handleCreateRecord(); }}>
            <div className="form-group">
              <label htmlFor="date">Fecha:</label>
              <input 
                type="date" 
                id="date"
                name="date" 
                value={newRecord.date} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="bedTime">Hora de Acostarse:</label>
              <input 
                type="time" 
                id="bedTime"
                name="bedTime" 
                value={newRecord.bedTime} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="wakeUpTime">Hora de Despertarse:</label>
              <input 
                type="time" 
                id="wakeUpTime"
                name="wakeUpTime" 
                value={newRecord.wakeUpTime} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="submit-button">
              {isUpdating ? 'Actualizar Registro' : 'Guardar Registro de Sueño'}
            </button>

            {isUpdating && (
              <button type="button" className="cancel-button" onClick={cancelUpdate}>
                Cancelar
              </button>
            )}
          </form>
        </div>

        {/* Lista de registros de sueño */}
        <div className="section-records">
          <h3>Lista de Registros</h3>
          <ul className="records-list">
            {sleepRecords.map((record) => (
              <li key={record.id} className="record-item">
                <p><strong>Fecha:</strong> {formatDate(record.date)}</p>
                <p><strong>Hora de Acostarse:</strong> {record.bedTime}</p>
                <p><strong>Hora de Despertarse:</strong> {record.wakeUpTime}</p>
                <p><strong>Duración del Sueño:</strong> {formatSleepDuration(record.sleepDuration)}</p>
                <p><strong>Calidad del Sueño:</strong> {record.sleepQuality}</p>
                <div className="record-actions">
                  <button onClick={() => initiateUpdate(record)} className="update-button">Actualizar</button>
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

export default SleepComponent;
