const express = require('express')
const morgan = require('morgan')

const bodyParser = require('body-parser');
const cors = require('cors')
app = express();

app.set('port', process.env.PORT || 3000);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan());
app.use(require('./routes/index'))

app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en ', app.get('port'));
})