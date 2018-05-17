import express from 'express'
import * as controller from '../controllers/notaController'

let router = express.Router();


router.route('/')
    .post(controller.cadastrarNota)
    .get(controller.getAllNotas)

router.route('/bimestre/:bimestre_params')
    .get(controller.getAllNotasBimestre)

router.route('/unidade/:unidade_params')
    .get(controller.getAllNotasUnidade)

router.route('/:nota_id')
    .get(controller.getNotaPeloId)
    .put(controller.editarNota)
    .delete(controller.excluirNota)

export default router;