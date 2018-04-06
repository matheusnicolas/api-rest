import express from 'express';
import {User, Turma} from '../models/models';

const controllers = require('../controllers/controllers');

let router = express.Router();

router.route("/turma")
    .get(controllers.getTurma)
    .post(controllers.cadastrarTurma)

router.route("/turma/:turma_id")
    .get(controllers.getTurmaById)
    .put(controllers.editarTurma)
    .delete(controllers.excluirTurma)

export default router;
