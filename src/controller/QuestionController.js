const Question = require("../models/QuestionModel");

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
  }


/*********************METODOS************************* */
//Insertar Pregunta
exports.saveQuestion= async (req, res, next) => {
    const question_body = new Question(req.body);
    var question = new QuestionController();
    try {
        var respuesta = await question.saveQuestion(question_body);
        if (respuesta.res === "ok") {
            res.json({ "message": "Nueva Pregunta agregada" });
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