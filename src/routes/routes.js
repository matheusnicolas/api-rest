import express from 'express';
import {User, Turma} from '../models/models';

const controllers = require('../controllers/controllers');

let router = express.Router();

router.route("/user")
    .get(controllers.getUser)
    .post(controllers.cadastrarUser)

router.route("/user/:user_id")
    .get(controllers.getUserById)
    .put(controllers.editarUser)
    .delete(controllers.excluirUser)

router.route("/turma")
    .get(controllers.getTurma)
    .post(controllers.cadastrarTurma)

router.route("/turma/:turma_id")
    .get(controllers.getTurmaById)
    .put(controllers.editarTurma)
    .delete(controllers.excluirTurma)

export default router;
