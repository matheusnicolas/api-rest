import express from 'express'
import {User} from '../models/models'
const controllers = require('../controllers/controllers');


let router = express.Router()


router.route("/user/:id")
    .get(controllers.getUser)
    .post((controllers.cadastrarUser))


    .put(controllers.editarUser)

export default router;
