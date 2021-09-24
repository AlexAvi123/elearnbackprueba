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

  //devuelve todas las preguntas de una leccion.
  async getQuestions(task_id) {
    try {
      var question_result = await Question.find({ "task_id": task_id});
      return question_result;
    } catch (error) {
      return 0
    }
  }

  //devuelve todas las preguntas registradas en la base de datos
  async getAllQuestions() {
    try {
      var question_result = await Question.find();
      return question_result;
    } catch (error) {
      return 0
    }
  }
}



module.exports = QuestionController;
