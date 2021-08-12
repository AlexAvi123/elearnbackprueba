const mongoose = require("../database/index");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var ProgressSchemaJSON = {
  user: ObjectId,
  task_id: [ObjectId],
};

var ProgressSchema = new Schema(ProgressSchemaJSON);
var Progress = new mongoose.model("Progress", ProgressSchema);

module.exports = Progress;
