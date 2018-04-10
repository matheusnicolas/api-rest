import express from 'express'
import * as controller from '../controllers/disciplinaController'

let router = express.Router()

router.route('/')
    .get(controller.getAllDisciplinas)
    .post(controller.cadastrarDisciplina)

router.route('/:id_disciplina/')
    .get(controller.listarDisciplinas)
    .put(controller.editarDisciplina)
    .delete(controller.excluirDisciplina)

export default router