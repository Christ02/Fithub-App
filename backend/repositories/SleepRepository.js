// repositories/SleepRepository.js
const Sleep = require('../models/Sleep');

class SleepRepository {
  async createSleepRecord(data) {
    const sleepRecord = new Sleep(data);
    return await sleepRecord.save();
  }

  async getAllSleepRecords(userId) {
    return await Sleep.find({ userId });
  }

  async updateSleepRecord(id, data) {
    return await Sleep.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSleepRecord(id) {
    return await Sleep.findByIdAndDelete(id);
  }
}

module.exports = new SleepRepository();
