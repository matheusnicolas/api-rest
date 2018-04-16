import express from 'express'
import * as controller from '../controllers/atividadeController'

let router = express.Router();

router.route('/')
    .post(controller.cadastrarAtividade)//ok
    .get(controller.getAllAtividade) //ok

router.route('/:id_atividade')
	.get(controller.getAtividadeById)//n funciona
	.put(controller.submeterAtividade)//da erro
	.delete(controller.excluirAtividade)//vou testar aindja . FALTA A RELAÇÃO DO BANCO

export default router;
