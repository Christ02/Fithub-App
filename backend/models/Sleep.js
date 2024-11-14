// models/Sleep.js
const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bedTime: { type: String, required: true },
  wakeUpTime: { type: String, required: true },
  sleepDuration: { type: Number, required: true },
  sleepQuality: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sleep', SleepSchema);
