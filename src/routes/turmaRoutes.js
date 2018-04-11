import express from 'express';
import * as controller from '../controllers/turmaController'
//import * as middleware from '../middlewares/auth'
const controllers = require('../controllers/controllers');

let router = express.Router();

//router.use(middleware.auth)

router.route("/turma")
    .get(controller.getAllTurma)
    .post(controller.cadastrarTurma)

router.route("/turma/:turma_id")
    .get(controller.getTurmaById)
    .put(controller.editarTurma)
    .delete(controller.excluirTurma)

export default router;
