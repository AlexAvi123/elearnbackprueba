/*****************PARTE DE ROLY********************/
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
const UserController = require("../controller/UserController");
const UnitController = require("../controller/UnitController");
const TaskController = require("../controller/TaskController");
const QuestionController = require("../controller/QuestionController");
const ProgressController = require("../controller/ProgressController");
const TaskModel = require("../models/TaskModel");

router.get("/", async (req, res) => {
  res.json({ res: "FUNCIONA MUCHACHO API READY" });
});

/******************************** USUARIO *************************************************/
router.post("/signup", async (req, res) => {
  var datos_user = req.body;
  var user = new UserController();

  //try {
  var usuario_existe =  user.findUser(req.body._id, req.body.mail);
  if (!usuario_existe) {
    if (req.body.password) {
      datos_user.password = await bcrypt.hash(
        req.body.password,
        BCRYPT_SALT_ROUNDS
      );
    }
    var respuesta =  user.saveUser(datos_user);
    if (respuesta === "OK") {
      /* El usuario de guardó */
      const progress = new ProgressController();
      var user_id =  user.findUser(null, req.body.mail);
      console.log(user_id);
      var resp =  progress.saveProgress({
        user_id: user_id,
      });
      res.json({ res: user_id });
    } else {
      res.json({ res: respuesta });
    }
  }{
    res.json({res: respuesta})
  }

  /* 

      if (respuesta.res != "ok") {
        if (respuesta.code === 11000) {
          res.status(400).json({
            message: "Usuario Existente",
          });
        } else {
          if (respuesta.name == "ValidationError") {
            res.json(respuesta.message);
          }
        }
      } else {
        //crea un progeso vacio relacionado con el usuario
        const progress = new ProgressController();
        var user_id = await user.findUser(null, req.body.mail);
        console.log(user_id);
        var resp = await progress.saveProgress({
          user_id: user_id,
        });
        if (resp.res != "ok") {
          if (resp.name == "ValidationError") {
            res.json(resp.message);
          } else {
            res.json({ res: "Error al crear progreso" });
          }
        }
        res.json(respuesta);
      }
    } else {
      res.json({ res: "User Exist" });
    }
  } catch (error) {
    return res.json({ res: error });
  } */
});
router.post("/signin", async (req, res) => {
  userBody = req.body;
  user = new UserController();
  user = await user.findUser(null, userBody.mail);
  console.log(user);
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
router.post("/task/create", async (req, res, next) => {
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
      req.body.user_id.id,
      req.body.user_id.mail
    );
    if (user_datos != null && !user_datos.error) {
      var task_datos = await task.findTask(req.body.tasks_id);
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
