const db = require('../config/db');

class SleepRepository {
  async createSleepRecord(data) {
    const { userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date } = data;
    const sql = 'INSERT INTO sleep (userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(sql, [userId, bedTime, wakeUpTime, sleepDuration, sleepQuality, date]);
    return result;
  }

  async getAllSleepRecords(userId) {
    const sql = 'SELECT * FROM sleep WHERE userId = ?';
    const [results] = await db.promise().query(sql, [userId]);
    return results;
  }

  async updateSleepRecord(id, data) {
    const { bedTime, wakeUpTime, sleepDuration, sleepQuality, date } = data;
    const sql = 'UPDATE sleep SET bedTime = ?, wakeUpTime = ?, sleepDuration = ?, sleepQuality = ?, date = ? WHERE id = ?';
    const [result] = await db.promise().query(sql, [bedTime, wakeUpTime, sleepDuration, sleepQuality, date, id]);
    return result;
  }

  async deleteSleepRecord(id) {
    const sql = 'DELETE FROM sleep WHERE id = ?';
    const [result] = await db.promise().query(sql, [id]);
    return result;
  }
}

module.exports = new SleepRepository();
