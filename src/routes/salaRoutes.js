import express from 'express'
import * as controller from '../controllers/salaController'
import * as middleware from '../middlewares/auth'
/* pode importar também dessa forma
let controller = require('../controllers/controller')
*/

let router = express.Router()

router.use(middleware.auth)

router.route('/')
    .get(controller.getAllSala)
    .post(controller.cadastrarSala)

router.route('/:id_sala/')
    .get(controller.getSala)
    .put(controller.atualizarSala)
    .delete(controller.excluirSala)

export default router