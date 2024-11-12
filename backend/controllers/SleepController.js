const SleepRepository = require('../repositories/SleepRepository');

const createSleepRecord = async (req, res) => {
  try {
    await SleepRepository.createSleepRecord(req.body);
    res.status(201).json({ message: 'Registro de sueño agregado' });
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
    await SleepRepository.updateSleepRecord(req.params.id, req.body);
    res.status(200).json({ message: 'Registro de sueño actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSleepRecord = async (req, res) => {
  try {
    await SleepRepository.deleteSleepRecord(req.params.id);
    res.status(200).json({ message: 'Registro de sueño eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSleepRecord, getAllSleepRecords, updateSleepRecord, deleteSleepRecord };
