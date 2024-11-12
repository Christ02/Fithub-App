const NutritionRepository = require('../repositories/NutritionRepository');

const createNutritionRecord = async (req, res) => {
  try {
    await NutritionRepository.createNutritionRecord(req.body);
    res.status(201).json({ message: 'Registro de nutrición agregado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNutritionRecords = async (req, res) => {
  try {
    const records = await NutritionRepository.getNutritionRecords(req.params.userId);
    if (records.length === 0) return res.status(404).json({ message: 'No se encontraron registros de nutrición para este usuario' });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNutritionRecordsByDate = async (req, res) => {
  try {
    const records = await NutritionRepository.getNutritionRecordsByDate(req.params.userId, req.query.date);
    if (records.length === 0) return res.status(404).json({ message: 'No se encontraron registros de nutrición para esta fecha' });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateNutritionRecord = async (req, res) => {
  try {
    await NutritionRepository.updateNutritionRecord(req.params.id, req.body);
    res.status(200).json({ message: 'Registro de nutrición actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNutritionRecord = async (req, res) => {
  try {
    await NutritionRepository.deleteNutritionRecord(req.params.id);
    res.status(200).json({ message: 'Registro de nutrición eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createNutritionRecord, getNutritionRecords, getNutritionRecordsByDate, updateNutritionRecord, deleteNutritionRecord };
