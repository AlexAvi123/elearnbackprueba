/*****************PARTE DE ROLY********************/
const mongoose = require('mongoose');
const conn = mongoose.connection;
const Schema = mongoose.Schema;

//var itemsSchema = new Schema({ item: String, answer: Boolean });

const ProgressSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    required: true,
    ref: "User"
  },
  tasks_id: [{
    type: Schema.ObjectId,
    ref: "Task"
  }]
  
});

module.exports = mongoose.model('Progress', ProgressSchema);