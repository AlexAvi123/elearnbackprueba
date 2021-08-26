/*****************PARTE DE ROLY********************/

const Task = require("../models/TaskModel");

class TaskController {

    async saveTask(_task) {
      try {
        var task = new Task(_task);
        await task.save();
        return { res: "ok" }
      } catch (error) {
        return error
      }
    }
  }




//ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN aun no se utiliza
const multer = require('multer');
const multerConfig = require('../utils/multerConfig');

const upload = multer(multerConfig).single("imag");

exports.fileupload = async (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({
                message: error
            });
        }
        return next();
    });
};

/*********************METODOS************************* */
//Insertar Leccion
exports.saveTask = async (req, res, next) => {
    const task_body = new Task(req.body);
    var task = new TaskController();
    try {
        //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN
        // if (req.file && req.file.filename) {
        //     task.imag = req.file.filename;
        // }
        var respuesta = await task.saveTask(task_body);
        if (respuesta.res === "ok") {
            res.json({ "message": "Nueva Leccion agregada" });
        } else {
            if (respuesta.name === "ValidationError") {
                res.json(respuesta.message);
            }else{
                res.json(respuesta);
            }
        }
    } catch (error) {
        res.send(error);
        next();
    }
};


//este codigo es para hacer una consulta que devuelva la union de task con unit
exports.prueba = async (req, res, next) => {
    try {
        const task = await Task.find({})
            .populate("unit_id");
        res.json(task);
    } catch (error) {
        res.send(error);
        next();
    }

};
