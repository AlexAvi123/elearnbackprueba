
/*****************PARTE DE ROLY********************/
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    //'mongodb://localhost/LearningEnglish'
    //coneccion a la base de datos en la nube
    'mongodb+srv://root:utm.english.cluster@englishcluster.eayiw.mongodb.net/LearningEnglish?retryWrites=true&w=majority',
    {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    }
);
mongoose.set('useCreateIndex', true)

