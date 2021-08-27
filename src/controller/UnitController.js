/*****************PARTE DE ROLY********************/

const Unit = require("../models/UnitModel");


class UnitController {

  async saveUnit(_unit) {
    try {
      var unit = new Unit(_unit);
      await unit.save();
      return { res: "ok" }
    } catch (error) {
      return error
    }
  }


  async findUnit(_id, _mail) {
    var user
    try {
      if(_id != null){
        //objectIdUser = ObjectId(_id);
        user = await User.findById(_id);
      }else{
        user = await User.findOne({ mail: _mail });
      }
    } catch (error) {
    }
    return user
  }


  async deleteUser(_id) { 
    try {
      await User.findOneAndDelete({ "_id": _id });
      return { res: "ok" }
    } catch (error) {
      return error
    }
    
  }
  async changeUser() { }
}

/*********************METODOS************************* */
//Insertar Unidad
exports.saveUnit = async (req, res) => {
    const unit_body = new Unit(req.body);
    var unit = new UnitController();
    try {
        var respuesta = await unit.saveUnit(unit_body);
        if (respuesta.res == "ok") {
            res.json({ "message": "Nueva Unidad agregada" });
        } else {
            if (respuesta.name == "ValidationError") {
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





/*******************************ESTOS METODOS AUN NO ESTAN************************************* */
// Listar Unidades
// exports.listUnit = async (req, res) => {
//     try {
//         const unit = await Unit.find({});
//         res.json(unit);
//     } catch (error) {
//         res.send(error);
//         next();
//     }
// };

// // Mostrar una Unidad en especifico
// exports.showUnit = async (req, res, next) => {
//     try {
//         const unit = await Unit.findById(req.params.id);
//         if (!unit) {
//             res.status(404).json({
//                 message: "La Unidad no existe"
//             });
//         }
//         res.json(unit);
//     } catch (error) {
//         res.status(400).json({
//             message: "Error al procesar la peticion"
//         });
//         next();
//     }
// };

// // Actualizar una Unidad
// exports.updateUnit = async (req, res, next) => {
//     try {
//         let newUnit = req.body;
//         const updateUnit = await Unit.findOneAndUpdate(
//             { _id: req.params.id },
//             newUnit,
//             { new: true }
//         );
//         res.json({
//             message: "Unidad Actualizada"
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: "Error al procesar la peticion"
//         });
//         next();
//     }
// };

// // Eliminar una Unidad
// exports.deleteUnit = async (req, res, next) => {
//     try {
//         await Unit.findOneAndDelete(
//             { _id: req.params.id }
//         );
//         res.json({
//             message: "Unidad Eliminada"
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: "Error al procesar la peticion"
//         });
//         next();
//     }
// };