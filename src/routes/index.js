/*****************PARTE DE ROLY********************/
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const UnitController = require('../controller/UnitController');
const TaskController = require('../controller/TaskController');
const QuestionController = require('../controller/QuestionController');
const ProgressController = require('../controller/ProgressController');


module.exports = function () {

  /******************************** USUARIO *************************************************/
  router.post('/users/create' /*, UserController.fileupload*/, UserController.createUser); //crear un usuario
  //estos metodos aun estan en pruebas
  router.get('/users/find/:id', UserController.findUser);
  router.delete('/users/delete/:id', UserController.deleteUser);
  //   router.put('/users/:id'/*, UserController.fileupload*/ , UserController.updateUser); //editar un usuario
  //   router.delete('/users/:id', UserController.deleteUser);   //eliminar un usuario

  /******************************** UNIDAD *************************************************/
  router.post('/unit/create', UnitController.saveUnit); //crear una unidad
  // router.get('/unit', UnitController.listUnit); //listar todas las unidades
  // router.get('/unit/:id', UnitController.showUnit); //mostrar una unidad en especifico
  // router.put('/unit/:id', UnitController.updateUnit); //editar una unidad
  // router.delete('/unit/:id', UnitController.deleteUnit); //eliminar una unidad

  /******************************** LECCION *************************************************/
  router.post('/task/create', TaskController.saveTask); //crear una leccion
  router.get('/task', TaskController.prueba)

  /******************************** PREGUNTA *************************************************/
  router.post('/question/create', QuestionController.saveQuestion); //crear una pregunta

  /******************************** PROGRESO *************************************************/
  router.post('/progress/create', ProgressController.saveProgress); //crear un progreso



  return router;

}
