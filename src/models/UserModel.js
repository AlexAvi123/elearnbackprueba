const mongoose = require("../database/index");

var UserSchemaJSON = {
  id_document: {
    type: String,
    index: true,
    unique: true,
  },
  name: String,
  lastname: String,
  mail: String,
  password: String,
};

var UserSchema = new mongoose.Schema(UserSchemaJSON);
var User = new mongoose.model("User", UserSchema);

module.exports = User;
