/*****************PARTE DE ROLY********************/
const  mongoose = require('mongoose');
const conn = mongoose.connection;
const Schema = mongoose.Schema;

const  UnitSchema = new Schema({
    unit: {
        type: Number,
        required: true,
        trim: true,
    },
    module: {
        type: Number,
        required: true,
        trim: true,
    },
    book: {
        type: Number,
        required: true,
        trim: true      
    }
});

module.exports = mongoose.model('Unit', UnitSchema);