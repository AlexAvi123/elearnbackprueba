
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




//ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN
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

/*********************AUN NO ESTAN************************* */
// // Listar usuarios
// exports.listUser = async (req, res) => {

//     try {
//         const user = await User.find({});
//         res.json(user);
//     } catch (error) {
//         res.send(error);
//         next();
//     }

// };

// // Mostrar un usuario en especifico
// exports.showUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             res.status(404).json({
//                 message: "El Usuario no existe"
//             });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(400).json({
//             message: "Error al procesar la peticion"
//         });
//         next();
//     }
// };

// // Actualizar un usuario
// exports.updateUser = async (req, res, next) => {
//     try {
//         let newUsuario = req.body;
//         //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
//         // if(req.file && req.file.filename){
//         //     newUsuario.imagen=req.file.filename;
//         // }else{
//         //     const user = await User.findById(req.params.id);
//         //     newUsuario.imagen = user.imagen;
//         // }

//         if (req.body.password) {
//             var passwordHash = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
//             newUsuario.password = passwordHash;
//         }

//         const updateUsuario = await User.findOneAndUpdate(
//             { _id: req.params.id },
//             newUsuario,
//             { new: true }
//         );

//         res.json({
//             message: "Usuario Actualizado"
//         });
//     } catch (error) {
//         if (error.code === 11000) {
//             res.status(400).json({
//                 message: `Ya existe un Usuario con ese correo ${req.body.mail}`
//             });
//         }
//         res.status(400).json({
//             message: "Error al procesar la peticion"
//         });
//         next();
//     }

// };

// // Eliminar un usuario
// exports.deleteUser = async (req, res, next) => {
//     try {
//         await User.findOneAndDelete(
//             { _id: req.params.id }
//         );
//         res.json({
//             message: "El Usuario Eliminado"
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: "Error al procesar la peticion"
//         });
//         next();
//     }
// };