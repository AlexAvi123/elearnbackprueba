// const mongoose = require("../database/index");
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// var optionSchemaJSON = { item: String, answer: Boolean };

// var optionSchema = new Schema(optionSchemaJSON);
// var QuestionSchemaJSON = {
//   Task: ObjectId,
//   type: { type: String },
//   questionTxt: String,
//   img: Array,
//   options: [optionSchema],
// };

// var QuestionSchema = new Schema(QuestionSchemaJSON);
// var Question = mongoose.model("Question", QuestionSchema);

// module.exports = Question;

/*****************PARTE DE ROLY********************/
const mongoose = require('mongoose');
const conn = mongoose.connection;
const Schema = mongoose.Schema;

//var imgsSchema = new Schema({ item: String, answer: Boolean });

const QuestionSchema = new Schema({
  task_id: {
    type: Schema.ObjectId,
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
});

module.exports = mongoose.model('Question', QuestionSchema);