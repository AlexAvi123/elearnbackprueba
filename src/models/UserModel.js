// const mongoose = require("../database/index");

// var UserSchemaJSON = {
//   id_document: {
//     type: String,
//     index: true,
//     unique: true,
//   },
//   name: String,
//   lastname: String,
//   mail: String,
//   password: String,
// };

// var UserSchema = new mongoose.Schema(UserSchemaJSON);
// var User = new mongoose.model("User", UserSchema);

// module.exports = User;

/*****************PARTE DE ROLY********************/
const  mongoose = require('mongoose');
const conn = mongoose.connection;
const Schema = mongoose.Schema;

const  UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    // imagen:{
    //     type: String,
    //     trim: true,
    // },
    mail: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

});

module.exports = mongoose.model('Users', UserSchema);