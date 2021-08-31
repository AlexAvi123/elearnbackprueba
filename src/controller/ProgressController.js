const Progress = require("../models/ProgressModel");

class ProgressController {

  async saveProgress(_progress) {
    try {
      var progress = new Progress(_progress);
      await progress.save();
      return { res: "ok" }
    } catch (error) {
      return error
    }
  }

  async getIdProgress(user_id) {
    try {
      var progress = await Progress.findOne({ "user_id": user_id });
      return progress._id;
    } catch (error) {
      return 0
    }
  }

  async updateProgress(user_id, task_id) {
    try {
      await Progress.findOneAndUpdate(
        { "user_id": user_id },
        { $push: { "tasks_id": task_id } },
        { new: true }
      );
      return { res: "ok" };
    } catch (error) {
      return error;
    }
  }

  async taskExistinProgress(user_id, task_id) {
    try {
      var progress = await Progress.findOne({ "user_id": user_id, "tasks_id": task_id});
      return progress;
      //return { res: "ok" };
    } catch (error) {
      return error;
    }
  }

}

module.exports = ProgressController;
