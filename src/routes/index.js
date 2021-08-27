/*****************PARTE DE ROLY********************/
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
const UserController = require("../controller/UserController");
const UnitController = require("../controller/UnitController");
const TaskController = require("../controller/TaskController");
const QuestionController = require('../controller/QuestionController');
const ProgressController = require('../controller/ProgressController');

router.post("/signup", async (req, res) => {
  var datos_user = req.body;
  var user = new UserController();

  try {
    var usuario_existe = await user.findUser(req.body._id, req.body.mail);
    if (!usuario_existe) {
      if (req.body.password) {
        datos_user.password = await bcrypt.hash(
          req.body.password,
          BCRYPT_SALT_ROUNDS
        );
      }
      var respuesta = await user.saveUser(datos_user);
      if (respuesta.res != "ok") {
        if (respuesta.code === 11000) {
          res.status(400).json({
            message: `Ya existe un Usuario con ese correo ${req.body.mail}`,
          });
        } else {
          if (respuesta.name == "ValidationError") {
            res.json(respuesta.message);
          }
        }
      } else {
        res.json(respuesta);
      }
    } else {
      res.json({ res: "User Exist" });
    }
  } catch (error) {
    return res.json({ res: error });
  }
});
router.post("/signin", async (req, res) => {
  userBody = req.body;
  user = new UserController();
  user = await user.findUser(null, userBody.mail)
  console.log(user)
  if (user) {
    /* si existe */
    result = await bcrypt.compare(userBody.password, user.password);
    if (result) {
      /* contraseñas iguales */
      res.json(user);
    } else {
      /* Credenciales incorrectas */
      res.json(null);
    }
  } else {
    res.json({ res: "No existe Usuario" });
  }
});

router.get("/user/:id", (req, res) => {
  user = new UserController().findUser(null, req.params.id);
  if (user) {
    /* el usuario existe */
    res.json(user);
  } else {
    /* Usuario no existe */
    res.json({ res: "User Not Exist" });
  }
});


/******************************** UNIDAD *************************************************/
router.post('/unit/create', UnitController.saveUnit); //crear una unidad


/******************************** LECCION *************************************************/
router.post('/task/create', TaskController.saveTask); //crear una leccion
router.get('/task', TaskController.prueba)

/******************************** PREGUNTA *************************************************/
router.post('/question/create', QuestionController.saveQuestion); //crear una pregunta

/******************************** PROGRESO *************************************************/
router.post('/progress/create', ProgressController.saveProgress); //crear un progreso




module.exports = router;



