// repositories/UserRepository.js
const User = require('../models/User');

class UserRepository {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async getAllUsers() {
    return await User.find();
  }

  async updateUserById(id, data) {
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUserById(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
