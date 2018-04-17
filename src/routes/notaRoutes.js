import express from 'express'
import * as controller from '../controllers/notaController'
import * as middleware from '../middlewares/auth'

let router = express.Router();
//router.use(middleware.auth)

router.route('/')
    .post(controller.cadastrarNota)
    .get(controller.getAllNotas)

router.route('/bimestre/:bimestre_params')
    .get(controller.getAllNotasBimestre)

router.route('/unidade/:unidade_params')
    .get(controller.getAllNotasUnidade)

router.route('/bimeste/:bimestre_params/unidade/:unidade_params')
    .put(controller.editarNota)
    .delete(controller.excluirNota)

export default router;