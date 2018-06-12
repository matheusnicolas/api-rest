import express from 'express'
import * as controller from '../controllers/userController'
import * as middleware from '../middlewares/auth'

let router = express.Router()

router.route('/')
    .post(controller.login)

export default router