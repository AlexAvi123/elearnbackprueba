/*****************PARTE DE ROLY********************/
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

require('dotenv').config()

const UserController = require("../controller/UserController");
const UnitController = require("../controller/UnitController");
const TaskController = require("../controller/TaskController");
const QuestionController = require("../controller/QuestionController");
const ProgressController = require("../controller/ProgressController");

router.get("/", async (req, res) => {
  res.json({ res: process.env.USER_MAIL });
});

router.get("/auth/confirm/:confirmationCode", async (req, res, next) => {
  var user = new UserController();

  user_token = await user.findUser(null, null, req.params.confirmationCode);
  if (!user_token) {
    res.json({ res: "USER NOT EXIST" });
  } else {
    respuesta = await user.changeUser(user_token._id, { "status": "Active" });
    if (respuesta !== "OK") {
      res.json({ res: respuesta });
    } else {
      res.redirect("http://localhost:3000/dashboard");
    }
  }
});

router.get("/restartPassword/:mail", (req, res, next) => {
  var user = new UserController();

  user_find = user.findUser(null, req.params.mail, null);
  if (!user_find) {
    res.json({ res: "USER NOT EXIST" });
  } else {
  }
});
/******************************** USUARIO *************************************************/
router.post("/signup", async (req, res) => {
  var datos_user = req.body;
  var user = new UserController();

  //try {
  try {
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET );
    var usuario_existe = await user.findUser(req.body._id, req.body.mail, null);
    if (!usuario_existe) {
      if (req.body.password) {
        datos_user.password = await bcrypt.hash(
          req.body.password,
          BCRYPT_SALT_ROUNDS
        );
      }
      datos_user.confirmationCode = token;
      var respuesta = await user.saveUser(datos_user);
      /* El usuario de guardó */
      const progress = new ProgressController();
      var user_id = await user.findUser(null, req.body.mail, null);
      console.log(user_id);
      var resp = await progress.saveProgress({
        user_id: user_id._id,
      });
      res.json({ res: user_id });
    } else {
      res.json({ res: "USER EXITS" });
    }
  } catch (error) {
    res.json({ res: "ERROR", err: error });
  }
});
router.post("/signin", async (req, res) => {
  userBody = req.body;
  user = new UserController();
  try {
    user = await user.findUser(null, userBody.mail, null);
    console.log(user);
    if (user) {
      /* si existe */
      result = await bcrypt.compare(userBody.password, user.password);
      if (result) {
        /* contraseñas iguales */

        res.json({ res: user });
      } else {
        /* Credenciales incorrectas */
        res.json({ res: "PASSWORD INCORRECT" });
      }
    } else {
      res.json({ res: "USER NOT EXIST" });
    }
  } catch (error) {
    res.json({res: "ERROR", err: error})
  }
});

router.get("/user/:id", async (req, res) => {
  user = new UserController();
  user_find = await user.findUser(req.params.id, null, null);
  if (user_find) {
    /* el usuario existe */
    res.json(user_find);
  } else {
    /* Usuario no existe */
    res.json({ res: "User Not Exist" });
  }
});

//ruta para obetener la informacion de todos los modulos mas el progreso del usuario
router.post("/user_progress/:user_id", async (req, res) => {
  var unit = new UnitController();
  var progress = new ProgressController();
  var task = new TaskController();

  var array_respuesta = [];
  var respuesta = new Object();
  var type_questions = ["writing", "vocabulary", "reading", "grammar"];
  var units = await unit.getUnits();
  var user_id = req.params.user_id;

  var user_exist = await progress.getIdProgress(user_id);
  if (user_exist) {
    for (i in units) {
      respuesta.book_info = units[i];
      for (j in type_questions) {
        var type_question = type_questions[j];
        var progress_user = await progress.getProgresses_user_filter(
          user_id,
          units[i]._id,
          type_question
        );
        var tasks_specificType = await task.getTasks_specificType(
          units[i]._id,
          type_question
        );

        switch (type_question) {
          case "writing":
            respuesta.writing = await progress.unify_information(
              progress_user,
              tasks_specificType
            );
            break;
          case "vocabulary":
            respuesta.vocabulary = await progress.unify_information(
              progress_user,
              tasks_specificType
            );
            break;
          case "reading":
            respuesta.reading = await progress.unify_information(
              progress_user,
              tasks_specificType
            );
            break;
          case "grammar":
            respuesta.grammar = await progress.unify_information(
              progress_user,
              tasks_specificType
            );
            break;
          default:
            console.log("Eso es todo amigos..");
        }
      }
      array_respuesta.push(respuesta);
      respuesta = {};
    }
    res.json(array_respuesta);
  } else {
    res.json({ error: "user no exist" });
  }
});

//Ruta para obtener las preguntas de una leccion
router.post("/task/:task_id", async (req, res) => {
  var question = new QuestionController();
  var questions = await question.getQuestions(req.params.task_id);
  if (questions) {
    if (questions.length != 0) {
      res.json(questions);
      //res.json(questions.length);
    } else {
      res.json({ error: "task empty" });
    }
  } else {
    res.json({ error: "task no exist" });
  }
});


//Ruta para obtener las preguntas de una libro
router.get("/book/:n_book", async (req, res) => {
  var unit = new UnitController();
  var task = new TaskController();
  var question = new QuestionController();

  var units = await unit.getUnits();
  var tasks = await task.getTasks();

  var respuesta = [];

  var units_filter = units.filter(function (obj) {
    if (obj.book == req.params.n_book) {
      return true;
    } else {
      return false;
    }
  });

  var tasks_filter = tasks.filter(function (obj) {
    var bandera = false;
    for (unit in units_filter) {
      if (JSON.stringify(obj.unit_id) === JSON.stringify(units_filter[unit]._id)) {
        bandera = true;
      }
    }
    return bandera;
  });

  for (i in tasks_filter) {
    var questions = await question.getQuestions(tasks_filter[i]._id);
    respuesta = respuesta.concat(questions);
  }

  res.json(respuesta);
});


//Ruta para obtener las preguntas de todos los libros
router.get("/evaluation", async (req, res) => {
  var question = new QuestionController();
  var questions = await question.getAllQuestions();
  res.json(questions);
});




/******************************** UNIDAD *************************************************/
//crear una unidad
router.post("/unit/create", async (req, res) => {
  const unit_body = req.body;
  var unit = new UnitController();
  try {
    var respuesta = await unit.saveUnit(unit_body);
    if (respuesta.res == "ok") {
      res.json({ message: "Nueva Unidad agregada" });
    } else {
      if (respuesta.name == "ValidationError") {
        res.json(respuesta.message);
      } else {
        res.json(respuesta);
      }
    }
  } catch (error) {
    res.send(error);
    next();
  }
});

/******************************** LECCION *************************************************/
//crear una leccion
router.post("/task_create", async (req, res, next) => {
  try {
    const task = new TaskController();
    const unit = new UnitController();
    var unit_id = await unit.getIdUnit(
      req.body.unit_id.unit,
      req.body.unit_id.module,
      req.body.unit_id.book
    );
    if (unit_id) {
      req.body.unit_id = unit_id;
      const task_body = req.body;
      var respuesta = await task.saveTask(task_body);
      if (respuesta.res === "ok") {
        res.json({ message: "Nueva Leccion agregada" });
      } else {
        if (respuesta.name === "ValidationError") {
          res.json(respuesta.message);
        } else {
          res.json(respuesta);
        }
      }
    } else {
      res.json({ message: "Error unidad no encontrada" });
    }
  } catch (error) {
    res.send(error);
    next();
  }
});

/******************************** PREGUNTA *************************************************/
//crear una pregunta
router.post("/question/create", async (req, res, next) => {
  try {
    const question = new QuestionController();
    const task = new TaskController();
    const unit = new UnitController();
    var unit_id = await unit.getIdUnit(
      req.body.task_id.unit,
      req.body.task_id.module,
      req.body.task_id.book
    );
    if (unit_id) {
      var task_id = await task.getIdTask(
        unit_id,
        req.body.task_id.type,
        req.body.task_id.topic
      );
      if (task_id) {
        req.body.task_id = task_id;
        const question_body = req.body;
        //res.json(question_body);
        var respuesta = await question.saveQuestion(question_body);
        if (respuesta.res === "ok") {
          res.json({ message: "Nueva Pregunta agregada" });
        } else {
          if (respuesta.name === "ValidationError") {
            res.json(respuesta.message);
          } else {
            res.json(respuesta);
          }
        }
      } else {
        res.json({ message: "Error leccion no encontrada" });
      }
    } else {
      res.json({ message: "Error unidad no encontrada" });
    }
  } catch (error) {
    res.send(error);
    next();
  }
});

/******************************** PROGRESO *************************************************/
//actualizar el progreso de un usuario
router.post("/progress/update", async (req, res, next) => {
  try {
    const user = new UserController();
    const task = new TaskController();
    const progress = new ProgressController();
    var user_datos = await user.findUser(
      req.body.user_id,
      null,
      null
    );
    if (!user_datos.error) {
      var task_datos = await task.findTask(req.body.task_id);
      if (task_datos) {
        var user_progress = await progress.getIdProgress(user_datos._id);
        if (user_progress) {
          //verificar si esa leccion ya existe en el progreso del usuario
          var exist_task_in_progress = await progress.taskExistinProgress(
            user_datos._id,
            task_datos._id
          );
          if (!exist_task_in_progress) {
            //agrega el id de la leccion a ese usuario
            var update = await progress.updateProgress(
              user_datos._id,
              task_datos._id
            );
            res.json({ res: "Task Registrada" });
          } else {
            res.json({ res: "Task ya ha sido registrado en ese usuario" });
          }
        } else {
          res.json({ res: "User no tiene Progreso" });
        }
      } else {
        res.json({ res: "Task Not Exist" });
      }
    } else {
      res.json({ res: "User Not Exist" });
    }
  } catch (error) {
    res.send(error);
    next();
  }
});

module.exports = router;
