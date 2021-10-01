const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const nodemailer = require("../config/nodemailer.config");

class UserController {
  async saveUser(_user) {
    try {
      var user = new User(_user);
      await user.save();
      nodemailer.sendConfirmationEmail(
        _user.name,
        _user.lastname,
        _user.mail,
        _user.confirmationCode
      );
      return "OK";
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async findUser(_id, _mail, _token) {
    var user;
    try {
      if (_id != null) {
        //objectIdUser = ObjectId(_id);
        user = await User.findById(_id);
      } else if (_token != null) {
        user = await User.findOne({ confirmationCode: _token });
        
      } else {
        user = await User.findOne({ mail: _mail });
      }
      return user;
    } catch (error) {
      //return 0
      return { error: error };
    }
  }

  async deleteUser(_id) {
    try {
      await User.findOneAndDelete({ _id: _id });
      return { res: "ok" };
    } catch (error) {
      return { error: error };
    }
  }
  async changeUser(_id, _update) {
    try{
      await User.findByIdAndUpdate({_id}, _update);
      return 'OK'
    }catch(error){
      console.log(error)
      return error
    }
  }
}

module.exports = UserController;
