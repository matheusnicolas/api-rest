import express from 'express';
import * as controller from '../controllers/notaController'
//import * as middleware from '../middlewares/auth'
let controllers = require('../controllers/controllers');

let router = express.Router();

//router.use(middleware.auth)

router.route("/nota")
    .post(controller.cadastrarNota)

router.route("/nota/:id_nota")
    .get(controller.editarNota)
    .delete(controller.excluirNota)