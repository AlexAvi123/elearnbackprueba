const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

class UserController {

  async saveUser(_user) {
    try {
      var user = new User(_user);
      await user.save();
      return { res: "ok" }
    } catch (error) {
      return {"error": error}
    }
  }

  async findUser(_id, _mail) {
    var user
    try {
      if(_id != null){
        //objectIdUser = ObjectId(_id);
        user = await User.findById(_id);
      }else{
        user = await User.findOne({ mail: _mail });
      }
    } catch (error) {
      //return 0
      return {"error": error}
    }
    return user
  }


  async deleteUser(_id) { 
    try {
      await User.findOneAndDelete({ "_id": _id });
      return { res: "ok" }
    } catch (error) {
      return {"error": error}
    }
    
  }
  async changeUser() { }

  
}

module.exports = UserController;
