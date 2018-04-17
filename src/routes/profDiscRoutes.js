import express from 'express'
import * as controller from '../controllers/profDiscController'


let router = express.Router()

router.route('/')
    .get(controller.getAllProfDisc)
    .post(controller.cadastrarProfDisc)

export default router ;
