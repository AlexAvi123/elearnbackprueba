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
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const UnitController = require('../controller/UnitController');
const TaskController = require('../controller/TaskController');


module.exports = function(){
  /******************************** USUARIO ************************************************ */
    router.post('/users' /*, UserController.fileupload*/ , UserController.saveUser); //agregar un usuario
    router.get('/users', UserController.listUser); //listar todos los usuarios
    router.get('/users/:id', UserController.showUser); //mostrar un usuario en especifico
    router.put('/users/:id'/*, UserController.fileupload*/ , UserController.updateUser); //editar un usuario
    router.delete('/users/:id', UserController.deleteUser);   //eliminar un usuario

  /******************************** UNIDAD ************************************************ */
    router.post('/unit', UnitController.saveUnit); //agregar una unidad
    router.get('/unit', UnitController.listUnit); //listar todas las unidades
    router.get('/unit/:id', UnitController.showUnit); //mostrar una unidad en especifico
    router.put('/unit/:id', UnitController.updateUnit); //editar una unidad
    router.delete('/unit/:id', UnitController.deleteUnit); //eliminar una unidad

  /******************************** LECCION ************************************************ */
    router.post('/task', TaskController.saveTask); //agregar una leccion
    router.get('/task', TaskController.prueba)

    return router;

}
