// repositories/ExerciseRepository.js
const Exercise = require('../models/Exercise');

class ExerciseRepository {
  async createExerciseRecord(data) {
    const exercise = new Exercise(data);
    return await exercise.save();
  }

  async getExerciseRecords(userId) {
    return await Exercise.find({ userId });
  }

  async getExerciseRecordsByDate(userId, date) {
    return await Exercise.find({ userId, date });
  }

  async updateExerciseRecord(id, data) {
    return await Exercise.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteExerciseRecord(id) {
    return await Exercise.findByIdAndDelete(id);
  }
}

module.exports = new ExerciseRepository();
