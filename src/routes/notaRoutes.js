import express from 'express'
import * as controller from '../controllers/notaController'

let router = express.Router();

router.route('/')
    .post(controller.cadastrarNota)
    .get(controller.getAllNotas)

router.route('/:id_nota')
    .put(controller.editarNota)
    .delete(controller.excluirNota)

router.route('/:id_bimestre')
    .get(controller.getAllNotasBimestre)

router.route('/:id_unidade')
    .get(controller.getAllNotasUnidade)

export default router;