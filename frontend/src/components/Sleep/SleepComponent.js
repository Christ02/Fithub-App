import React, { useState } from 'react';
import { createSleepRecord, getSleepRecordsByDate } from '../../api/sleepApi';
import './SleepComponent.css';

const SleepComponent = ({ userId }) => {
  const [date, setDate] = useState('');
  const [bedTime, setBedTime] = useState('');
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [sleepDuration, setSleepDuration] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [sleepRecords, setSleepRecords] = useState([]);

  // Función para calcular la duración del sueño y la calidad
  const calculateSleepDetails = () => {
    if (bedTime && wakeUpTime) {
      const bedTimeDate = new Date(`${date}T${bedTime}`);
      const wakeUpDate = new Date(`${date}T${wakeUpTime}`);

      if (wakeUpDate <= bedTimeDate) {
        wakeUpDate.setDate(wakeUpDate.getDate() + 1); // Para manejar cuando se despiertan al día siguiente
      }

      const diffMs = wakeUpDate - bedTimeDate;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      setSleepDuration(`${hours}h ${minutes}m`);

      // Establecer la calidad del sueño según las reglas definidas
      if (hours >= 7 && hours <= 9) {
        setSleepQuality('Excelente');
      } else if ((hours >= 6 && hours < 7) || (hours > 9 && hours <= 10)) {
        setSleepQuality('Buena');
      } else if ((hours >= 5 && hours < 6) || (hours > 10 && hours <= 11)) {
        setSleepQuality('Regular');
      } else {
        setSleepQuality('Mala');
      }
    }
  };

  // Manejar el envío del formulario
  const handleCreateRecord = async () => {
    calculateSleepDetails();
    const newSleepData = {
      userId,
      bedTime,
      wakeUpTime,
      sleepDuration,
      sleepQuality,
      date,
    };
    try {
      await createSleepRecord(newSleepData);
      alert('Registro de sueño agregado');
    } catch (error) {
      console.error('Error agregando el registro de sueño:', error);
    }
  };

  return (
    <div className="sleep-container">
      <h2>Registros de Sueño</h2>
      <div className="form-section">
        <label>Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Hora de Acostarse</label>
        <input
          type="time"
          value={bedTime}
          onChange={(e) => setBedTime(e.target.value)}
        />
        <label>Hora de Despertarse</label>
        <input
          type="time"
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
        />
        <button onClick={handleCreateRecord}>Guardar Registro de Sueño</button>
      </div>
      <div className="calculated-section">
        <h3>Detalles Calculados:</h3>
        <p><strong>Duración del Sueño:</strong> {sleepDuration}</p>
        <p><strong>Calidad del Sueño:</strong> {sleepQuality}</p>
      </div>
    </div>
  );
};

export default SleepComponent;
