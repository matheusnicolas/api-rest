import express from 'express'
import * as controller from '../controllers/salaController'
/* pode importar também dessa forma
let controller = require('../controllers/controller')
*/

let router = express.Router()

router.route('/')
    .get(controller.getAllSala)
    .post(controller.cadastrarSala)

router.route('/:id_sala/')
    .get(controller.getSala)
    .put(controller.atualizarSala)
    .delete(controller.excluirSala)

export default router