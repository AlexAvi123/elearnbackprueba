/*****************PARTE DE ROLY********************/
const mongoose = require('mongoose');
const conn = mongoose.connection;
const Schema = mongoose.Schema;

//var itemsSchema = new Schema({ item: String, answer: Boolean });

const QuestionSchema = new Schema({
  task_id: {
    type: Schema.ObjectId,
    required: true,
    ref: "Task"
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    trim: true,
  },
  options: {
    type: Array,
    exists: true,
    trim: true,
  },
  body: {
    type: Array,
    required: false,
    trim: true,
  }

});

module.exports = mongoose.model('Question', QuestionSchema);