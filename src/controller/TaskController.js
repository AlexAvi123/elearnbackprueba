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
  async getIdTask(unit_id, type, topic) {
    try {
      var task_result = await Task.findOne({ "unit_id": unit_id, "type": type, "topic.top": topic });
      return task_result._id;
    } catch (error) {
      return 0
    }

  }

  async findTask(_id) {
    try {
      var task = await Task.findOne({ "_id": _id});
      return task;
    } catch (error) {
      return 0
    }
  }
}

module.exports = TaskController;
