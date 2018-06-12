import express from 'express'
import * as controller from '../controllers/userController'
import * as middleware from '../middlewares/auth'

let router = express.Router()

router.use(middleware.auth)

router.route("/")
    .get(controller.getUser)
    .post(controller.cadastrarUser)

router.route('/profile')
    .get(controller.profile)

router.route("/:user_id")
    .get(controller.getUserById)
    .put(controller.editarUser)
    .delete(controller.excluirUser)

export default router