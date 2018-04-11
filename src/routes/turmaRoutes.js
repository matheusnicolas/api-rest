import express from 'express';
import * as controller from '../controllers/turmaController'
//import * as middleware from '../middlewares/auth'

let router = express.Router();

//router.use(middleware.auth)

router.route("/")
    .get(controller.getAllTurma)
    .post(controller.cadastrarTurma)

router.route("/:id_turma")
    .get(controller.getTurmaById)
    .put(controller.editarTurma)
    .delete(controller.excluirTurma)

export default router;
