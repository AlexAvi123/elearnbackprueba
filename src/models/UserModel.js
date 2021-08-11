const mongoose = require("../database/index");

var UserSchemaJSON = {
  id: String,
  name: String,
  username: String,
  mail: String,
  password: String,
};

var UserSchema = new mongoose.Schema(UserSchemaJSON);
var User = new mongoose.model("User", UserSchema);

module.exports = User;