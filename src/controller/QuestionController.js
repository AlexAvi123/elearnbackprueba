const Question = require("../models/QuestionModel");
const Task = require("../models/TaskModel");
const Unit = require("../models/UnitModel");

class QuestionController {

  async saveQuestion(_question) {
    try {
      var question = new Question(_question);
      await question.save();
      return { res: "ok" }
    } catch (error) {
      return error
    }
  }

  async getIdUnit(unit, module, book) {
    try {
      var unit_result = await Unit.findOne({ "unit": unit, "module": module, "book": book });
      return unit_result._id;
    } catch (error) {
      return 0
    }
  }
  
  async getIdTask(unit, module, book, type, topic) {
    const question = new QuestionController();
    var unit_id = await question.getIdUnit(unit, module, book);
    if (unit_id) {
      try {
        var task_result = await Task.findOne({ "unit_id": unit_id, "type": type, "topic.top": topic });
        return task_result._id;
      } catch (error) {
        return 0
      }
    } else {
      return 0
    }
  }

}


/*********************METODOS************************* */
//Insertar Pregunta
exports.saveQuestion = async (req, res, next) => {
  try {
    const question = new QuestionController();
    var task_id = await question.getIdTask(req.body.task_id.unit, req.body.task_id.module, req.body.task_id.book, req.body.task_id.type, req.body.task_id.topic);
    if (task_id) {
      req.body.task_id = task_id;
      const question_body = new Question(req.body);
      res.json(question_body);
      // var respuesta = await question.saveQuestion(question_body);
      // if (respuesta.res === "ok") {
      //   res.json({ "message": "Nueva Pregunta agregada" });
      // } else {
      //   if (respuesta.name === "ValidationError") {
      //     res.json(respuesta.message);
      //   } else {
      //     res.json(respuesta);
      //   }
      // }
    } else {
      if (task_id < 0) {
        res.json({ "message": "Error unidad no encontrada" });
      } else {
        res.json({ "message": "Error leccion no encontrada" });
      }
    }
  } catch (error) {
    res.send(error);
    next();
  }
};