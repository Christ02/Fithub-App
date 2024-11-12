const db = require('../config/db');
const bcrypt = require('bcrypt');

class UserRepository {
  
  // Crear un nuevo usuario
  async createUser(data) {
    const { name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const sql = `
      INSERT INTO users (name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    const [result] = await db.promise().query(sql, [name, email, hashedPassword, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal]);
    return result;
  }

  // Buscar usuario por email
  async findUserByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [user] = await db.promise().query(sql, [email]);
    return user[0];
  }

  // Obtener usuario por ID
  async getUserById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const [result] = await db.promise().query(sql, [id]);
    return result[0];
  }

  // Obtener todos los usuarios
  async getAllUsers() {
    const sql = 'SELECT * FROM users';
    const [users] = await db.promise().query(sql);  // No llamar a UserRepository.getAllUsers(), solo ejecuta la consulta
    return users;
  }

  // Actualizar usuario por ID
  async updateUserById(id, data) {
    const { name, email, password, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const sql = `
      UPDATE users SET name = ?, email = ?, password = ?, dateOfBirth = ?, gender = ?, weight = ?, height = ?, dailyCaloriesGoal = ?, dailyProteinGoal = ?, dailyCarbohydratesGoal = ?, dailyFatsGoal = ?
      WHERE id = ?
    `;
    const [result] = await db.promise().query(sql, [name, email, hashedPassword, dateOfBirth, gender, weight, height, dailyCaloriesGoal, dailyProteinGoal, dailyCarbohydratesGoal, dailyFatsGoal, id]);
    return result;
  }

  // Eliminar usuario por ID
  async deleteUserById(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const [result] = await db.promise().query(sql, [id]);
    return result;
  }
}

module.exports = new UserRepository();
