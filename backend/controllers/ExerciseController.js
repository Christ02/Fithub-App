const ExerciseRepository = require('../repositories/ExerciseRepository');

const createExerciseRecord = async (req, res) => {
  try {
    await ExerciseRepository.createExerciseRecord(req.body);
    res.status(201).json({ message: 'Registro de ejercicio creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExerciseRecords = async (req, res) => {
  try {
    const results = await ExerciseRepository.getExerciseRecords(req.params.userId);
    if (results.length === 0) return res.status(404).json({ message: 'No se encontraron ejercicios para este usuario' });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExerciseRecordsByDate = async (req, res) => {
  try {
    const results = await ExerciseRepository.getExerciseRecordsByDate(req.params.userId, req.query.date);
    if (results.length === 0) return res.status(404).json({ message: 'No se encontraron ejercicios para esta fecha' });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExerciseRecord = async (req, res) => {
  try {
    await ExerciseRepository.updateExerciseRecord(req.params.id, req.body);
    res.status(200).json({ message: 'Registro de ejercicio actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExerciseRecord = async (req, res) => {
  try {
    await ExerciseRepository.deleteExerciseRecord(req.params.id);
    res.status(200).json({ message: 'Registro de ejercicio eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createExerciseRecord, getExerciseRecords, getExerciseRecordsByDate, updateExerciseRecord, deleteExerciseRecord };
