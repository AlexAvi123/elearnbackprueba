// 'use strict';
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/LearningEnglish');


// module.exports = mongoose;

/*****************PARTE DE ROLY********************/
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost/LearningEnglish',
    {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    }
);
mongoose.set('useCreateIndex', true)

