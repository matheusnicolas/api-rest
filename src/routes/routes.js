import express from 'express'
import {User} from '../models/models'
const controllers = require('../controllers/controllers');


let router = express.Router()


router.route("/user")
    .get(controllers.getUser)
    .post((controllers.cadastrarUser))

router.route("/user/:id")
    .put(controllers.editarUser)
    .delete(controllers.excluirUser)

export default router;
