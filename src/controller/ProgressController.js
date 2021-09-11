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
      var progress = await Progress.findOne({ "user_id": user_id, "tasks_id": task_id });
      return progress;
      //return { res: "ok" };
    } catch (error) {
      return error;
    }
  }

  //devuelve el progreso de un usuario
  async getProgresses_user(user_id) {
    try {
      var progress = await Progress.findOne({ "user_id": user_id })
        .populate("tasks_id");
      return progress;
    } catch (error) {
      return error;
    }
  }

  //devuelve las lecciones que ha realizado un usuario de un tipo especifico
  async getProgresses_user_filter(user_id, unit_id, type) {
    try {
      var tasks_user = await this.getProgresses_user(user_id);
      var tasks_filter = await tasks_user.tasks_id.filter(function (obj) {
        if (JSON.stringify(obj.unit_id) == JSON.stringify(unit_id) && obj.type === type) {
          return true;
        } else {
          return false;
        }
      });
      return tasks_filter;
    } catch (error) {
      return error;
    }
  }


  //metodo para unificar la informacion
  async unify_information(progress_user, tasks_specificType) {
    try {
      var respuesta = new Object();
      var task_id;
      var tasks = await tasks_specificType.filter(function (obj, i) {
        if (progress_user.length > i && JSON.stringify(obj._id) === JSON.stringify(progress_user[i]._id)) {
          return false;
        } else {
          return true;
        }
      });
      if (tasks.length == 0) {
        task_id = null;
      } else {
        task_id = tasks[0]._id;
      }
      var respuesta = {
        "total_task:": tasks_specificType.length,
        "user_progress": progress_user.length,
        "task_id": task_id
      }
      return respuesta;
    } catch (error) {
      return error;
    }
  }




}

module.exports = ProgressController;
