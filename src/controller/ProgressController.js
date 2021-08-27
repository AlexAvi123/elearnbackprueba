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

}


/*********************METODOS************************* */
//Insertar Pregunta
exports.saveProgress = async (req, res, next) => {
  const progress_body = new Progress(req.body);
  var progress = new ProgressController();
  try {
    var respuesta = await progress.saveProgress(progress_body);
    if (respuesta.res === "ok") {
      res.json({ "message": "Nuevo Progreso agregado" });
    } else {
      if (respuesta.name === "ValidationError") {
        res.json(respuesta.message);
      } else {
        res.json(respuesta);
      }
    }
  } catch (error) {
    res.send(error);
    next();
  }
};