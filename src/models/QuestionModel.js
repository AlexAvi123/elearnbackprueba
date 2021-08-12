const mongoose = require("../database/index");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var optionSchemaJSON = { item: String, answer: Boolean };
var optionSchema = new Schema(optionSchemaJSON);
var QuestionSchemaJSON = {
  Task: ObjectId,
  type: { type: String },
  questionTxt: String,
  img: String,
  options: [optionSchema],
};

var QuestionSchema = new Schema(QuestionSchemaJSON);
var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
