// const express = require("express");
// const router = express.Router();
// const User = require("../controller/UserController");

// const UserController = require("../controller/UserController");

// router.post('/users' /*, UserController.fileupload*/ ,UserController.saveUser);

// router.get("/", (req, res) => {
//   var user = new User();
//   user.saveUser({
//     id: "123",
//     name: "Jose",
//     username: "Nicromano",
//     email: "ljose297@gmail.com",
//     password: "nicromano11",
//   });

//   res.send("okk");
// });

// module.exports = router;

/*****************PARTE DE ROLY********************/
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
const UserController = require("../controller/UserController");
const UnitController = require("../controller/UnitController");
const TaskController = require("../controller/TaskController");

router.post("/signup", async (req, res) => {
  var datos_user = req.body;
  var user = new UserController();

  try {
    var usuario_existe = await user.findUser(req.body._id, req.body.mail);
    if (!usuario_existe) {
      if (req.body.password) {
        datos_user.password = await bcrypt.hash(
          req.body.password,
          BCRYPT_SALT_ROUNDS
        );
      }
      var respuesta = await user.saveUser(datos_user);
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
      }
    } else {
      res.json({ res: "User Exist" });
    }
  } catch (error) {
    return res.json({ res: error });
  }
});

router.get('/user/:id', (req, res)=>{

    user = new UserController().findUser(null, req.params.id);
    if (user){
      /* el usuario existe */
      res.json({res: 'User Exist'})
    }else {
      /* Usuario no existe */
      res.json({res: 'User Not Exist'})
    }
});
module.exports = router;
/******************************** USUARIO ************************************************ */
//   router.post('/users' /*, UserController.fileupload*/ , UserController.saveUser); //agregar un usuario
//   router.get('/users', UserController.listUser); //listar todos los usuarios
//   router.get('/users/:id', UserController.showUser); //mostrar un usuario en especifico
//   router.put('/users/:id'/*, UserController.fileupload*/ , UserController.updateUser); //editar un usuario
//   router.delete('/users/:id', UserController.deleteUser);   //eliminar un usuario

/* Usuario */

// /******************************** UNIDAD ************************************************ */
//   router.post('/unit', UnitController.saveUnit); //agregar una unidad
//   router.get('/unit', UnitController.listUnit); //listar todas las unidades
//   router.get('/unit/:id', UnitController.showUnit); //mostrar una unidad en especifico
//   router.put('/unit/:id', UnitController.updateUnit); //editar una unidad
//   router.delete('/unit/:id', UnitController.deleteUnit); //eliminar una unidad

// /******************************** LECCION ************************************************ */
//   router.post('/task', TaskController.saveTask); //agregar una leccion
//   router.get('/task', TaskController.prueba)

/******************************** USUARIO ************************************************ */
//router.post('/users/create' /*, UserController.fileupload*/ , UserController.createUser); //agregar un usuario
//estos metodos aun estan en pruebas
//router.get('/users/find/:id' , UserController.findUser);
//router.delete('/users/delete/:id', UserController.deleteUser);

//Supongo que de esta forma es la que me decias que hiciera
// router.post("/users/create", async (req, res) => {
//   var datos_user = req.body;
//   var user = new UserController();
//   try {
//     //res.send(req.body._id);
//     var usuario_existe =  await user.findUser(req.body._id, req.body.mail);
//     if (!usuario_existe) {
//       //res.send("true");
//       //ESTE CODIGO ES PARA PODER INGRESAR UNA IMAGEN, ESTA COMENTADO POR SI DESPUES SE IMPLEMENTA ESO DE LA IMAGEN
//       // if(req.file && req.file.filename){
//       //     user.imagen=req.file.filename;
//       // }
//       if(req.body.password){
//         var passwordHash = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);
//         datos_user.password = passwordHash;
//       }

//       var respuesta = await user.saveUser(datos_user);
//       //res.send(respuesta);
//       if (respuesta.res != "ok") {
//         if (respuesta.code === 11000) {
//           res.status(400).json({
//             message: `Ya existe un Usuario con ese correo ${req.body.mail}`,
//           });
//         } else {
//           if (respuesta.name == "ValidationError") {
//             res.json(respuesta.message);
//           }
//         }
//       } else {
//         res.json(respuesta);
//         //res.json({ message: "Nuevo Usuario agregado" });
//       }
//     }else{
//       res.json({"res": "User Exist"});
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });
