// controllers/NutritionController.js
const NutritionRepository = require('../repositories/NutritionRepository');

const createNutritionRecord = async (req, res) => {
  try {
    const nutritionRecord = await NutritionRepository.createNutritionRecord(req.body);
    res.status(201).json({ message: 'Registro de nutrición creado exitosamente', nutritionRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNutritionRecords = async (req, res) => {
  try {
    const results = await NutritionRepository.getNutritionRecords(req.params.userId);
    if (results.length === 0) return res.status(404).json({ message: 'No se encontraron registros de nutrición para este usuario' });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNutritionRecordsByDate = async (req, res) => {
  try {
    const results = await NutritionRepository.getNutritionRecordsByDate(req.params.userId, req.query.date);
    if (results.length === 0) return res.status(404).json({ message: 'No se encontraron registros de nutrición para esta fecha' });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateNutritionRecord = async (req, res) => {
  try {
    const updatedRecord = await NutritionRepository.updateNutritionRecord(req.params.id, req.body);
    if (!updatedRecord) return res.status(404).json({ message: 'Registro de nutrición no encontrado' });
    res.status(200).json({ message: 'Registro de nutrición actualizado exitosamente', updatedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteNutritionRecord = async (req, res) => {
  try {
    const deletedRecord = await NutritionRepository.deleteNutritionRecord(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Registro de nutrición no encontrado' });
    res.status(200).json({ message: 'Registro de nutrición eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNutritionRecord,
  getNutritionRecords,
  getNutritionRecordsByDate,
  updateNutritionRecord,
  deleteNutritionRecord
};
