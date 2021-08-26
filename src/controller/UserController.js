const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

class UserController {

  async saveUser(_user) {
    try {
      var user = new User(_user);
      await user.save();
      return { res: "ok" }
    } catch (error) {
      return error
    }
  }


  async findUser(_id, _mail) {
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

//module.exports = UserController;


// //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
// const multer = require('multer');
// const multerConfig = require('../utils/multerConfig');

// const upload = multer (multerConfig).single("img");

// exports.fileupload = async (req, res, next) => {
//     upload(req, res, function(error){
//         if(error){
//             res.json({
//                 message: error
//             });
//         }
//         return next();
//     });
// };

/*********************METODOS PARA LAS RUTAS************************* */

//Metodo para crear un usuario ruta POST /users/create
exports.createUser = async (req, res) => {
  var datos_user = req.body;
  var user = new UserController();
  try {
    //res.send(req.body._id);
    var usuario_existe =  await user.findUser(req.body._id, req.body.mail);
    if (!usuario_existe) {
      //res.send("true");
      //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
      // if(req.file && req.file.filename){
      //   datos_user.img=req.file.filename;
      // }
      if(req.body.password){
        var passwordHash = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
        datos_user.password = passwordHash;
      }
      
      var respuesta = await user.saveUser(datos_user);
      //res.send(respuesta);
      if (respuesta.res != "ok") {
        if (respuesta.code === 11000) {
          res.status(400).json({
            message: `Ya existe un Usuario con ese correo ${req.body.mail}`,
          });
        } else {
          if (respuesta.name == "ValidationError") {
            res.json(respuesta.message);
          }
        }
      } else {
        res.json(respuesta);
        //res.json({ message: "Nuevo Usuario agregado" });
      }
    }else{
      res.json({"res": "User Exist"});
    }
  } catch (error) {
    res.send(error);
  }
};

//Metodo para obtener un usuario ruta GET /users/find/:id
exports.findUser = async (req, res) => {
  var datos_user = req.body;
  var user = new UserController();
  res.json(await user.findUser(req.params.id));

};

// Elominar un usuario ruta DELETE /users/delete/:id
exports.deleteUser = async (req, res, next) => {
  try {
    var user = new UserController();
    var respuesta = await user.deleteUser(req.params.id);
    //await User.findOneAndDelete({ _id: req.params.id });
    if(respuesta.res == "ok"){
      res.json({
        message: "El Usuario Eliminado",
      });
    }else{
      res.json(respuesta);
    }
    
  } catch (error) {
    res.status(400).json({
      message: "Error al procesar la peticion",
    });
  }
};



// /*****************PARTE DE ROLY********************/

// const User = require("../models/UserModel");
// const bcrypt = require("bcrypt");
// const BCRYPT_SALT_ROUNDS = 12;

// const ObjectId = require("mongoose").Types.ObjectId;

// /*********************METODOS************************* */
// //Insertar usuario
// exports.saveUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
//     // if(req.file && req.file.filename){
//     //     user.imagen=req.file.filename;
//     // }

//     var passwordHash = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
//     user.password = passwordHash;

//     await user.save();
//     res.json({ message: "Nuevo Usuario agregado" });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).json({
//         message: `Ya existe un Usuario con ese correo ${req.body.mail}`,
//       });
//     } else {
//       if (error.name == "ValidationError") {
//         //res.status(400).json(error.message);
//         res.json(error.message);
//       }
//     }
//     res.send(error);
//   }
// };

// // Listar usuarios
// exports.listUser = async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.json(user);
//   } catch (error) {
//     res.send(error);
//   }
// };

// // Mostrar un usuario en especifico
// exports.showUser = async (req, res, next) => {
//   var user = null;

//   try {
//     try {
//       objectIdUser = ObjectId(req.params.id);
//       user = await User.findById(objectIdUser);
//     } catch (error) {
//       user = await User.findOne({ mail: req.params.id });
//     }
//     if (!user) {
//       res.status(404).json({
//         message: "El Usuario no existe",
//       });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({
//       message: "Error al procesar la peticion",
//       err: error,
//     });
//   }
// };

// // Actualizar un usuario
// exports.updateUser = async (req, res, next) => {
//   try {
//     let newUsuario = req.body;
//     //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
//     // if(req.file && req.file.filename){
//     //     newUsuario.imagen=req.file.filename;
//     // }else{
//     //     const user = await User.findById(req.params.id);
//     //     newUsuario.imagen = user.imagen;
//     // }

//     if (req.body.password) {
//       var passwordHash = await bcrypt.hash(
//         req.body.password,
//         BCRYPT_SALT_ROUNDS
//       );
//       newUsuario.password = passwordHash;
//     }

//     const updateUsuario = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       newUsuario,
//       { new: true }
//     );

//     res.json({
//       message: "Usuario Actualizado",
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       res.status(400).json({
//         message: `Ya existe un Usuario con ese correo ${req.body.mail}`,
//       });
//     }
//     res.status(400).json({
//       message: "Error al procesar la peticion",
//     });
//   }
// };

// // Eliminar un usuario
// exports.deleteUser = async (req, res, next) => {
//   try {
//     await User.findOneAndDelete({ _id: req.params.id });
//     res.json({
//       message: "El Usuario Eliminado",
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "Error al procesar la peticion",
//     });
//   }
// };
