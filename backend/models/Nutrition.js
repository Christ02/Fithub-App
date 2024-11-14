// models/Nutrition.js
const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbohydrates: { type: Number, required: true },
  fats: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  mealDescription: { type: String, required: true }
});

module.exports = mongoose.model('Nutrition', NutritionSchema);
