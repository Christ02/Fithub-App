// repositories/NutritionRepository.js
const Nutrition = require('../models/Nutrition');

class NutritionRepository {
  async createNutritionRecord(data) {
    const nutritionRecord = new Nutrition(data);
    return await nutritionRecord.save();
  }

  async getNutritionRecords(userId) {
    return await Nutrition.find({ userId });
  }

  async getNutritionRecordsByDate(userId, date) {
    return await Nutrition.find({ userId, date });
  }

  async updateNutritionRecord(id, data) {
    return await Nutrition.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteNutritionRecord(id) {
    return await Nutrition.findByIdAndDelete(id);
  }
}

module.exports = new NutritionRepository();
