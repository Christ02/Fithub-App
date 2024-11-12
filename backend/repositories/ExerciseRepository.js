const db = require('../config/db');

class ExerciseRepository {
  async createExerciseRecord(data) {
    const { userId, exerciseType, duration, caloriesBurned, date } = data;
    const sql = 'INSERT INTO exercise (userId, exerciseType, duration, caloriesBurned, date) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(sql, [userId, exerciseType, duration, caloriesBurned, date]);
    return result;
  }

  async getExerciseRecords(userId) {
    const sql = 'SELECT * FROM exercise WHERE userId = ?';
    const [results] = await db.promise().query(sql, [userId]);
    return results;
  }

  async getExerciseRecordsByDate(userId, date) {
    const sql = 'SELECT * FROM exercise WHERE userId = ? AND DATE(date) = ?';
    const [results] = await db.promise().query(sql, [userId, date]);
    return results;
  }

  async updateExerciseRecord(id, data) {
    const { exerciseType, duration, caloriesBurned, date } = data;
    const sql = 'UPDATE exercise SET exerciseType = ?, duration = ?, caloriesBurned = ?, date = ? WHERE id = ?';
    const [result] = await db.promise().query(sql, [exerciseType, duration, caloriesBurned, date, id]);
    return result;
  }

  async deleteExerciseRecord(id) {
    const sql = 'DELETE FROM exercise WHERE id = ?';
    const [result] = await db.promise().query(sql, [id]);
    return result;
  }
}

module.exports = new ExerciseRepository();
