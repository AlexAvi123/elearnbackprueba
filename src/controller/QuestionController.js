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

module.exports = QuestionController;
