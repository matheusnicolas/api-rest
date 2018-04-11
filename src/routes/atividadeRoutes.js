import express from 'express'
import * as controller from '../controllers/atividadeController'
//let controller = require('../controllers/atividadeController')


let router = express.Router();

router.route('/')
    .post(controller.cadastrarAtividade)
    .get(controller.getAllAtividade) 

router.route('/:id_atividade')
	.get(controller.getAtividade)
	.put(controller.submeterAtividade)
	.delete(controller.excluirAtividade)
	
/*router.route('/pontuacao')
	.put(controller.atualizarPontuacao)*/


export default router;
