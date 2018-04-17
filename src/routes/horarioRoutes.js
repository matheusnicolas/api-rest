import express from 'express'
import * as controller from '../controllers/horarioController'

let router = express.Router()

router.route('/')
    .get(controller.getAllHorarios)
    .post(controller.cadastrarHorario)

// router.route('/:id_disciplina/')
//     .get(controller.listarDisciplinas)
//     .put(controller.editarDisciplina)
//     .delete(controller.excluirDisciplina)

export default router