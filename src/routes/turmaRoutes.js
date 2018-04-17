import express from 'express';
import * as controller from '../controllers/turmaController'
import * as middleware from '../middlewares/auth'

let router = express.Router();

router.use(middleware.auth)

router.route("/")
    .post(controller.cadastrarTurma)
    .get(controller.getAllTurma)
    

router.route("/:id_turma")
    .get(controller.getTurmaById)
    .put(controller.editarTurma)
    .delete(controller.excluirTurma)

router.route("/serie/:serie_params")
    .get(controller.getAllTurmasBySerie)

export default router;
