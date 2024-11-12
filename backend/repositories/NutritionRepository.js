const db = require('../config/db');

class NutritionRepository {
  async createNutritionRecord(data) {
    const { userId, calories, protein, carbohydrates, fats, date, mealDescription } = data;
    const sql = 'INSERT INTO nutritionalcount (userId, calories, protein, carbohydrates, fats, date, mealDescription) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(sql, [userId, calories, protein, carbohydrates, fats, date, mealDescription]);
    return result;
  }

  async getNutritionRecords(userId) {
    const sql = 'SELECT * FROM nutritionalcount WHERE userId = ?';
    const [results] = await db.promise().query(sql, [userId]);
    return results;
  }

  async getNutritionRecordsByDate(userId, date) {
    const sql = 'SELECT * FROM nutritionalcount WHERE userId = ? AND DATE(date) = ?';
    const [results] = await db.promise().query(sql, [userId, date]);
    return results;
  }

  async updateNutritionRecord(id, data) {
    const { calories, protein, carbohydrates, fats, date, mealDescription } = data;
    const sql = 'UPDATE nutritionalcount SET calories = ?, protein = ?, carbohydrates = ?, fats = ?, date = ?, mealDescription = ? WHERE id = ?';
    const [result] = await db.promise().query(sql, [calories, protein, carbohydrates, fats, date, mealDescription, id]);
    return result;
  }

  async deleteNutritionRecord(id) {
    const sql = 'DELETE FROM nutritionalcount WHERE id = ?';
    const [result] = await db.promise().query(sql, [id]);
    return result;
  }
}

module.exports = new NutritionRepository();
