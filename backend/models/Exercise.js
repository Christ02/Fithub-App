// models/Exercise.js
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseType: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
