// const express = require('express')
// const morgan = require('morgan')
// const mongoose = require('./database/index.js')
// const bodyParser = require('body-parser');
// const cors = require('cors')
// app = express();

// app.set('port', process.env.PORT || 4000);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(morgan());
// app.use(require('./routes/index'))

// app.listen(app.get('port'), () => {
//   console.log('Servidor iniciado en ', app.get('port'));
// })

/*****************PARTE DE ROLY********************/
const express = require("express");
//const mongoose = require('mongoose');
const mongoose = require("./database/index.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const routers = require("./routes");
const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(
//     'mongodb://localhost/LearningEnglish',
//     {
//         useNewUrlParser : true,
//         useUnifiedTopology: true,
//     }
// );
// mongoose.set('useCreateIndex', true)

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* NO BORRAR ES NECESARIO USAR ESTOS CORS PARA USAR EN API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(cors());

app.use("/", routers());
//app.use(require('./routes/index'))

//app.use(express.static('uploads'));

app.listen(5000, function () {
  console.log("Servidor corriendo BELLEZA");
});
