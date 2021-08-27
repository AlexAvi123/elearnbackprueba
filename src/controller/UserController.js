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
      return {"error": error}
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
      return {"error": error}
    }
    return user
  }


  async deleteUser(_id) { 
    try {
      await User.findOneAndDelete({ "_id": _id });
      return { res: "ok" }
    } catch (error) {
      return {"error": error}
    }
    
  }
  async changeUser() { }

  
}

module.exports = UserController;


/*********************METODOS PARA LAS RUTAS************************* */

//Metodo para crear un usuario ruta POST /users/create
exports.createUser = async (req, res) => {
  var datos_user = req.body;
  var user = new UserController();
  try {
    //res.send(req.body);
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
