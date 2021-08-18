// const User = require("../models/UserModel");

// class UserController {

//   async saveUser(_user) {
//       var user = new User(_user);
//       await user.save();
//   }
//   deleteUser() {}
//   changeUser() {}
// }

// module.exports = UserController;


/*****************PARTE DE ROLY********************/

const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

//ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
// const multer = require('multer');
// const multerConfig = require('../utils/multerConfig');

// const upload = multer (multerConfig).single("imagen");

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

/*********************METODOS************************* */
//Insertar usuario
exports.saveUser = async (req, res) => {
  const user= new User(req.body);
  try {
    //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
      // if(req.file && req.file.filename){
      //     user.imagen=req.file.filename;
      // }
       
      var passwordHash = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
      user.password= passwordHash;

      await user.save();
      res.json({"message": "Nuevo Usuario agregado"});
  }catch(error){

      if(error.code === 11000){
          res.status(400).json({
              message: `Ya existe un Usuario con ese correo ${req.body.mail}`
          });
      }else{
        if(error.name == "ValidationError"){
          //res.status(400).json(error.message);
          res.json(error.message);
        }
      }
      res.send(error);
      next();
  }
};

// Listar usuarios
exports.listUser = async (req, res) => {

  try {
      const user = await User.find({});
      res.json(user);
  }catch(error){
      res.send(error);
      next();
  }
  
};

// Mostrar un usuario en especifico
exports.showUser = async (req, res, next) => {
  try {
      const user = await User.findById(req.params.id);
      if(!user){
          res.status(404).json({
              message: "El Usuario no existe"
          });
      }
      res.json(user);
  }catch(error){
      res.status(400).json({
          message: "Error al procesar la peticion"
      });
      next();
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res, next) => {
  try {
      let newUsuario = req.body;
      //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
      // if(req.file && req.file.filename){
      //     newUsuario.imagen=req.file.filename;
      // }else{
      //     const user = await User.findById(req.params.id);
      //     newUsuario.imagen = user.imagen;
      // }

      if(req.body.password){
        var passwordHash = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
        newUsuario.password= passwordHash;
      }
      
      const updateUsuario = await User.findOneAndUpdate(
          { _id: req.params.id },
          newUsuario,
          { new: true }
      );

      res.json({
          message: "Usuario Actualizado"
      });
  }catch(error){
      if(error.code === 11000){
          res.status(400).json({
              message: `Ya existe un Usuario con ese correo ${req.body.mail}`
          });
      }
      res.status(400).json({
          message: "Error al procesar la peticion"
      });
      next();
  }
  
};

// Eliminar un usuario
exports.deleteUser = async (req, res, next) => {
  try {
      await User.findOneAndDelete(
          {_id: req.params.id}
      );
      res.json({
          message: "El Usuario Eliminado"
      });
  }catch(error){
      res.status(400).json({
          message: "Error al procesar la peticion"
      });
      next();
  }
};