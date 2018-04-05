import express from 'express'
import * as controller from '../controllers/userController'

let router = express.Router()

router.route("/")
    .get(controller.getUser)
    .post(controller.cadastrarUser)

router.route("/:user_id")
    .get(controller.getUserById)
    .put(controller.editarUser)
    .delete(controller.excluirUser)

export default router