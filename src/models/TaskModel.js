const mongoose = require("../database/index");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var TaskSchemaJSON = {
  unit: ObjectId,
  type: { type: String },
  topic: {
    top: String,
    img: String,
  },
  objectives: {
    text: String,
    img: String,
  },
  explanation: String,
  imgAd: Array,
};
var TaskSchema = new Schema(TaskSchemaJSON);
var Task = new mongoose.model("Task", TaskSchema);

module.exports = Task;
