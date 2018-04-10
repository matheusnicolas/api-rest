import express from 'express'
import HttpStatus from 'http-status-codes'
import {Disciplina} from '../models/models'

let router = express.Router()

export let getAllDisciplinas = (req, res) => {
    Disciplina.findAll().then((disciplina) => {
        res.status(HttpStatus.OK).json(disciplina).send()
    })
}

export let cadastrarDisciplina = (req, res) => {
    const nome = req.body.nome
    const data = {nome: nome}

    Disciplina.create(data).then((disciplina) =>{
        res.status(HttpStatus.CREATED).json(disciplina).send()

    }).catch((erro) => {
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    });

}

export let listarDisciplinas = (req, res) => {
    const idDisciplina = req.params.id_disciplina
    Disciplina.findById(idDisciplina).then((disciplina) =>{
        if(disciplina){
            res.status(HttpStatus.OK).json(disciplina).send()
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundDisciplina()).send()
        }

    });

}

export let editarDisciplina = (req, res) => {
    const idDisciplina = req.params.id_disciplina
    Disciplina.findById(idDisciplina).then((disciplina) => {
        
        if(disciplina){
            const nome = req.body.nome
            const data = {nome: nome}
            disciplina.update(data).then((disciplina) => {
                res.status(HttpStatus.OK).json(disciplina).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
           
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundDisciplina()).send()
        }
    })
}

export let excluirDisciplina = (req, res) => {
    const idDisciplina = req.params.id_disciplina
    Disciplina.findById(idDisciplina).then((disciplina) => {

        if(disciplina){
            disciplina.destroy().then((disciplina) => {
                res.status(HttpStatus.OK).json(disciplina).send()
            }).catch((erro) => {
                res.status(HttpStatus.BAD_REQUEST)
                        .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                        .send()
            })

        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundDisciplina()).send()
        }

    });
    

}

function responseErroCatch(code){
    let erro = {msg: HttpStatus.getStatusText(code)}
    return erro
}

function responseNotFoundDisciplina(){
    return {msg: DISCIPLINA_NOT_FOUND}
}

const DISCIPLINA_NOT_FOUND = "Disciplina não existe"

export default router