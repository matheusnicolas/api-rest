import express from 'express'
import * as controller from '../controllers/frequenciaController'

let router = express.Router();

router.route('/')
    .post(controller.cadastrarFrequencia)

export default router;