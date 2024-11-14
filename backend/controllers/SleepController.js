// controllers/SleepController.js
const SleepRepository = require('../repositories/SleepRepository');

const createSleepRecord = async (req, res) => {
  try {
    const sleepRecord = await SleepRepository.createSleepRecord(req.body);
    res.status(201).json({ message: 'Registro de sueño agregado', sleepRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSleepRecords = async (req, res) => {
  try {
    const records = await SleepRepository.getAllSleepRecords(req.params.userId);
    if (records.length === 0) return res.status(404).json({ message: 'No se encontraron registros de sueño para este usuario' });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSleepRecord = async (req, res) => {
  try {
    const updatedRecord = await SleepRepository.updateSleepRecord(req.params.id, req.body);
    if (!updatedRecord) return res.status(404).json({ message: 'Registro de sueño no encontrado' });
    res.status(200).json({ message: 'Registro de sueño actualizado exitosamente', updatedRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSleepRecord = async (req, res) => {
  try {
    const deletedRecord = await SleepRepository.deleteSleepRecord(req.params.id);
    if (!deletedRecord) return res.status(404).json({ message: 'Registro de sueño no encontrado' });
    res.status(200).json({ message: 'Registro de sueño eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSleepRecord, getAllSleepRecords, updateSleepRecord, deleteSleepRecord };
