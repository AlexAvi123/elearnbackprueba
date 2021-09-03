/*****************PARTE DE ROLY********************/
const  mongoose = require('mongoose');
const conn = mongoose.connection;
const Schema = mongoose.Schema;

//var imgsSchema = new Schema({ item: String, answer: Boolean });

const  TaskSchema = new Schema({
    type: {
        type: String,
        required: true,
        lowercase: true, 
        trim: true,
    },
    unit_id:{
      type: Schema.ObjectId,
      required: true,
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

