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
    // img:{
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
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
      confirmationCode: { 
        type: String, 
        unique: true },

});

module.exports = mongoose.model('Users', UserSchema);