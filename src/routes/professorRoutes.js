import express from 'express'
import * as controller from '../controllers/professorController'

let router = express.Router();

router.route("/")
    .get(controller.getAllProfessor)
    .post(controller.cadastrarProfessor)

router.route("/:id_professor")
    .get(controller.getProfessorPeloId)
    .put(controller.editarProfessor)
    .delete(controller.excluirProfessor)

export default router;