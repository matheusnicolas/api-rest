import express from 'express'
import {User} from '../models/models'
const controllers = require('../controllers/controllers');


let router = express.Router()


router.route("/")
    .get(controllers.getUser)
    .post((controllers.cadastrarUser))

export default router;
