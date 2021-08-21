// const mongoose = require("../database/index");
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// var TaskSchemaJSON = {
//   unit: ObjectId,
//   type: { type: String },
//   topic: {
//     top: String,
//     img: String,
//   },
//   objectives: {
//     text: String,
//     img: String,
//   },
//   explanation: String,
//   imgAd: Array,
// };
// var TaskSchema = new Schema(TaskSchemaJSON);
// var Task = new mongoose.model("Task", TaskSchema);

// module.exports = Task;

/*****************PARTE DE ROLY********************/
const  mongoose = require('mongoose');
const conn = mongoose.connection;
const Schema = mongoose.Schema;

//var imgsSchema = new Schema({ item: String, answer: Boolean });

const  TaskSchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true,
    },
    unit_id:{
      type: Schema.ObjectId,
      ref: "Unit"
    },
    topic: {
        top: String,
        img: String,
    },
   
    objetive: {
        text: String,
        img: String
    },
    explanation: {
        type: String,
        trim: true
    },
    imgs: Array

});

module.exports = mongoose.model('Task', TaskSchema);

