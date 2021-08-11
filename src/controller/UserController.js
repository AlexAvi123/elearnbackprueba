const User = require("../models/UserModel");

class UserController {
    
  async saveUser(_user) {
      var user = new User(_user);
      await user.save();
  }
  deleteUser() {}
  changeUser() {}
}

module.exports = UserController;
