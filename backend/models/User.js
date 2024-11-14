// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  dailyCaloriesGoal: { type: Number, default: 0 },
  dailyProteinGoal: { type: Number, default: 0 },
  dailyCarbohydratesGoal: { type: Number, default: 0 },
  dailyFatsGoal: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Pre-save middleware para encriptar la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
